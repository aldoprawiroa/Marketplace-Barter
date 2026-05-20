# SwapSpace

SwapSpace adalah proyek website statis untuk simulasi barter barang antar mahasiswa. Website ini dibuat untuk kebutuhan proyek akhir semester menggunakan HTML, CSS, dan JavaScript vanilla.

## Deskripsi

Pengguna dapat melihat katalog barang, login simulasi dengan OTP, mengunggah barang milik sendiri, mengajukan swap, dan memantau status transaksi. Semua data demo disimpan di browser menggunakan localStorage.

## Fitur

- Katalog barang dengan pencarian dan filter kategori.
- Login simulasi menggunakan email, password, dan OTP lokal.
- Upload barang ke inventaris pribadi.
- Checkout swap dengan perhitungan selisih harga, biaya layanan, dan ongkir simulasi.
- Tracking transaksi dan ringkasan profil.
- Reset data demo untuk mengulang alur presentasi.

## Struktur Folder

```text
SwapSpace/
├── index.html
├── login.html
├── upload.html
├── swap.html
├── track.html
├── README.md
├── Anggota.txt
├── css/
│   └── style.css
└── js/
    ├── utils.js
    ├── data.js
    ├── catalog.js
    ├── account.js
    ├── upload.js
    ├── swap.js
    └── track.js
```

## Teknologi

- HTML5
- CSS3
- JavaScript vanilla
- localStorage untuk simulasi data

## Catatan

SwapSpace tidak memakai backend, database, autentikasi sungguhan, API, atau payment gateway. Data akun, saldo, inventaris, barang terpilih, dan transaksi disimpan di localStorage browser. Jika data ingin dikembalikan ke kondisi awal, buka halaman Tracking lalu klik tombol Reset Demo.
