// js/cart.js
import { dssp } from './data.js';
import { formatVND, showToast } from './utils.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(id, quantity = 1) {
    const product = dssp.find(item => item.id === id);
    if (!product) return;
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
        // Cập nhật lại tên/giá/ảnh mới nhất phòng trường hợp vừa sửa bên CRUD
        existingItem.name = product.name;
        existingItem.price = product.price;
        existingItem.img = product.img;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: quantity
        });
    }
    saveCart();
    updateCartBadge();
    showToast(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
}

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

export function renderCart() {
    const tbody = document.getElementById('cart-table-body');
    if (!tbody) return;

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-5">
                    <i class="fa-solid fa-cart-arrow-down display-4 mb-3 d-block text-secondary"></i>
                    Giỏ hàng của bạn đang trống.
                    <div class="mt-3">
                        <a href="products.html" class="btn btn-warning text-white rounded-pill px-4 fw-bold">Mua Sắm Ngay</a>
                    </div>
                </td>
            </tr>`;
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');
        if (subtotalEl) subtotalEl.innerText = formatVND(0);
        if (totalEl) totalEl.innerText = formatVND(0);
        return;
    }

    tbody.innerHTML = cart.map(item => `
        <tr>
            <td class="py-3">
                <a href="detail.html?id=${item.id}" class="d-flex align-items-center text-decoration-none">
                    <img src="${item.img}" class="rounded-3 shadow-sm me-3" style="width: 60px; height: 60px; object-fit: cover;">
                    <span class="fw-bold text-dark">${item.name}</span>
                </a>
            </td>
            <td class="py-3 fw-medium">${formatVND(item.price)}</td>
            <td class="py-3">
                <div class="input-group input-group-sm rounded-pill overflow-hidden border" style="width: 120px;">
                    <button class="btn btn-light px-2 border-0 btn-decrease" data-id="${item.id}"><i class="fa-solid fa-minus text-secondary"></i></button>
                    <input type="text" class="form-control text-center bg-white border-0 fw-bold" value="${item.quantity}" readonly>
                    <button class="btn btn-light px-2 border-0 btn-increase" data-id="${item.id}"><i class="fa-solid fa-plus text-secondary"></i></button>
                </div>
            </td>
            <td class="py-3 fw-bold text-danger">${formatVND(item.price * item.quantity)}</td>
            <td class="py-3 text-center">
                <button class="btn btn-outline-danger btn-sm rounded-circle p-2 shadow-sm btn-remove-item" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.innerText = formatVND(subtotal);
    if (totalEl) totalEl.innerText = formatVND(subtotal);
}

export function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        updateCartBadge();
        renderCart();
    }
}

export function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartBadge();
    renderCart();
    showToast("Đã xóa sản phẩm khỏi giỏ hàng!", "bg-danger");
}

export function checkout() {
    if (cart.length === 0) {
        showToast("Giỏ hàng của bạn đang trống!", "bg-danger");
        return;
    }
    cart = [];
    saveCart();
    updateCartBadge();
    const cartSection = document.getElementById('cart-view-section');
    const orderSection = document.getElementById('section-order');
    if (cartSection) cartSection.style.display = 'none';
    if (orderSection) orderSection.style.display = 'block';
}