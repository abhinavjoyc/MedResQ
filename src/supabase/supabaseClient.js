import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://hwbnfborwexpysvgrioy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3Ym5mYm9yd2V4cHlzdmdyaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NDg5NzEsImV4cCI6MjA0MDMyNDk3MX0._RBUo-_KM-HirRCbRWBzQkslbKLRO5ryb5Dl3aqqeB8'; // Keep this secure

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
