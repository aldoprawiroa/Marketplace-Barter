// Fungsi untuk menyimpan transaksi baru
function simpanTransaksi(namaBarang, hargaBarang) {
    console.log('📦 Menyimpan transaksi:', namaBarang, hargaBarang);
    
    let data = JSON.parse(localStorage.getItem('swapData')) || [];
    
    const transaksiBaru = {
        id: 'TRX-' + Date.now(),
        barang: namaBarang,
        harga: hargaBarang,
        status: 'Menunggu',
        tanggal: new Date().toLocaleDateString('id-ID'),
        waktu: new Date().toLocaleTimeString('id-ID')
    };
    
    data.unshift(transaksiBaru);
    localStorage.setItem('swapData', JSON.stringify(data));
    
    console.log('💾 Data tersimpan. Total transaksi:', data.length);
    
    if (typeof showToast === 'function') {
        showToast(`Swap "${namaBarang}" berhasil diajukan!`, 'success');
    }
}

// Fungsi untuk memuat riwayat (AUTO DETECT format)
function muatRiwayat() {
    console.log('🔄 Memuat riwayat transaksi...');
    
    // Cek format halaman mana yang sedang aktif
    const containerCard = document.getElementById('list-transaksi');
    const containerTable = document.getElementById('transaction-body');
    
    let data = JSON.parse(localStorage.getItem('swapData')) || [];
    console.log('📊 Data ditemukan:', data.length, 'transaksi');
    
    // RENDER FORMAT CARD (untuk transaksi.html)
    if (containerCard) {
        renderFormatCard(containerCard, data);
    }
    
    // RENDER FORMAT TABEL (untuk riwayat.html)
    if (containerTable) {
        renderFormatTable(containerTable, data);
    }
}

// Render Format CARD (transaksi.html)
function renderFormatCard(container, data) {
    if (data.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:40px; color:#9ca3af;">
                <div style="font-size:48px; margin-bottom:10px;">📦</div>
                <p>Belum ada riwayat transaksi.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    data.forEach((item, index) => {
        let warnaStatus = '#f59e0b';
        let icon = '🟡';
        
        if (item.status === 'Sukses') {
            warnaStatus = '#10b981';
            icon = '🟢';
        } else if (item.status === 'Dibatalkan') {
            warnaStatus = '#ef4444';
            icon = '🔴';
        }
        
        html += `
            <div style="background:white; padding:20px; margin-bottom:15px; border-radius:12px; border-left:5px solid ${warnaStatus};">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <strong>${item.id}</strong>
                    <span style="background:${warnaStatus}; color:white; padding:6px 12px; border-radius:20px; font-size:13px;">
                        ${icon} ${item.status}
                    </span>
                </div>
                <p style="margin:5px 0;"><strong>📦 ${item.barang}</strong></p>
                <p style="margin:5px 0; color:#6b7280;">Rp ${parseInt(item.harga).toLocaleString('id-ID')} • ${item.tanggal}</p>
                <div style="margin-top:15px;">
                    <button onclick="ubahStatus(${index}, 'Sukses')" style="padding:8px 16px; margin-right:10px; background:#10b981; color:white; border:none; border-radius:6px; cursor:pointer;">
                        ✅ Sukses
                    </button>
                    <button onclick="ubahStatus(${index}, 'Dibatalkan')" style="padding:8px 16px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer;">
                        ❌ Batal
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Render Format TABEL (riwayat.html)
function renderFormatTable(container, data) {
    if (data.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:#9ca3af;">
                    <div style="font-size:48px; margin-bottom:10px;">📦</div>
                    Belum ada riwayat transaksi.
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    data.forEach((item, index) => {
        let warnaBadge = '#f59e0b';
        if (item.status === 'Sukses') warnaBadge = '#10b981';
        if (item.status === 'Dibatalkan') warnaBadge = '#ef4444';
        
        html += `
            <tr>
                <td><strong>${item.id}</strong></td>
                <td>
                    <div style="font-weight:600;">${item.barang}</div>
                    <small style="color:#6b7280;">${item.tanggal}</small>
                </td>
                <td>Rp ${parseInt(item.harga).toLocaleString('id-ID')}</td>
                <td>
                    <span style="background:${warnaBadge}; color:white; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600;">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <button onclick="ubahStatus(${index}, 'Sukses')" style="padding:6px 12px; margin-right:5px; background:#10b981; color:white; border:none; border-radius:4px; cursor:pointer; font-size:12px;">
                        ✅
                    </button>
                    <button onclick="ubahStatus(${index}, 'Dibatalkan')" style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:4px; cursor:pointer; font-size:12px;">
                        ❌
                    </button>
                </td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

// Fungsi untuk mengubah status transaksi
function ubahStatus(index, statusBaru) {
    let data = JSON.parse(localStorage.getItem('swapData'));
    
    if (data && data[index]) {
        data[index].status = statusBaru;
        localStorage.setItem('swapData', JSON.stringify(data));
        
        // Refresh semua tampilan (card dan table)
        muatRiwayat();
        
        if (typeof showToast === 'function') {
            showToast(`Status transaksi diubah menjadi ${statusBaru}`, 'info');
        }
    }
}

// Jalankan saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Track.js loaded');
    muatRiwayat();
});