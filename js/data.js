// js/data.js
const STORAGE_KEY = 'petshop_products';

export const defaultProducts = [
    { id: 1, name: "Chó Poodle Tiny Vàng", category: "Cho", price: 3500000, img: "https://images.unsplash.com/photo-1591769225440-811ad7d6eaf2?auto=format&fit=crop&w=600&q=80", desc: "Chó Poodle Tiny thuần chủng, lông xoăn thông minh, quấn chủ, đã tiêm phòng đầy đủ." },
    { id: 2, name: "Chó Corgi Chân Ngắn", category: "Cho", price: 8500000, img: "https://images.unsplash.com/photo-1612536057832-2ff7799286fd?auto=format&fit=crop&w=600&q=80", desc: "Corgi mông trái tim siêu đáng yêu, năng động, ăn khỏe, tính cách thân thiện." },
    { id: 3, name: "Mèo Anh Lông Xám Bạc", category: "Meo", price: 4200000, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80", desc: "Mèo ALN mặt bánh bao, lông xám dày mịn, tính cách hiền lành, thích vuốt ve." },
    { id: 4, name: "Mèo Tai Cụp Scottish Fold", category: "Meo", price: 5500000, img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80", desc: "Mèo Scottish tai cụp đặc trưng, đôi mắt to tròn long lanh, cực kỳ quấn chủ." },
    { id: 5, name: "Hamster Winter White Sữa", category: "Hamster", price: 150000, img: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80", desc: "Hamster giống Winter White hiền lành, dễ chăm sóc, thích hợp cho học sinh, sinh viên." },
    { id: 6, name: "Hamster Robo Mặt Nâu", category: "Hamster", price: 200000, img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=600&q=80", desc: "Dòng hamster nhỏ nhất, cực kỳ nhanh nhẹn, lanh lợi và thú vị khi quan sát." },
    { id: 7, name: "Chim Hoàng Yến Hót Hay", category: "Chim", price: 600000, img: "https://images.unsplash.com/photo-1522858541146-276332d164d1?auto=format&fit=crop&w=600&q=80", desc: "Chim hoàng yến lông vàng óng, giọng hót thanh vang réo rắt thư giãn." },
    { id: 8, name: "Chim Vẹt Yến Phụng Cặp", category: "Chim", price: 300000, img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80", desc: "Cặp vẹt yến phụng nhiều màu sắc rực rỡ, dễ thuần và học bắt chước tiếng động." },
    { id: 9, name: "Cá Cảnh Betta (Cá Xiêm) Kiểng", category: "Ca", price: 80000, img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80", desc: "Cá Betta đuôi dài rực rỡ, dễ nuôi trong bình thủy sinh nhỏ để bàn làm việc." },
    { id: 10, name: "Cá Bảy Màu Guppy Nhập", category: "Ca", price: 50000, img: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80", desc: "Đàn cá bảy màu dòng thuần chủng đẹp, vây lưng lớn bơi lội uyển chuyển." },
    { id: 11, name: "Chó Golden Retriever Thuần Chủng", category: "Cho", price: 7500000, img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80", desc: "Chó Golden thông minh, hiền lành, cực kỳ trung thành và yêu trẻ nhỏ." },
    { id: 12, name: "Mèo Ba Tư Lông Dài", category: "Meo", price: 6200000, img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80", desc: "Mèo Ba Tư bộ lông mượt mà sang trọng, tính cách điềm tĩnh, quấn người." }
];

// Khởi tạo và xuất mảng dssp từ localStorage
export let dssp = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!dssp || !Array.isArray(dssp) || dssp.length === 0) {
    dssp = [...defaultProducts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dssp));
}

// Lưu thay đổi mảng dssp vào localStorage
export function saveProductsToStorage(newList) {
    if (newList) {
        dssp = newList;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dssp));
}

// Khôi phục dữ liệu mặc định
export function resetProductsToDefault() {
    dssp = [...defaultProducts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dssp));
    return dssp;
}