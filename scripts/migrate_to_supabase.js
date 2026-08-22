// scripts/migrate_to_supabase.js
// Migration script to copy data from local SQLite (testcases.db) into Supabase tables.
// Run with: node scripts/migrate_to_supabase.js

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { createClient } from '@supabase/supabase-js';

// Supabase client (same as app)
const supabaseUrl = 'https://mdstuycsypszfeswwngw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kc3R1eWNzeXBzemZlc3d3bmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MjY4NjcsImV4cCI6MjEwMjIwMjg2N30.Vq0-KXxMbS5QVSESvt3E-A5CSuoWPhQfrfLBH6vXcFY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Resolve path to local SQLite db (used by Electron app)
const dbPath = path.join(
  process.env.HOME,
  'Library/Application Support/testcase-management/testcases.db'
);

if (!fs.existsSync(dbPath)) {
  console.error('SQLite DB not found at', dbPath);
  process.exit(1);
}

(async () => {
  try {
    const initSqlJs = require('sql.js');
    const SQL = await initSqlJs();
    const fileBuffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(fileBuffer);

    // Helper to fetch all rows from a table
    const fetchAll = (table) => {
      const stmt = db.prepare(`SELECT * FROM ${table}`);
      const rows = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
      }
      stmt.free();
      return rows;
    };

    // List of tables we want to migrate (adjust to actual schema)
    const tables = [
      'projects',
      'testcases',
      'bug_reports',
      'environments',
      'env_variables'
    ];

    for (const table of tables) {
      console.log(`Migrating ${table} ...`);
      const rows = fetchAll(table);
      if (rows.length === 0) {
        console.log('  No rows found, skipping.');
        continue;
      }
      const batchSize = 100;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const { error } = await supabase
          .from(table)
          .upsert(batch, { onConflict: 'id' });
        if (error) {
          console.error(`  Error upserting batch into ${table}:`, error.message);
        } else {
          console.log(`  Upserted ${batch.length} rows into ${table}.`);
        }
      }
    }
    console.log('✅ Migration completed');
  } catch (e) {
    console.error('Migration failed:', e);
    process.exit(1);
  }
})();
