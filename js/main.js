// js/main.js
import { renderHomeProducts, renderProductDetailPage } from './ui.js';
import { filterCategory, applyShopFilters, initProductsPage } from './handlers.js';
import { renderCart, updateCartBadge, updateQuantity, removeItem, checkout, addToCart } from './cart.js';
import {
    renderAdminTable,
    handleProductFormSubmit,
    startEditProduct,
    deleteProduct,
    resetAdminForm,
    handleResetDefaultData
} from './crud.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Luôn cập nhật số lượng giỏ hàng trên thanh Navbar ở mọi trang
    updateCartBadge();

    // 2. Nếu đang ở Trang Chủ (index.html)
    if (document.getElementById('featured-products')) {
        renderHomeProducts();
    }

    // 3. Nếu đang ở Trang Sản Phẩm (products.html)
    if (document.getElementById('shop-products')) {
        initProductsPage();

        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.addEventListener('input', applyShopFilters);

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) sortSelect.addEventListener('change', applyShopFilters);

        const categoryFilters = document.getElementById('category-filters');
        if (categoryFilters) {
            categoryFilters.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-cat]');
                if (btn) {
                    filterCategory(btn.getAttribute('data-cat'), btn);
                }
            });
        }
    }

    // 4. Nếu đang ở Trang Chi Tiết (detail.html)
    if (document.getElementById('product-detail-content')) {
        renderProductDetailPage();
    }

    // 5. Nếu đang ở Trang Giỏ Hàng (cart.html)
    if (document.getElementById('cart-table-body')) {
        renderCart();
        const checkoutBtn = document.getElementById('btn-checkout');
        if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    }

    // 6. Nếu đang ở Trang Quản Lý CRUD (admin.html)
    const productForm = document.getElementById('product-form');
    if (productForm) {
        renderAdminTable();
        productForm.addEventListener('submit', handleProductFormSubmit);

        const cancelBtn = document.getElementById('btn-cancel-edit');
        if (cancelBtn) cancelBtn.addEventListener('click', resetAdminForm);

        const resetDefaultBtn = document.getElementById('btn-reset-default');
        if (resetDefaultBtn) resetDefaultBtn.addEventListener('click', handleResetDefaultData);

        const adminSearch = document.getElementById('admin-search');
        if (adminSearch) {
            adminSearch.addEventListener('input', (e) => renderAdminTable(e.target.value));
        }

        // Xem trước ảnh khi nhập URL hoặc chọn ảnh mẫu thực tế
        const imgInput = document.getElementById('pet-img');
        const sampleSelect = document.getElementById('sample-img-select');
        const imgPreview = document.getElementById('img-preview');

        if (imgInput && imgPreview) {
            imgInput.addEventListener('input', () => {
                if (imgInput.value.trim()) imgPreview.src = imgInput.value.trim();
            });
        }
        if (sampleSelect && imgInput && imgPreview) {
            sampleSelect.addEventListener('change', () => {
                if (sampleSelect.value) {
                    imgInput.value = sampleSelect.value;
                    imgPreview.src = sampleSelect.value;
                }
            });
        }
    }

    // 7. Ủy quyền sự kiện (Event Delegation) toàn cục cho các nút bấm động
    document.addEventListener('click', (e) => {
        // Nút thêm nhanh 1 sản phẩm vào giỏ từ Card
        const cartBtn = e.target.closest('.btn-add-cart');
        if (cartBtn) {
            const id = Number(cartBtn.getAttribute('data-id'));
            addToCart(id, 1);
        }

        // Nút tăng/giảm số lượng ở trang Chi tiết
        if (e.target.closest('#detail-qty-plus')) {
            const qtyInput = document.getElementById('detail-qty-input');
            if (qtyInput) qtyInput.value = Number(qtyInput.value) + 1;
        }
        if (e.target.closest('#detail-qty-minus')) {
            const qtyInput = document.getElementById('detail-qty-input');
            if (qtyInput && Number(qtyInput.value) > 1) {
                qtyInput.value = Number(qtyInput.value) - 1;
            }
        }

        // Nút thêm vào giỏ ở trang Chi tiết (với số lượng tùy chọn)
        const cartDetailBtn = e.target.closest('.btn-add-cart-detail');
        if (cartDetailBtn) {
            const id = Number(cartDetailBtn.getAttribute('data-id'));
            const qtyInput = document.getElementById('detail-qty-input');
            const qty = qtyInput ? Number(qtyInput.value) : 1;
            addToCart(id, qty);
        }

        // Nút tăng/giảm/xóa trong Giỏ hàng
        const incBtn = e.target.closest('.btn-increase');
        if (incBtn) updateQuantity(Number(incBtn.getAttribute('data-id')), 1);

        const decBtn = e.target.closest('.btn-decrease');
        if (decBtn) updateQuantity(Number(decBtn.getAttribute('data-id')), -1);

        const rmBtn = e.target.closest('.btn-remove-item');
        if (rmBtn) removeItem(Number(rmBtn.getAttribute('data-id')));

        // Nút Sửa / Xóa trong bảng CRUD Admin
        const editBtn = e.target.closest('.btn-edit-pet');
        if (editBtn) startEditProduct(Number(editBtn.getAttribute('data-id')));

        const deleteBtn = e.target.closest('.btn-delete-pet');
        if (deleteBtn) deleteProduct(Number(deleteBtn.getAttribute('data-id')));
    });
});