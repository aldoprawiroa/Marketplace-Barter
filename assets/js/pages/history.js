const historyRecords = [
  { id: 'H-1001', item: 'Vintage Camera', partner: 'Rina', date: '2026-06-28', status: 'Completed', type: 'Direct Swap', score: 96 },
  { id: 'H-1002', item: 'Desk Lamp', partner: 'Adit', date: '2026-06-20', status: 'Completed', type: 'Gift Swap', score: 93 },
  { id: 'H-1003', item: 'Running Shoes', partner: 'Nadia', date: '2026-06-18', status: 'Cancelled', type: 'Cashless', score: 88 },
  { id: 'H-1004', item: 'Bookshelf', partner: 'Dian', date: '2026-06-14', status: 'Pending', type: 'Direct Swap', score: 90 },
  { id: 'H-1005', item: 'Portable Speaker', partner: 'Lala', date: '2026-06-10', status: 'Completed', type: 'Point Swap', score: 95 },
  { id: 'H-1006', item: 'Backpack', partner: 'Joko', date: '2026-06-06', status: 'Completed', type: 'Direct Swap', score: 91 },
  { id: 'H-1007', item: 'Coffee Maker', partner: 'Mila', date: '2026-06-02', status: 'Cancelled', type: 'Gift Swap', score: 85 },
  { id: 'H-1008', item: 'Bicycle Helmet', partner: 'Oki', date: '2026-05-30', status: 'Pending', type: 'Direct Swap', score: 89 },
  { id: 'H-1009', item: 'Monitor Stand', partner: 'Sari', date: '2026-05-25', status: 'Completed', type: 'Point Swap', score: 94 },
  { id: 'H-1010', item: 'Travel Mug', partner: 'Fadli', date: '2026-05-21', status: 'Completed', type: 'Direct Swap', score: 92 }
];

const searchInput = document.getElementById('historySearch');
const statusFilter = document.getElementById('statusFilter');
const tableBody = document.getElementById('historyTableBody');
const cardsMobile = document.getElementById('historyCards');
const completedCount = document.getElementById('completedCount');
const cancelledCount = document.getElementById('cancelledCount');
const pendingCount = document.getElementById('pendingCount');
const successRate = document.getElementById('successRate');

function renderHistory() {
  const query = searchInput.value.trim().toLowerCase();
  const selected = statusFilter.value;
  const filtered = historyRecords.filter((record) => {
    const matchesSearch = [record.item, record.partner, record.id, record.type].join(' ').toLowerCase().includes(query);
    const matchesStatus = selected === 'All' || record.status.toLowerCase() === selected.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  tableBody.innerHTML = filtered.map((record) => `
    <tr>
      <td>${record.id}</td>
      <td>${record.item}</td>
      <td>${record.partner}</td>
      <td>${record.date}</td>
      <td><span class="badge ${record.status.toLowerCase()}">${record.status}</span></td>
      <td>${record.type}</td>
      <td>${record.score}</td>
    </tr>
  `).join('');

  cardsMobile.innerHTML = filtered.map((record) => `
    <div class="card-mobile">
      <div class="row"><strong>${record.item}</strong><span class="badge ${record.status.toLowerCase()}">${record.status}</span></div>
      <div class="row"><span>Partner</span><strong>${record.partner}</strong></div>
      <div class="row"><span>Date</span><strong>${record.date}</strong></div>
      <div class="row"><span>Type</span><strong>${record.type}</strong></div>
    </div>
  `).join('');

  completedCount.textContent = historyRecords.filter((record) => record.status === 'Completed').length;
  cancelledCount.textContent = historyRecords.filter((record) => record.status === 'Cancelled').length;
  pendingCount.textContent = historyRecords.filter((record) => record.status === 'Pending').length;
  const success = Math.round((historyRecords.filter((record) => record.status === 'Completed').length / historyRecords.length) * 100);
  successRate.textContent = `${success}%`;
}

searchInput.addEventListener('input', renderHistory);
statusFilter.addEventListener('change', renderHistory);
renderHistory();
