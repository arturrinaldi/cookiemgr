import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais do Supabase
// Você as encontra em Settings -> API no seu projeto Supabase
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL ou Key não configuradas. Verifique seu arquivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
