// API route to test database connection
import { NextResponse } from 'next/server';
import { testSupabaseConnection } from '@/lib/supabase/test-connection';

export async function GET() {
  const isConnected = await testSupabaseConnection();

  return NextResponse.json({
    success: isConnected,
    message: isConnected
      ? 'Database connection successful!'
      : 'Database connection failed. Check console for details.',
    timestamp: new Date().toISOString(),
  });
}
