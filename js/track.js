/* 
   File: js/track.js
   Fungsi: Mengelola data tracking, filter, ringkasan profil, dan reset demo.
   Catatan: Menggunakan LocalStorage untuk mensimulasikan database sementara.
*/

// Data Dummy (Simulasi isi dari file Anggota.txt / Database)
const defaultTransactions = [
    {
        id: "SWP-001",
        targetItem: "Sepeda Lipat",
        targetPrice: 1800000,
        offerItem: "Tas Laptop",
        offerPrice: 300000,
        diff: 1500000,
        status: "success", // success, pending, cancelled
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

// Inisialisasi Data
function init() {
    if (!localStorage.getItem('swapTransactions')) {
        localStorage.setItem('swapTransactions', JSON.stringify(defaultTransactions));
    }
    renderTransactions('all');
    renderSummary();
}

// Mengambil data
function getTransactions() {
    return JSON.parse(localStorage.getItem('swapTransactions'));
}

// Format Mata Uang
function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

// Render Ringkasan Profil (Atas Halaman)
function renderSummary() {
    const data = getTransactions();
    const total = data.length;
    const pending = data.filter(t => t.status === 'pending').length;
    const success = data.filter(t => t.status === 'success').length;

    const html = `
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 class="text-gray-500 text-sm font-medium">Total Transaksi</h3>
            <p class="text-3xl font-bold text-gray-800">${total}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 class="text-gray-500 text-sm font-medium">Menunggu Respon</h3>
            <p class="text-3xl font-bold text-gray-800">${pending}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 class="text-gray-500 text-sm font-medium">Swap Sukses</h3>
            <p class="text-3xl font-bold text-gray-800">${success}</p>
        </div>
    `;
    document.getElementById('profile-summary').innerHTML = html;
}

// Render Tabel Transaksi
function renderTransactions(filterType, searchTerm = '') {
    const data = getTransactions();
    const tbody = document.getElementById('transaction-list');
    const emptyState = document.getElementById('empty-state');
    tbody.innerHTML = '';

    let filteredData = data;

    // Filter Status
    if (filterType !== 'all') {
        filteredData = filteredData.filter(t => t.status === filterType);
    }

    // Filter Search
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        filteredData = filteredData.filter(t => 
            t.id.toLowerCase().includes(lowerTerm) || 
            t.targetItem.toLowerCase().includes(lowerTerm) ||
            t.offerItem.toLowerCase().includes(lowerTerm)
        );
    }

    if (filteredData.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    filteredData.forEach(t => {
        let statusBadge = '';
        let actionBtn = '';

        // Logika Status dan Tombol Aksi
        switch(t.status) {
            case 'pending':
                statusBadge = `<span class="status-badge status-pending">Menunggu Konfirmasi</span>`;
                // Tombol Cek Tracking detail atau Batalkan
                actionBtn = `
                    <button onclick="viewTracking('${t.id}')" class="text-blue-600 hover:text-blue-900 text-sm font-medium mr-2">Lacak</button>
                    <button onclick="cancelTransaction('${t.id}')" class="text-red-600 hover:text-red-900 text-sm font-medium">Batalkan</button>
                `;
                break;
            case 'success':
                statusBadge = `<span class="status-badge status-success">Swap Selesai</span>`;
                actionBtn = `<button class="text-gray-400 cursor-not-allowed text-sm font-medium">Selesai</button>`;
                break;
            case 'cancelled':
                statusBadge = `<span class="status-badge status-cancelled">Dibatalkan</span>`;
                actionBtn = `<button class="text-gray-400 cursor-not-allowed text-sm font-medium">-</button>`;
                break;
        }

        const row = `
            <tr class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${t.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 font-semibold">${t.targetItem}</div>
                    <div class="text-xs text-gray-500">Nilai: ${formatRupiah(t.targetPrice)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">${t.offerItem}</div>
                    <div class="text-xs text-gray-400">Nilai: ${formatRupiah(t.offerPrice)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold text-red-500">
                    ${t.diff > 0 ? '+' + formatRupiah(t.diff) : 'Seimbang'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${actionBtn}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Fungsi Filter Tombol
function filterTransactions(type) {
    // Update style tombol aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-gray-900', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-600');
    });
    
    // Highlight tombol yang diklik (logic sederhana, bisa lebih baik dengan ID)
    event.target.classList.remove('bg-gray-100', 'text-gray-600');
    event.target.classList.add('bg-gray-900', 'text-white');

    renderTransactions(type, document.getElementById('search-input').value);
}

// Event Listener untuk Search
document.getElementById('search-input').addEventListener('input', (e) => {
    renderTransactions('all', e.target.value);
});

// Aksi: Batalkan Transaksi
function cancelTransaction(id) {
    if(confirm('Apakah Anda yakin ingin membatalkan swap ini?')) {
        let data = getTransactions();
        let index = data.findIndex(t => t.id === id);
        if(index !== -1) {
            data[index].status = 'cancelled';
            localStorage.setItem('swapTransactions', JSON.stringify(data));
            renderTransactions('all'); // Refresh tampilan
            renderSummary(); // Refresh summary
            alert('Transaksi ' + id + ' telah dibatalkan.');
        }
    }
}

// Aksi: Lihat Tracking Detail (Modal sederhana atau Alert)
function viewTracking(id) {
    let data = getTransactions();
    let item = data.find(t => t.id === id);
    if(item) {
        alert(`Detail Tracking #${item.id}:\nStatus: Menunggu Konfirmasi Pihak Lawan.\nEstimasi: 1-2 Hari Kerja.`);
    }
}

// Fungsi Reset Demo (Mengembalikan data ke awal)
function resetDemo() {
    if(confirm('Reset semua data ke kondisi awal?')) {
        localStorage.removeItem('swapTransactions');
        init();
        alert('Data telah direset.');
    }
}

// Jalankan saat load
window.onload = init;