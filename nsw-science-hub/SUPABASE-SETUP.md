# Supabase Setup Guide

Follow these steps to set up your Supabase backend for the NSW Science Hub.

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email

## Step 2: Create New Project

1. Click "New Project"
2. Fill in details:
   - **Name**: nsw-science-hub
   - **Database Password**: (save this somewhere safe!)
   - **Region**: Choose closest to Sydney (ap-southeast-2)
   - **Pricing Plan**: Free tier is fine for development

3. Click "Create new project"
4. Wait 2-3 minutes for project to provision

## Step 3: Get API Credentials

1. In your project dashboard, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. Copy these values:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)
   - **service_role key**: `eyJhbG...` (different long string)

## Step 4: Configure Environment Variables

1. In your project root (`/nsw-science-hub/`), create `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and paste your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-service-role-key
```

3. Save the file

## Step 5: Run Database Migration

1. In Supabase dashboard, click "SQL Editor" in sidebar
2. Click "New query"
3. Copy the contents of `/supabase/migrations/20240101000000_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

## Step 6: Verify Tables Created

1. Click "Table Editor" in sidebar
2. You should see these tables:
   - ✅ users
   - ✅ lesson_progress
   - ✅ lesson_events

3. Click on each table to verify the structure

## Step 7: Configure Authentication

1. Click "Authentication" in sidebar
2. Click "Providers"
3. Enable "Email" provider (should be enabled by default)
4. Configure settings:
   - **Enable Email Signups**: ON
   - **Enable Email Confirmations**: OFF (for development)
   - **Secure Email Change**: ON

5. Click "Save"

## Step 8: Test the Connection

1. In your project directory, run:

```bash
npm run dev
```

2. The app should start without errors
3. Open [http://localhost:3000](http://localhost:3000)

## Verification Checklist

- [ ] Supabase project created
- [ ] API credentials copied to `.env.local`
- [ ] Database migration run successfully
- [ ] Tables visible in Table Editor
- [ ] Email auth enabled
- [ ] Next.js dev server runs without errors

## Troubleshooting

### Error: "Invalid API key"
- Double-check you copied the full key (they're very long!)
- Make sure there are no extra spaces
- Verify you're using the `anon` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Error: "Could not connect to database"
- Check your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Make sure it starts with `https://`
- Verify the project is fully provisioned (wait a few more minutes)

### Migration fails
- Make sure you copied the ENTIRE SQL file
- Run it again (it's safe to run multiple times)
- Check for any error messages in red

### Tables not showing
- Refresh the page
- Check you're on the correct project
- Verify migration ran successfully

## Next Steps

Once Supabase is set up, you're ready to:
1. Build authentication pages
2. Create the Lesson Player component
3. Test saving progress to the database

See **ARCHITECTURE.md** for the full development roadmap.

## Important Notes

- **Never commit `.env.local`** to git (it's in `.gitignore`)
- **Keep your service_role key secret** - it has admin access
- **The anon key is safe to expose** in client-side code
- **Row-Level Security (RLS)** protects your data - students can only see their own progress

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
