# BizLearn — Prototipe Web Edukasi Bisnis Digital

Proyek ini adalah prototype sederhana "BizLearn": platform belajar interaktif untuk pelajar yang ingin memahami dasar-dasar bisnis digital. Dibangun dengan HTML, CSS, dan JavaScript murni (no build tools).

Fitur utama:
- Halaman Beranda
- Daftar artikel edukasi (dinamis dari array)
- Simulasi keuntungan sederhana
- Forum mini (komentar disimpan di localStorage)

Cara menjalankan:
1. Buka file `index.html` di browser (cukup klik dua kali atau gunakan "Open with" di file manager).

2. Gunakan link github atau hostinger yang sudah ada

Note : Dikarnakan kekurangan waktu saya menggunakan localhost agar aplikasi ini mudah dibuat untuk demonya, setiap tombol dan fungsi di website ini semuanya berguna dan setiap penyimpanan semua ditaru di localhost. Saya harap hal ini bisa dimaklumi.

1. Fitur Utama Otentikasi
Pendaftaran: Pengguna dapat membuat akun dengan nama pengguna/kata sandi.
Masuk: Otentikasi yang aman dengan kredensial yang tersimpan.
Manajemen Sesi: Sesi pengguna tetap bertahan setelah pembaruan halaman.
Peran Pengguna: Peran Admin dan pengguna biasa.

2. Penyimpanan Data Khusus Pengguna
Riwayat Simulasi: Setiap pengguna memiliki hasil simulasi mereka sendiri.
Rencana Bisnis: Simulasi bisnis terperinci pengguna disimpan per akun.
Komentar: Riwayat komentar khusus pengguna di forum.
Pelacakan Kemajuan: Kemajuan belajar individu.

3. Akun Admin Bawaan
Nama Pengguna: admi
Kata Sandi: admin
Hak Akses: Dapat menghapus semua komentar, mengelola pengguna.

🎯 Cara Menguji Sistem
Langkah 1: Buat Pengguna Baru
Buka halaman mana saja di situs web BizLearn.
Klik tombol "Masuk" di header.
Klik tab "Daftar" di modal.
Masukkan nama pengguna dan kata sandi.
Klik "Daftar" untuk membuat akun.

Langkah 2: Masuk (Login)
Klik "Masuk" di tab modal.
Masukkan kredensial Anda.
Klik "Masuk" untuk login.
Perhatikan nama pengguna Anda muncul di header dengan tombol "Keluar".
Langkah 3: Uji Data Khusus Pengguna
Buka halaman Simulasi: Buat dan simpan simulasi bisnis.
Buka halaman Indeks: Jalankan perhitungan dan simpan hasilnya ke riwayat.
Tulis komentar: Tambahkan komentar di forum.
Keluar dan masuk sebagai pengguna berbeda: Perhatikan bahwa data terpisah per pengguna.
Langkah 4: Uji Fitur Admin
Masuk sebagai admin (admin/admin).
Buka forum/bagian komentar mana saja.
Perhatikan bahwa admin dapat menghapus komentar apa pun.
Admin memiliki hak istimewa khusus di seluruh situs.
💾 Detail Penyimpanan Data
Tempat Data Pengguna Disimpan
Akun Pengguna: localStorage.bizlearn_users_v1
Info Sesi: localStorage.bizlearn_session_v1
Riwayat Simulasi: localStorage.bizlearn_sim_history_v1_user_{username}
Rencana Bisnis: localStorage.bizlearn_full_sim_v1_user_{username}
Komentar: localStorage.bizlearn_comments_v1 (dibagikan tetapi diberi tag pengguna)
Pemisahan Data
Setiap pengguna mendapatkan namespace mereka sendiri untuk data pribadi.
Data yang dibagikan (seperti komentar) mencakup identifikasi pengguna.
Keluar (logout) beralih ke mode anonim dengan penyimpanan terpisah