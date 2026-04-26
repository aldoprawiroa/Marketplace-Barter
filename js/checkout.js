
function openCheckout(itemId) {
    const itemTarget = dummyData.find(d => d.id === itemId);

    const asetUser = 1500000; 
    const selisih = itemTarget.harga - asetUser;
    
    let infoHTML = `Minta tukar dengan: <strong>${itemTarget.nama}</strong><br><br>`;
    infoHTML += `Nilai Barang Kamu: Rp ${asetUser.toLocaleString('id-ID')}<br>`;
    infoHTML += `Nilai Barang Tujuan: Rp ${itemTarget.harga.toLocaleString('id-ID')}<br><hr>`;
    
    /
    if(selisih > 0) {
        infoHTML += `<span style="color:#f59e0b">Auto Top-Up Aktif: Kamu harus menambah Rp ${selisih.toLocaleString('id-ID')} dari SwapPay.</span>`;
    } else {
        infoHTML += `<span style="color:#10b981">Pertukaran Seimbang! Tidak ada tambahan biaya.</span>`;
    }

    document.getElementById('checkout-info').innerHTML = infoHTML;
    document.getElementById('modal-checkout').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('modal-checkout').classList.add('hidden');
}

function processSwap() {
    showToast("Hebat! Penawaran berhasil dikirim ke pemilik barang.");
    closeCheckout();
}
