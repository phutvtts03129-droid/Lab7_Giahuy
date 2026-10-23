// js/crud.js
import { dssp, saveProductsToStorage, resetProductsToDefault } from './data.js';
import { formatVND, getCategoryName, showToast } from './utils.js';

// Render bảng danh sách sản phẩm trong trang Admin
export function renderAdminTable(keyword = '') {
    const tbody = document.getElementById('admin-product-tbody');
    const totalCount = document.getElementById('admin-total-count');
    if (!tbody) return;

    const filtered = dssp.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        getCategoryName(p.category).toLowerCase().includes(keyword.toLowerCase())
    );

    if (totalCount) totalCount.innerText = filtered.length;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Không tìm thấy thú cưng nào.</td></tr>`;
        return;
    }
    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td class="fw-bold text-secondary">#${p.id}</td>
            <td>
                <img src="${p.img}" alt="${p.name}" class="rounded-3 shadow-sm" style="width: 55px; height: 55px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'">
            </td>
            <td>
                <a href="detail.html?id=${p.id}" class="fw-bold text-dark text-decoration-none">${p.name}</a>
                <small class="d-block text-muted text-truncate" style="max-width: 220px;">${p.desc}</small>
            </td>
            <td><span class="badge bg-dark rounded-pill">${getCategoryName(p.category)}</span></td>
            <td class="fw-bold text-danger">${formatVND(p.price)}</td>
            <td class="text-center">
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-outline-primary btn-sm rounded-circle p-2 btn-edit-pet" data-id="${p.id}" title="Sửa">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm rounded-circle p-2 btn-delete-pet" data-id="${p.id}" title="Xóa">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Xử lý Submit Form (Thêm mới hoặc Cập nhật)
export function handleProductFormSubmit(e) {
    e.preventDefault();

    const idInput = document.getElementById('pet-id').value;
    const name = document.getElementById('pet-name').value.trim();
    const category = document.getElementById('pet-category').value;
    const price = Number(document.getElementById('pet-price').value);
    const img = document.getElementById('pet-img').value.trim();
    const desc = document.getElementById('pet-desc').value.trim();

    if (!name || !price || !img || !desc) {
        showToast("Vui lòng điền đầy đủ thông tin!", "bg-danger");
        return;
    }

    if (idInput) {
        // Cập nhật (Update)
        const id = Number(idInput);
        const index = dssp.findIndex(item => item.id === id);
        if (index !== -1) {
            dssp[index] = { id, name, category, price, img, desc };
            saveProductsToStorage(dssp);
            showToast(`Đã cập nhật thông tin "${name}"!`);
        }
    } else {
        // Thêm mới (Create)
        const newId = dssp.length > 0 ? Math.max(...dssp.map(item => item.id)) + 1 : 1;
        const newPet = { id: newId, name, category, price, img, desc };
        dssp.unshift(newPet);
        saveProductsToStorage(dssp);
        showToast(`Đã thêm mới "${name}" thành công!`);
    }

    resetAdminForm();
    renderAdminTable();
}

// Đổ dữ liệu sản phẩm lên Form để Sửa
export function startEditProduct(id) {
    const pet = dssp.find(item => item.id === id);
    if (!pet) return;

    document.getElementById('pet-id').value = pet.id;
    document.getElementById('pet-name').value = pet.name;
    document.getElementById('pet-category').value = pet.category;
    document.getElementById('pet-price').value = pet.price;
    document.getElementById('pet-img').value = pet.img;
    document.getElementById('pet-desc').value = pet.desc;

    const preview = document.getElementById('img-preview');
    if (preview) preview.src = pet.img;

    document.getElementById('form-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-primary me-1"></i> Cập Nhật Thú Cưng #${pet.id}`;
    document.getElementById('btn-submit-form').innerHTML = `<i class="fa-solid fa-check me-1"></i> Lưu Cập Nhật`;
    document.getElementById('btn-cancel-edit').style.display = 'inline-block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Xóa sản phẩm (Delete)
export function deleteProduct(id) {
    const pet = dssp.find(item => item.id === id);
    if (!pet) return;

    if (confirm(`Bạn có chắc chắn muốn xóa "${pet.name}" khỏi cửa hàng?`)) {
        const updatedList = dssp.filter(item => item.id !== id);
        saveProductsToStorage(updatedList);
        renderAdminTable();
        resetAdminForm();
        showToast(`Đã xóa "${pet.name}"!`, "bg-danger");
    }
}

// Làm mới Form về trạng thái Thêm mới
export function resetAdminForm() {
    const form = document.getElementById('product-form');
    if (!form) return;
    form.reset();
    document.getElementById('pet-id').value = '';
    document.getElementById('form-title').innerHTML = `<i class="fa-solid fa-plus-circle text-success me-1"></i> Thêm Thú Cưng Mới`;
    document.getElementById('btn-submit-form').innerHTML = `<i class="fa-solid fa-floppy-disk me-1"></i> Lưu Thú Cưng`;
    document.getElementById('btn-cancel-edit').style.display = 'none';
}

// Khôi phục 12 sản phẩm mẫu ban đầu
export function handleResetDefaultData() {
    if (confirm("Khôi phục lại 12 thú cưng mặc định ban đầu?")) {
        resetProductsToDefault();
        renderAdminTable();
        resetAdminForm();
        showToast("Đã khôi phục dữ liệu gốc thành công!");
    }
}