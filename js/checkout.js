let itemSaya = null;
let itemTujuan = null;
let tagihanSwap = 0; 

document.addEventListener("DOMContentLoaded", () => {
    const dataSaya = localStorage.getItem('itemSwap');
    const dataTujuan = localStorage.getItem('itemTujuan');
    
    const container = document.getElementById('konfirm-container');
    const btnTukarUtama = document.getElementById('btn-tukar-utama');

    if (dataSaya && dataTujuan && container) {
        itemSaya = JSON.parse(dataSaya);
        itemTujuan = JSON.parse(dataTujuan);

        container.innerHTML = `
            <div class="box">
                <h4 style="margin-bottom:10px; color:#2563eb;">Barang Kamu</h4>
                <img src="${itemSaya.image}" alt="${itemSaya.name}">
                <h3>${itemSaya.name}</h3>
                <p style="color:#10b981; font-weight:bold;">${itemSaya.price}</p>
            </div>
            
            <div style="font-size:24px; font-weight:bold; color:#6b7280;">
                VS
            </div>

            <div class="box">
                <h4 style="margin-bottom:10px; color:#f59e0b;">Barang Tujuan</h4>
                <img src="${itemTujuan.image}" alt="${itemTujuan.nama}">
                <h3>${itemTujuan.nama}</h3>
                <p style="color:#10b981; font-weight:bold;">Rp ${itemTujuan.harga.toLocaleString('id-ID')}</p>
            </div>
        `;
        
        if(btnTukarUtama) btnTukarUtama.classList.remove('hidden');
    } else if (container) {
        container.innerHTML = `<p style="text-align:center; color:red;">Data pertukaran tidak lengkap. Silakan kembali ke katalog.</p>`;
    }
});

function openCheckout() {
    if (!itemSaya || !itemTujuan) return;

    const biayaOngkir = 11000;
    const biayaAdmin = 2500;

    const hargaSaya = parseInt(itemSaya.price.replace(/[^0-9]/g, ''));
    const hargaTujuan = itemTujuan.harga; 
    
    const selisih = hargaTujuan - hargaSaya;
    const totalBiaya = selisih + biayaOngkir + biayaAdmin;
    
    tagihanSwap = totalBiaya;
    
    let infoHTML = `<div style="text-align:left; font-size:14px; line-height:1.8;">`;
    infoHTML += `<strong style="display:block; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">Kalkulasi Biaya:</strong>`;
    
    infoHTML += `<div style="display:flex; justify-content:space-between;"><span>Harga Barang Tujuan</span> <span>Rp ${hargaTujuan.toLocaleString('id-ID')}</span></div>`;
    infoHTML += `<div style="display:flex; justify-content:space-between;"><span>Biaya Ongkir</span> <span>+ Rp ${biayaOngkir.toLocaleString('id-ID')}</span></div>`;
    infoHTML += `<div style="display:flex; justify-content:space-between;"><span>Biaya Layanan/Admin</span> <span>+ Rp ${biayaAdmin.toLocaleString('id-ID')}</span></div>`;
    infoHTML += `<div style="display:flex; justify-content:space-between; color:#ef4444;"><span>Nilai Barang Kamu</span> <span>- Rp ${hargaSaya.toLocaleString('id-ID')}</span></div>`;
    
    infoHTML += `<hr style="margin:10px 0; border:0; border-top:1px dashed #ccc;">`;
    
    if(totalBiaya > 0) {
        infoHTML += `<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:16px; color:#2563eb;"><span>Total Bayar (Ambil Saldo)</span> <span>Rp ${totalBiaya.toLocaleString('id-ID')}</span></div>`;
        infoHTML += `<p style="font-size:11px; color:#6b7280; margin-top:5px;">*Kekurangan nilai barang akan otomatis memotong saldo SwapPay kamu.</p>`;
    } else {
        infoHTML += `<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:16px; color:#10b981;"><span>Sisa Nilai (Masuk Saldo)</span> <span>Rp ${Math.abs(totalBiaya).toLocaleString('id-ID')}</span></div>`;
    }
    infoHTML += `</div>`;

    const checkoutInfo = document.getElementById('checkout-info');
    if(checkoutInfo) checkoutInfo.innerHTML = infoHTML;
    
    const modalCheckout = document.getElementById('modal-checkout');
    if(modalCheckout) modalCheckout.classList.remove('hidden');
}

function closeCheckout() {
    const modalCheckout = document.getElementById('modal-checkout');
    if(modalCheckout) modalCheckout.classList.add('hidden');
}

function processSwap() {
    if (tagihanSwap > 0) {
        if (typeof processPayment === "function") {
            const pembayaranBerhasil = processPayment(tagihanSwap);
            
            if (!pembayaranBerhasil) {
                alert("Transaksi Gagal: Saldo hasil isi ulang kamu tidak mencukupi!"); 
                return; 
            }
        } else {
            alert("Sistem pembayaran belum siap.");
            return;
        }
    } else if (tagihanSwap < 0) {
        // Jika nilai barang kita lebih besar, selisihnya ditambahkan ke saldo
        let currentBalance = parseInt(localStorage.getItem('swapBalance')) || 0;
        currentBalance += Math.abs(tagihanSwap);
        localStorage.setItem('swapBalance', currentBalance);
        
        const userDisplay = document.getElementById('user-balance');
        if(userDisplay) userDisplay.innerText = `Saldo: Rp ${currentBalance.toLocaleString('id-ID')}`;
    }

    if(typeof showToast === "function") {
        showToast("Penawaran terkirim! Saldo telah disesuaikan.");
    } else {
        alert("Penawaran berhasil dikirim!");
    }
    
    closeCheckout();
    
    localStorage.removeItem('itemSwap'); 
    localStorage.removeItem('itemTujuan'); 
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 1500);
}