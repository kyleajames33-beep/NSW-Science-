// Test script to verify Supabase connection
import { supabase } from './client';

export async function testSupabaseConnection() {
  try {
    // Test 1: Check if we can connect
    const { data, error } = await supabase.from('users').select('count');

    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connection successful!');
    console.log('✅ Database tables are accessible');

    // Test 2: Verify tables exist
    const tables = ['users', 'lesson_progress', 'lesson_events'];
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('count').limit(1);
      if (tableError) {
        console.error(`❌ Table "${table}" not accessible:`, tableError.message);
        return false;
      }
      console.log(`✅ Table "${table}" exists and is accessible`);
    }

    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}
