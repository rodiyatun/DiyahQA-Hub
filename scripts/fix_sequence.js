const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdstuycsypszfeswwngw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kc3R1eWNzeXBzemZlc3d3bmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MjY4NjcsImV4cCI6MjEwMjIwMjg2N30.Vq0-KXxMbS5QVSESvt3E-A5CSuoWPhQfrfLBH6vXcFY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSequence() {
  console.log('Fetching a valid project ID...');
  const { data: projData, error: projError } = await supabase.from('projects').select('id').limit(1);
  if (projError || !projData || projData.length === 0) {
    console.error('Error fetching project ID:', projError);
    return;
  }
  const projectId = projData[0].id;
  console.log('Using project ID:', projectId);

  console.log('Fetching max ID from testcases...');
  const { data, error } = await supabase
    .from('testcases')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching max ID:', error);
    return;
  }

  const maxId = data[0]?.id || 0;
  console.log(`Current Max ID in table: ${maxId}`);

  console.log('Inserting dummy row to advance sequence...');
  let currentSeq = 0;
  let attempts = 0;

  while (currentSeq <= maxId) {
    attempts++;
    const { data: insertData, error: insertError } = await supabase
      .from('testcases')
      .insert([{
        title: 'Dummy for sequence fix',
        project_id: projectId,
        status: 'Pending'
      }])
      .select('id');

    if (insertError) {
      if (insertError.message.includes('duplicate key')) {
        console.log(`Attempt ${attempts}: Duplicate key error. Sequence is advancing...`);
      } else {
        console.error('Other insert error:', insertError);
        break;
      }
    } else {
      currentSeq = insertData[0].id;
      console.log(`Success! Inserted ID ${currentSeq}. Deleting dummy row...`);
      await supabase.from('testcases').delete().eq('id', currentSeq);
    }

    if (attempts > 5000) {
      console.log('Too many attempts. Exiting.');
      break;
    }
  }

  console.log('Sequence fix complete.');
}


fixSequence();

