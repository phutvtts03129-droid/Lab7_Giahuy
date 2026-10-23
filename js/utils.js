// js/utils.js

// Định dạng tiền VNĐ
export function formatVND(price) {
    return Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Lấy tên tiếng Việt của danh mục
export function getCategoryName(cat) {
    const names = {
        Cho: "Chó Cảnh",
        Meo: "Mèo Cảnh",
        Hamster: "Hamster",
        Chim: "Chim Cảnh",
        Ca: "Cá Cảnh"
    };
    return names[cat] || cat;
}

// Hiển thị Toast thông báo nổi
export function showToast(message, bgClass = 'bg-success') {
    const toastMessage = document.getElementById('toast-message');
    const toastElement = document.getElementById('liveToast');
    if (toastMessage && toastElement) {
        toastMessage.innerText = message;
        toastElement.className = `toast align-items-center text-white ${bgClass} border-0 shadow-lg`;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
}