// Sistem Upload Barang oleh Ibrahim (019)
function uploadNewItem(nama, harga, kategori) {
    // Validasi dari kodingan Faiz
    if(typeof validateInput === 'function' && !validateInput(nama, "Nama Barang")) return;
    
    const newItem = { 
        id: "B" + Math.floor(Math.random() * 1000), 
        nama: nama, 
        harga: parseInt(harga), 
        kategori: kategori 
    };
    
    dummyData.push(newItem);
    
    // Render ulang dari kodingan minggu lalu
    if(typeof renderCatalog === 'function') renderCatalog(dummyData);
    if(typeof showToast === 'function') showToast("Barang barumu berhasil masuk katalog!", "success");
}