const shipments = [
  {
    id: 'SW-2048',
    title: 'Vintage Camera',
    category: 'Electronics',
    courier: 'FedEx',
    currentStatus: 'Preparing Item',
    eta: 'Today, 16:30',
    lastUpdate: 'Packed and labeled',
    location: 'Jakarta Hub',
    timeline: [
      { label: 'Proposal Accepted', completed: true },
      { label: 'Preparing Item', completed: true },
      { label: 'Packaging', completed: false },
      { label: 'Shipping', completed: false },
      { label: 'Delivered', completed: false },
      { label: 'Completed', completed: false }
    ],
    history: [
      { time: '09:20', note: 'Seller confirmed the swap request.' },
      { time: '11:05', note: 'Item inspection completed.' },
      { time: '13:40', note: 'Transit booking created.' }
    ]
  },
  {
    id: 'SW-3321',
    title: 'Desk Lamp',
    category: 'Home',
    courier: 'JNE',
    currentStatus: 'Shipping',
    eta: 'Tomorrow, 09:00',
    lastUpdate: 'In transit to Surabaya',
    location: 'Bandung Sorting Center',
    timeline: [
      { label: 'Proposal Accepted', completed: true },
      { label: 'Preparing Item', completed: true },
      { label: 'Packaging', completed: true },
      { label: 'Shipping', completed: true },
      { label: 'Delivered', completed: false },
      { label: 'Completed', completed: false }
    ],
    history: [
      { time: '08:15', note: 'Package scanned at origin.' },
      { time: '12:40', note: 'Departed from Bandung.' },
      { time: '15:30', note: 'Arrived at Surabaya transit hub.' }
    ]
  },
  {
    id: 'SW-1189',
    title: 'Running Shoes',
    category: 'Sports',
    courier: 'Pos Indonesia',
    currentStatus: 'Delivered',
    eta: 'Completed',
    lastUpdate: 'Recipient signed for delivery',
    location: 'Yogyakarta',
    timeline: [
      { label: 'Proposal Accepted', completed: true },
      { label: 'Preparing Item', completed: true },
      { label: 'Packaging', completed: true },
      { label: 'Shipping', completed: true },
      { label: 'Delivered', completed: true },
      { label: 'Completed', completed: true }
    ],
    history: [
      { time: '07:10', note: 'Item received from seller.' },
      { time: '10:00', note: 'Delivery completed successfully.' },
      { time: '10:10', note: 'Swap marked complete.' }
    ]
  }
];

const searchInput = document.getElementById('trackingSearch');
const statusPill = document.getElementById('statusPill');
const shipmentTitle = document.getElementById('shipmentTitle');
const shipmentSummary = document.getElementById('shipmentSummary');
const timelineList = document.getElementById('timelineList');
const currentStatus = document.getElementById('currentStatus');
const shipmentMeta = document.getElementById('shipmentMeta');
const arrivalValue = document.getElementById('arrivalValue');
const historyList = document.getElementById('historyList');

function renderTracking() {
  const query = searchInput.value.trim().toLowerCase();
  const shipment = shipments.find((entry) => {
    const haystack = `${entry.id} ${entry.title} ${entry.category} ${entry.currentStatus}`.toLowerCase();
    return haystack.includes(query);
  }) || shipments[0];

  statusPill.textContent = shipment.currentStatus;
  shipmentTitle.textContent = shipment.title;
  shipmentSummary.textContent = `Tracking ${shipment.id} • ${shipment.category} shipped via ${shipment.courier}`;

  timelineList.innerHTML = shipment.timeline.map((item) => {
    const stateClass = item.completed ? 'completed' : item.label === shipment.currentStatus ? 'active' : '';
    return `<li class="${stateClass}"><strong>${item.label}</strong><span>${item.completed ? 'Completed' : 'Pending'}</span></li>`;
  }).join('');

  currentStatus.innerHTML = `
    <div class="value">${shipment.currentStatus}</div>
    <div class="subtle">${shipment.lastUpdate}</div>
  `;

  shipmentMeta.innerHTML = `
    <div class="meta-item"><span>Shipment ID</span><strong>${shipment.id}</strong></div>
    <div class="meta-item"><span>Courier</span><strong>${shipment.courier}</strong></div>
    <div class="meta-item"><span>Location</span><strong>${shipment.location}</strong></div>
  `;

  arrivalValue.textContent = shipment.eta;

  historyList.innerHTML = shipment.history.map((entry) => `
    <div class="history-item">
      <strong>${entry.time}</strong>
      <span>${entry.note}</span>
    </div>
  `).join('');
}

searchInput.addEventListener('input', renderTracking);
renderTracking();
