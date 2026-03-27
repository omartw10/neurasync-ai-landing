import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nosqzttqvumevorivqrp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vc3F6dHRxdnVtZXZvcml2cXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTA5NDYsImV4cCI6MjA4ODc4Njk0Nn0.B5P10KjyFA1SMjeEGTel2BigVzeIa9NrOUJcckfXKHQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEmails() {
  const { data, error } = await supabase.from('emails_processed').select('*').limit(1);
  console.log('Error:', error);
  console.log('Data:', data);
}

checkEmails();
