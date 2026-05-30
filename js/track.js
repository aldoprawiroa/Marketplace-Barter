/* 
   File: js/track.js
   Logic: Menangani rendering data, filtering, summary cards, dan aksi pengguna.
*/

// Data Default (Simulasi Database)
const defaultTransactions = [
    {
        id: "SWP-001",
        targetItem: "Sepeda Lipat",
        targetPrice: 1800000,
        offerItem: "Tas Laptop",
        offerPrice: 300000,
        diff: 1500000,
        status: "success",
        date: "2026-05-20"
    },
    {
        id: "SWP-002",
        targetItem: "Kamera Mirrorless",
        targetPrice: 3200000,
        offerItem: "Keyboard Mechanical",
        offerPrice: 750000,
        diff: 2450000,
        status: "pending",
        date: "2026-05-24"
    },
    {
        id: "SWP-003",
        targetItem: "Jaket Kulit Lokal",
        targetPrice: 650000,
        offerItem: "Mouse Wireless",
        offerPrice: 150000,
        diff: 500000,
        status: "cancelled",
        date: "2026-05-15"
    }
];

// Inisialisasi
function init() {
    if (!localStorage.getItem('swapTransactions')) {
        localStorage.setItem('swapTransactions', JSON.stringify(defaultTransactions));
        // Set saldo awal yang cukup untuk demo
        localStorage.setItem('userBalance', 5000000); 
    }
    renderTransactions('all');
    renderSummary();
    setFilterActive('all');
}

// Helper: Format Rupiah
function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

// 1. Render Ringkasan Profil (Kartu Atas)
function renderSummary() {
    const data = JSON.parse(localStorage.getItem('swapTransactions')) || [];
    const total = data.length;
    const pending = data.filter(t => t.status === 'pending').length;
    const success = data.filter(t => t.status === 'success').length;

    const html = `
        <!-- Card Total -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <i class="ti ti-list-details text-xl"></i>
            </div>
            <div>
                <h3 class="text-gray-500 text-sm font-medium">Total Transaksi</h3>
                <p class="text-2xl font-bold text-gray-900 mt-1">${total}</p>
            </div>
        </div>

        <!-- Card Pending -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div class="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                <i class="ti ti-clock-pause text-xl"></i>
            </div>
            <div>
                <h3 class="text-gray-500 text-sm font-medium">Menunggu Respon</h3>
                <p class="text-2xl font-bold text-gray-900 mt-1">${pending}</p>
            </div>
        </div>

        <!-- Card Sukses -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div class="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <i class="ti ti-circle-check text-xl"></i>
            </div>
            <div>
                <h3 class="text-gray-500 text-sm font-medium">Swap Sukses</h3>
                <p class="text-2xl font-bold text-gray-900 mt-1">${success}</p>
            </div>
        </div>
    `;
    document.getElementById('profile-summary').innerHTML = html;
}

// 2. Render Tabel Transaksi
function renderTransactions(filterType, searchTerm = '') {
    const data = JSON.parse(localStorage.getItem('swapTransactions')) || [];
    const tbody = document.getElementById('transaction-list');
    const emptyState = document.getElementById('empty-state');
    tbody.innerHTML = '';

    let filteredData = data;
    if (filterType !== 'all') filteredData = filteredData.filter(t => t.status === filterType);
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredData = filteredData.filter(t => 
            t.id.toLowerCase().includes(term) || 
            t.targetItem.toLowerCase().includes(term) ||
            t.offerItem.toLowerCase().includes(term)
        );
    }

    if (filteredData.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    filteredData.forEach(t => {
        let statusHtml = '';
        let actionHtml = '';

        // Logika Status & Icon
        switch(t.status) {
            case 'pending':
                statusHtml = `<span class="status-badge status-pending"><i class="ti ti-hourglass"></i> Menunggu Konfirmasi</span>`;
                actionHtml = `
                    <button onclick="viewTracking('${t.id}')" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded-md transition text-sm font-medium">
                        <i class="ti ti-map-pin"></i> Lacak
                    </button>
                    <button onclick="cancelTransaction('${t.id}')" class="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition text-sm font-medium ml-2">
                        <i class="ti ti-x"></i> Batal
                    </button>`;
                break;
            case 'success':
                statusHtml = `<span class="status-badge status-success"><i class="ti ti-check"></i> Swap Selesai</span>`;
                actionHtml = `<button class="text-gray-400 cursor-default text-sm font-medium inline-flex items-center gap-1"><i class="ti ti-eye"></i> Lihat</button>`;
                break;
            case 'cancelled':
                statusHtml = `<span class="status-badge status-cancelled"><i class="ti ti-ban"></i> Dibatalkan</span>`;
                actionHtml = `<span class="text-gray-300 text-sm font-medium">-</span>`;
                break;
        }

        const row = `
            <tr class="hover:bg-slate-50 transition duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">#${t.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-slate-900">${t.targetItem}</div>
                    <div class="text-xs text-gray-400">${formatRupiah(t.targetPrice)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600">${t.offerItem}</div>
                    <div class="text-xs text-gray-400">${formatRupiah(t.offerPrice)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold ${t.diff > 0 ? 'text-red-600' : 'text-gray-500'}">
                    ${t.diff > 0 ? '+' + formatRupiah(t.diff) : '0'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">${statusHtml}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right">${actionHtml}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Fungsi UI: Toggle Tombol Filter Aktif
function setFilterActive(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.className = "filter-btn px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 text-gray-500 hover:text-gray-700";
        if (btn.textContent.toLowerCase().includes(type === 'all' ? 'semua' : type === 'success' ? 'sukses' : type === 'cancelled' ? 'dibatalkan' : 'menunggu')) {
            btn.className = "filter-btn px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200 bg-white text-teal-600 shadow-sm border border-gray-200";
        }
    });
}

// Fungsi: Filter Transaksi
function filterTransactions(type) {
    setFilterActive(type);
    renderTransactions(type, document.getElementById('search-input').value);
}

// Event Listener: Search Input
document.getElementById('search-input').addEventListener('input', (e) => {
    renderTransactions('all', e.target.value);
});

// Aksi: Batalkan Transaksi
function cancelTransaction(id) {
    if(confirm('Apakah Anda yakin ingin membatalkan swap ini?')) {
        let data = JSON.parse(localStorage.getItem('swapTransactions'));
        let item = data.find(t => t.id === id);
        if(item) {
            item.status = 'cancelled';
            localStorage.setItem('swapTransactions', JSON.stringify(data));
            renderTransactions('all');
            renderSummary();
        }
    }
}

// Aksi: Lacak Detail
function viewTracking(id) {
    let data = JSON.parse(localStorage.getItem('swapTransactions'));
    let item = data.find(t => t.id === id);
    if(item) {
        alert(`Tracking #${item.id}\n\nStatus: Menunggu Konfirmasi\nEstimasi: 1x24 Jam\n\nCatatan: Barang sedang diverifikasi oleh admin.`);
    }
}

// Aksi: Reset Demo
function resetDemo() {
    if(confirm('Reset semua data ke kondisi awal?')) {
        localStorage.removeItem('swapTransactions');
        localStorage.removeItem('userBalance');
        init();
    }
}

window.onload = init;