// 1. Inisialisasi data dari localStorage atau gunakan dummyData jika masih kosong
let items = JSON.parse(localStorage.getItem('barang_swappoint')) || dummyData;

document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.querySelector('form');

    if (uploadForm) {
        uploadForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 2. Ambil nilai dari input form
            const namaBarang = document.querySelector('input[name="nama_barang"]').value;
            const kategori = document.querySelector('select[name="kategori"]').value;
            const deskripsi = document.querySelector('textarea[name="deskripsi"]').value;
            const estimasiNilai = document.querySelector('input[name="estimasi_nilai"]').value;
            const fileInput = document.querySelector('input[type="file"]');

            // 3. Logika untuk menangani Gambar (menggunakan URL sementara/Blob)
            // Catatan: Di dunia nyata, file diunggah ke server. Di sini kita buat URL preview.
            let imageUrl = "https://via.placeholder.com/150"; // Default jika gagal
            if (fileInput.files && fileInput.files[0]) {
                imageUrl = URL.createObjectURL(fileInput.files[0]);
            }

            // 4. Buat objek barang baru
            const barangBaru = {
                id: "B" + (items.length + 1).toString().padStart(2, '0'),
                nama: namaBarang,
                harga: parseInt(estimasiNilai),
                kategori: kategori,
                deskripsi: deskripsi,
                image: imageUrl,
                berat: 1000, // Default berat 1kg untuk simulasi ongkir
                pemilik: "Saya" // Penanda untuk fitur 'Barang Saya'
            };

            // 5. Masukkan ke array dan simpan ke LocalStorage
            items.push(barangBaru);
            localStorage.setItem('barang_swappoint', JSON.stringify(items));

            alert('Barang berhasil diunggah!');
            
            // Redirect ke halaman daftar barang atau reset form
            uploadForm.reset();
            console.log("Data Barang Saat Ini:", items);
        });
    }
});

/**
 * FITUR: Barang Saya
 * Fungsi untuk mengambil hanya barang yang diunggah oleh pengguna saat ini
 */
function getBarangSaya() {
    const allItems = JSON.parse(localStorage.getItem('barang_swappoint')) || items;
    return allItems.filter(item => item.pemilik === "Saya");
}