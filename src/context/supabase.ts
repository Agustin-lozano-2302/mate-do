// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

let supabase: any;

if (typeof window !== "undefined") {
  // Solo crear el cliente en el navegador
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
}

export { supabase };
