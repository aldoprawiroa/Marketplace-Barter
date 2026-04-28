
function renderCatalog(filterKategori = "all") {
    const grid = document.getElementById('catalog-grid');
    if(!grid) return;
    grid.innerHTML = ''; 
    
    dummyData.forEach(item => {
        if(filterKategori === "all" || item.kategori === filterKategori) {
            grid.innerHTML += `
                <div class="card">
                    <h3>${item.nama}</h3>
                    <p style="color:#10b981; font-weight:bold;">Rp ${item.harga.toLocaleString('id-ID')}</p>
                    <span class="badge">${item.kategori}</span>
                    <button class="btn-primary" onclick="openCheckout('${item.id}')">Ajukan Swap</button>
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
