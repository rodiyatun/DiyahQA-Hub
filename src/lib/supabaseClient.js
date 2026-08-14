import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdstuycsypszfeswwngw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kc3R1eWNzeXBzemZlc3d3bmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MjY4NjcsImV4cCI6MjEwMjIwMjg2N30.Vq0-KXxMbS5QVSESvt3E-A5CSuoWPhQfrfLBH6vXcFY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
