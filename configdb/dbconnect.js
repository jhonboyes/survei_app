import {createClient} from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Konfigurasi client dengan connection pooling untuk menangani banyak permintaan
const db = createClient(supabaseUrl, supabaseKey, {
 auth: {
  persistSession: false // Tidak perlu menyimpan sesi untuk operasi backend
 },
 // Konfigurasi global untuk semua request
 global: {
  fetch: (url, options) => {
   // Timeout yang lebih pendek untuk mencegah koneksi menggantung
   const timeout = 15000 // 15 detik
   const controller = new AbortController()
   const timeoutId = setTimeout(() => controller.abort(), timeout)

   return fetch(url, {
    ...options,
    signal: controller.signal,
    keepalive: true // Mempertahankan koneksi untuk reuse
   }).finally(() => clearTimeout(timeoutId))
  }
 },
 realtime: {
  timeout: 10000 // 10 detik timeout untuk koneksi realtime
 }
})

export {db}
