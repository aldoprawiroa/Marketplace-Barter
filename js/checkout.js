let itemSaya = null;
let itemTujuan = null;

document.addEventListener("DOMContentLoaded", () => {
    // Ambil kedua data dari localStorage
    const dataSaya = localStorage.getItem('itemSwap');
    const dataTujuan = localStorage.getItem('itemTujuan');
    
    const container = document.getElementById('konfirm-container');
    const btnTukarUtama = document.getElementById('btn-tukar-utama');

    if (dataSaya && dataTujuan) {
        itemSaya = JSON.parse(dataSaya);
        itemTujuan = JSON.parse(dataTujuan);

        // Render kedua barang berdampingan
        container.innerHTML = `
            <div class="box">
                <h4 style="margin-bottom:10px; color:#2563eb;">Barang Kamu</h4>
                <img src="${itemSaya.image}" alt="${itemSaya.name}">
                <h3>${itemSaya.name}</h3>
                <p>${itemSaya.price}</p>
            </div>
            
            <div style="font-size:24px; font-weight:bold; color:#6b7280;">
                VS
            </div>

            <div class="box">
                <h4 style="margin-bottom:10px; color:#f59e0b;">Barang Tujuan</h4>
                <img src="${itemTujuan.image}" alt="${itemTujuan.nama}">
                <h3>${itemTujuan.nama}</h3>
                <p>Rp ${itemTujuan.harga.toLocaleString('id-ID')}</p>
            </div>
        `;
        
        // Munculkan tombol aksi
        if(btnTukarUtama) btnTukarUtama.classList.remove('hidden');
    } else {
        container.innerHTML = `<p>Data pertukaran tidak lengkap. Silakan mulai kembali dari Beranda.</p>`;
    }
});

function openCheckout() {
    if (!itemSaya || !itemTujuan) return;

    // Ubah string "Rp 800.000" menjadi angka 800000 murni agar bisa dihitung
    const hargaSaya = parseInt(itemSaya.price.replace(/[^0-9]/g, ''));
    const hargaTujuan = itemTujuan.harga; // Sudah berbentuk angka dari data.js
    const selisih = hargaTujuan - hargaSaya;
    
    let infoHTML = `Menukar <strong>${itemSaya.name}</strong> dengan <strong>${itemTujuan.nama}</strong><br><br>`;
    infoHTML += `Nilai Barang Kamu: Rp ${hargaSaya.toLocaleString('id-ID')}<br>`;
    infoHTML += `Nilai Barang Tujuan: Rp ${hargaTujuan.toLocaleString('id-ID')}<br><hr>`;
    
    if(selisih > 0) {
        infoHTML += `<span style="color:#f59e0b; font-weight:bold;">Kamu harus Top-Up Rp ${selisih.toLocaleString('id-ID')} dari SwapPay.</span>`;
    } else if (selisih < 0) {
        infoHTML += `<span style="color:#10b981; font-weight:bold;">Kamu untung Rp ${Math.abs(selisih).toLocaleString('id-ID')} (masuk ke SwapPay).</span>`;
    } else {
        infoHTML += `<span style="color:#10b981; font-weight:bold;">Pertukaran Seimbang! Tidak ada tambahan biaya.</span>`;
    }

    document.getElementById('checkout-info').innerHTML = infoHTML;
    document.getElementById('modal-checkout').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('modal-checkout').classList.add('hidden');
}

function processSwap() {
    // 1. Ambil data barang yang akan ditukar
    const namaBarang = itemTujuan.nama;
    const hargaBarang = itemTujuan.harga;
    
    // 2. SIMPAN KE SISTEM TRACKING
    if (typeof simpanTransaksi === 'function') {
        simpanTransaksi(namaBarang, hargaBarang);
        console.log('✅ Transaksi disimpan ke SwapTrack:', namaBarang);
    } else {
        // Fallback: simpan manual ke localStorage jika fungsi belum ada
        let data = JSON.parse(localStorage.getItem('swapData')) || [];
        data.push({
            id: 'TRX-' + Date.now(),
            barang: namaBarang,
            harga: hargaBarang,
            status: 'Menunggu',
            tanggal: new Date().toLocaleDateString('id-ID')
        });
        localStorage.setItem('swapData', JSON.stringify(data));
        console.log('✅ Transaksi disimpan (manual):', namaBarang);
    }
    
    // 3. Tampilkan toast notification
    if (typeof showToast === 'function') {
        showToast(`Penawaran untuk ${namaBarang} berhasil dikirim!`, 'success');
    } else {
        alert('Penawaran berhasil dikirim!');
    }
    
    closeCheckout();
    
    // 4. Bersihkan data temporary
    localStorage.removeItem('itemSwap'); 
    localStorage.removeItem('itemTujuan'); 
    
    // 5. Redirect ke halaman transaksi
    setTimeout(() => {
        window.location.href = 'transaksi.html';
    }, 1500);
}