// js/ui.js
import { dssp } from './data.js';
import { formatVND, getCategoryName } from './utils.js';

// Tạo thẻ HTML sản phẩm (Chuyển hướng sang detail.html?id=...)


export function createProductCard(p) {
    return `
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card product-card shadow-sm">
                <a href="detail.html?id=${p.id}" class="product-img-wrapper position-relative d-block text-decoration-none">
                    <img src="${p.img}" class="product-img" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'">
                    <span class="position-absolute top-0 end-0 badge bg-dark m-2 px-2 py-1 shadow-sm">${getCategoryName(p.category)}</span>
                </a>
                <div class="card-body d-flex flex-column p-3">
                    <a href="detail.html?id=${p.id}" class="text-decoration-none">
                        <h5 class="card-title fs-6 fw-bold text-dark text-truncate mb-2">${p.name}</h5>
                    </a>
                    <p class="text-danger fw-bold fs-5 mb-3">${formatVND(p.price)}</p>
                    <div class="mt-auto d-flex gap-2">
                        <a href="detail.html?id=${p.id}" class="btn btn-outline-dark btn-sm flex-grow-1 rounded-pill fw-bold">Chi Tiết</a>
                        <button class="btn btn-warning btn-sm flex-grow-1 text-white rounded-pill fw-bold shadow-sm btn-add-cart" data-id="${p.id}">
                            <i class="fa-solid fa-cart-plus"></i> Chọn Mua
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render 8 sản phẩm nổi bật ở Trang chủ (index.html)
export function renderHomeProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    container.innerHTML = dssp.slice(0, 8).map(p => createProductCard(p)).join('');
}





// Render danh sách cửa hàng ở Trang sản phẩm (products.html)
export function renderShopProducts(products = dssp) {
    const container = document.getElementById('shop-products');
    if (!container) return;
    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fa-solid fa-magnifying-glass display-4 text-muted mb-3 d-block"></i>
                <p class="text-muted fs-5">Không tìm thấy thú cưng phù hợp với tiêu chí.</p>
            </div>`;
        return;
    }
    container.innerHTML = products.map(p => createProductCard(p)).join('');
}

// Render Trang chi tiết sản phẩm (detail.html)
export function renderProductDetailPage() {
    const container = document.getElementById('product-detail-content');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const p = dssp.find(item => item.id === id) || dssp[0];
    if (!p) {
        container.innerHTML = `<div class="col-12 text-center py-5"><h4>Không tìm thấy thông tin thú cưng!</h4></div>`;
        return;
    }
    container.innerHTML = `
        <div class="col-md-6 mb-4 mb-md-0">
            <img src="${p.img}" class="img-fluid rounded-4 shadow w-100" style="max-height: 440px; object-fit: cover;" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'">
        </div>
        <div class="col-md-6 ps-md-4">
            <span class="badge bg-warning text-dark px-3 py-2 rounded-pill mb-3 fw-bold">
                <i class="fa-solid fa-tag me-1"></i> ${getCategoryName(p.category)}
            </span>
            <h2 class="fw-bold mb-3 text-dark">${p.name}</h2>
            <h3 class="text-danger fw-bold mb-3">${formatVND(p.price)}</h3>
            <p class="text-muted mb-4 lh-lg">${p.desc}</p>

            <div class="bg-light p-3 rounded-4 mb-4">
                <div class="d-flex align-items-center mb-2 text-success fw-medium">
                    <i class="fa-solid fa-shield-heart me-2"></i> Đã tiêm phòng & sổ giun đầy đủ
                </div>
                <div class="d-flex align-items-center text-primary fw-medium">
                    <i class="fa-solid fa-truck-fast me-2"></i> Miễn phí vận chuyển toàn quốc
                </div>
            </div>

            <div class="d-flex align-items-center gap-3 flex-wrap">
                <div class="input-group rounded-pill overflow-hidden border" style="width: 130px;">
                    <button class="btn btn-light border-0" type="button" id="detail-qty-minus"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" id="detail-qty-input" class="form-control text-center border-0 fw-bold bg-white" value="1" min="1" readonly>
                    <button class="btn btn-light border-0" type="button" id="detail-qty-plus"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="btn btn-warning btn-lg text-white fw-bold px-4 rounded-pill shadow btn-add-cart-detail" data-id="${p.id}">
                    <i class="fa-solid fa-cart-plus me-2"></i> Thêm Vào Giỏ Hàng
                </button>
            </div>
        </div>
    `;

    // Render các sản phẩm cùng danh mục
    const relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
        const related = dssp.filter(item => item.category === p.category && item.id !== p.id).slice(0, 4);
        relatedContainer.innerHTML = related.length > 0
            ? related.map(item => createProductCard(item)).join('')
            : `<div class="col-12"><p class="text-muted">Chưa có thú cưng khác cùng danh mục.</p></div>`;
    }
}