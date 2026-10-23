// js/handlers.js
import { dssp } from './data.js';
import { getCategoryName } from './utils.js';
import { renderShopProducts } from './ui.js';

let currentCategory = 'all';



export function applyShopFilters() {
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const sortBy = sortSelect ? sortSelect.value : 'default';

    // 1. Lọc theo danh mục
    let filtered = currentCategory === 'all'
        ? [...dssp]
        : dssp.filter(p => p.category === currentCategory);

    // 2. Lọc theo từ khóa tìm kiếm
    if (keyword) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(keyword) ||
            getCategoryName(p.category).toLowerCase().includes(keyword)
        );
    }




    // 3. Sắp xếp
    if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }

    renderShopProducts(filtered);
}

// Chọn danh mục
export function filterCategory(cat, buttonEl) {
    currentCategory = cat;

    const buttons = document.querySelectorAll('#category-filters button');
    buttons.forEach(btn => {
        btn.classList.remove('btn-dark', 'active');
        btn.classList.add('btn-outline-dark');
    });

    if (buttonEl) {
        buttonEl.classList.remove('btn-outline-dark');
        buttonEl.classList.add('btn-dark', 'active');
    }

    applyShopFilters();
}

// Khởi tạo trang sản phẩm (kiểm tra nếu URL có ?category=...)
export function initProductsPage() {
    const params = new URLSearchParams(window.location.search);
    const urlCat = params.get('category');

    if (urlCat) {
        const targetBtn = document.querySelector(`#category-filters button[data-cat="${urlCat}"]`);
        if (targetBtn) {
            filterCategory(urlCat, targetBtn);
            return;
        }
    }
    applyShopFilters();
}