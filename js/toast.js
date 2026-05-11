// js/toast.js

/**
 * Menampilkan notifikasi Toast
 * @param {string} message - Pesan yang ditampilkan
 * @param {string} type - Tipe notifikasi ('success', 'warning', 'error', 'info')
 */
function showToast(message, type = 'info') {
    // 1. Buat container toast jika belum ada
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }

    // 2. Buat elemen toast
    const toast = document.createElement('div');
    
    // Warna berdasarkan tipe
    let bgColor = '#3b82f6'; // Default Blue (Info)
    if (type === 'success') bgColor = '#10b981'; // Green
    if (type === 'error') bgColor = '#ef4444'; // Red
    if (type === 'warning') bgColor = '#f59e0b'; // Orange

    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: sans-serif;
        font-weight: 500;
        animation: slideIn 0.3s ease-out forwards;
        min-width: 250px;
    `;
    
    toast.innerText = message;

    // 3. Masukkan ke container
    toastContainer.appendChild(toast);

    // 4. Hapus otomatis setelah 3 detik
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Tambahkan CSS animasi dinamis
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);