import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://koqhmgsfzndauxgqyeea.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcWhtZ3Nmem5kYXV4Z3F5ZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4NTg0MDEsImV4cCI6MTk3MTQzNDQwMX0.sHMfGXj8IZwYbQ7xVlZ7wV7A9hd4jegC1TpWDdd_9_M"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);