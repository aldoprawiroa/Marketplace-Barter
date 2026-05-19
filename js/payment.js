// Logika Pembayaran oleh Faiz (018)
function processPayment(amountToPay) {
    let currentBalance = parseInt(localStorage.getItem('swapBalance')) || 0;
    
    if (currentBalance >= amountToPay) {
        currentBalance -= amountToPay;
        localStorage.setItem('swapBalance', currentBalance);
        
        // Update tampilan saldo Aldo
        const userDisplay = document.getElementById('user-display');
        if(userDisplay) userDisplay.innerText = `Halo, User! Saldo: Rp ${currentBalance.toLocaleString('id-ID')}`;
        
        return true;
    } else {
        if(typeof showToast === 'function') showToast("Saldo SwapPay tidak mencukupi!", "error");
        return false;
    }
}