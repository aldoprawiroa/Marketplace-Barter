
document.addEventListener('DOMContentLoaded', () => {
    const btnLoginModal = document.getElementById('btn-login-modal');
    const modalAuth = document.getElementById('modal-auth');
    const btnGetOtp = document.getElementById('btn-get-otp');
    const btnVerifyOtp = document.getElementById('btn-verify-otp');
    let kodeOTPSimulasi = "";

    
    if(btnLoginModal) {
        btnLoginModal.addEventListener('click', () => modalAuth.classList.remove('hidden'));
    }
    
    if(btnGetOtp) {
        btnGetOtp.addEventListener('click', () => {
            kodeOTPSimulasi = Math.floor(1000 + Math.random() * 9000).toString();
            showToast(`[Pesan Sistem] Kode OTP Anda: ${kodeOTPSimulasi}`);
            document.getElementById('otp-section').classList.remove('hidden');
            btnGetOtp.classList.add('hidden');
        });
    }
    if(btnVerifyOtp) {
        btnVerifyOtp.addEventListener('click', () => {
            const inputUser = document.getElementById('auth-otp').value;
            if(inputUser === kodeOTPSimulasi) {
                showToast("Login Berhasil! Selamat datang di SwapSpace.");
                modalAuth.classList.add('hidden');
                document.getElementById('user-balance').innerText = "Saldo SwapPay: Rp 2.500.000";
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert("Kode OTP Salah! Silakan coba lagi.");
            }
        });
    }
});
