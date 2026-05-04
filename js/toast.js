
function showToast(pesan, tipe = "success") {
    const container = document.getElementById('toast-container');
    if (!container) return;

    
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    
    if(tipe === "error") {
        toast.style.background = "#ef4444"; 
    }

    toast.innerText = pesan;
    container.appendChild(toast);

    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}
