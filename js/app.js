window.onload = function() {
  const grid = document.getElementById('catalog-grid');
  
  if(grid && typeof dummyData !== 'undefined') {
    grid.innerHTML = ''; 
    
    dummyData.forEach(item => {
      grid.innerHTML += `
        <div class="card">
          <h3>${item.nama}</h3>
          <p>Nilai: Rp ${item.harga}</p>
          <p><small>[${item.kategori}]</small></p>
          <button>Ajukan Swap</button>
        </div>
      `;
    });
  }
};