window.onload = function() {
    const grid = document.getElementById('catalog-grid');
    
    // Cek apakah data dummy sudah ada
    if(grid && typeof dummyData !== 'undefined') {
        grid.innerHTML = ''; 
        
        dummyData.forEach(item => {
            // Buat elemen card
            const card = document.createElement('div');
            card.className = 'card';
            
            // Isi konten
            card.innerHTML = `
                <h3>${item.nama}</h3>
                <p>Nilai: Rp ${item.harga}</p>
                <p><small>[${item.kategori}]</small></p>
                <button class="btn-swap" style="cursor:pointer; padding:5px 10px; background:#007bff; color:white; border:none; border-radius:4px;">Ajukan Swap</button>
            `;
            
            // TAMBAHAN: Event Listener untuk tombol
            const btn = card.querySelector('.btn-swap');
            btn.onclick = function() {
                // Panggil fungsi simpanTransaksi dari track.js
                // Ini akan otomatis memunculkan Toast juga
                simpanTransaksi(item.nama, item.harga);
            };

            grid.appendChild(card);
        });
    }
};