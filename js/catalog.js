function lanjutPilihBarang(itemId) {
    const itemTujuan = dummyData.find(d => d.id === itemId);
    localStorage.setItem('itemTujuan', JSON.stringify(itemTujuan));
    window.location.href = 'pilihbarang.html';
}

function renderCatalog(filterKategori = "all") {
    const grid = document.getElementById('catalog-grid');
    if(!grid) return;
    grid.innerHTML = ''; 
    
    dummyData.forEach(item => {
        if(filterKategori === "all" || item.kategori === filterKategori) {
            grid.innerHTML += `
                <div class="card">
                    <img src="${item.image}" alt="${item.nama}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
                    <h3>${item.nama}</h3>
                    <p style="color:#10b981; font-weight:bold;">Rp ${item.harga.toLocaleString('id-ID')}</p>
                    <span class="badge">${item.kategori}</span>
                    <button class="btn-primary" style="margin-top:15px; width:100%;" onclick="lanjutPilihBarang('${item.id}')">Ajukan Swap</button>
                </div>
            `;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    
    const filterSelect = document.getElementById('filter-kategori');
    if(filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            renderCatalog(e.target.value);
        });
    }
});