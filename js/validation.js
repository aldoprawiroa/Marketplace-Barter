// Sistem Validasi Input oleh Faiz (018)
function validateInput(value, fieldName) {
    if (!value || value.trim() === '') {
        if(typeof showToast === 'function') showToast(`${fieldName} wajib diisi terlebih dahulu!`, "error");
        return false;
    }
    return true;
}