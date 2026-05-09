// Manajemen Kategori oleh Ibrahim (019)
const swapCategories = ["Elektronik", "Olahraga", "Fashion", "Kendaraan", "Hobi", "Lainnya"];

function loadCategories() {
    const filterSelect = document.getElementById('category-filter');
    if (!filterSelect) return;
    
    // Jangan hapus opsi 'all' bawaan Aldo, tambahkan sisanya
    swapCategories.forEach(cat => {
        filterSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}