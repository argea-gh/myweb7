/* ==============================================
   KETERANGAN:
   - File JavaScript untuk fungsionalitas seluruh halaman home
   - Menangani carousel, keranjang belanja, modal produk, animasi, dan integrasi WhatsApp
   - Data produk diinisialisasi di sini dan disimpan di localStorage untuk keranjang
============================================== */

// ==============================================
// 1. INISIALISASI VARIABEL DAN DATA PRODUK
// ==============================================
const WA_NUMBER = "6282241900467"; // Nomor WhatsApp resmi Herbaprima
let cartItems = JSON.parse(localStorage.getItem('herbaprimaCart')) || [];
let currentSlide = 0;

// Data produk lengkap sesuai dengan spesifikasi
const products = [
    {
        id: 1,
        name: "Madu Pahit",
        category: "Madu Premium",
        price: 120000,
        image: "https://hni.net/public/front/img/produk/MADU%20PAHIT-1_04-01-19_.png",
        description: "Madu pahit dengan campuran herbal alami yang membantu meningkatkan stamina dan sistem imun tubuh.",
        benefits: ["Meningkatkan stamina", "Memperkuat sistem imun", "Mendukung kesehatan pencernaan", "Mengandung antioksidan alami"],
        ingredients: "Madu murni, ekstrak tanaman herbal (temulawak, kunyit, jahe, dan bahan alami lainnya), vitamin B kompleks.",
        isBestSeller: true
    },
    {
        id: 2,
        name: "Centella Teh Sinergi",
        category: "Minuman Sehat",
        price: 70000,
        image: "https://hni.net/public/front/img/produk/CENTELLA-1_04-01-19_.png",
        description: "Teh herbal dari ekstrak daun pegagan (Centella asiatica) yang baik untuk kesehatan otak dan sistem saraf.",
        benefits: ["Meningkatkan daya ingat", "Menyehatkan sistem saraf", "Meredakan kelelahan", "Mendukung kesehatan pembuluh darah"],
        ingredients: "Ekstrak daun pegagan murni, gula aren organik, bahan pengawet alami.",
        isBestSeller: false
    },
    {
        id: 3,
        name: "Deep Olive",
        category: "Minyak Herba",
        price: 145000,
        image: "https://hni.net/public/front/img/produk/deep-olive-0625_16-06-25_.png",
        description: "Minyak zaitun murni dengan campuran ekstrak herbal yang diformulasikan untuk perawatan kulit dan rambut.",
        benefits: ["Melembapkan kulit", "Menyehatkan rambut", "Mengurangi peradangan kulit", "Melindungi kulit dari radikal bebas"],
        ingredients: "Minyak zaitun ekstra virgin, ekstrak lidah buaya, vitamin E, minyak kemiri.",
        isBestSeller: true
    },
    {
        id: 4,
        name: "Etta Goat Milk",
        category: "Minuman Sehat",
        price: 75000,
        image: "https://hni.net/public/front/img/produk/egm-topbrand_14-11-24_.png",
        description: "Susu kambing bubuk yang diformulasikan dengan nutrisi lengkap untuk semua usia.",
        benefits: ["Sumber kalsium tinggi", "Mudah dicerna", "Meningkatkan kesehatan tulang", "Mendukung pertumbuhan anak"],
        ingredients: "Susu kambing murni, gula organik, vitamin A, vitamin D, kalsium sitrat.",
        isBestSeller: false
    },
    {
        id: 5,
        name: "Madu Multiflora",
        category: "Madu Premium",
        price: 100000,
        image: "https://hni.net/public/front/img/produk/MADU%20MULTI%202020_18-05-20_.png",
        description: "Madu murni dari nektar berbagai jenis bunga, kaya akan nutrisi dan antioksidan.",
        benefits: ["Meningkatkan energi", "Memperkuat sistem imun", "Menyehatkan saluran pencernaan", "Bisa digunakan sebagai pemanis alami"],
        ingredients: "Madu murni tanpa tambahan gula atau bahan kimia.",
        isBestSeller: true
    },
    {
        id: 6,
        name: "Madu Habbat",
        category: "Madu Premium",
        price: 130000,
        image: "https://hni.net/public/front/img/produk/MADU%20HABBATS%202020_18-05-20_.png",
        description: "Madu yang dicampur dengan biji habbatussauda (black seed) untuk mendukung kesehatan tubuh secara menyeluruh.",
        benefits: ["Meningkatkan sistem imun", "Mendukung kesehatan jantung", "Mengurangi peradangan", "Menyehatkan kulit"],
        ingredients: "Madu murni, biji habbatussauda yang dihancurkan halus, ekstrak jahe merah.",
        isBestSeller: true
    },
    {
        id: 7,
        name: "Hni Coffee",
        category: "Minuman Sehat",
        price: 125000,
        image: "https://hni.net/public/front/img/produk/hcmockup2021_27-12-21_.png",
        description: "Kopi herbal yang diformulasikan tanpa kafein tinggi, cocok untuk dikonsumsi setiap hari.",
        benefits: ["Memberikan energi tanpa efek samping kafein", "Mendukung kesehatan hati", "Meningkatkan metabolisme", "Rasa lezat dan menyegarkan"],
        ingredients: "Biji kopi arabika olahan khusus, ekstrak tanaman herbal, gula aren organik.",
        isBestSeller: true
    },
    {
        id: 8,
        name: "Hania Susu Kambing Full Cream",
        category: "Minuman Sehat",
        price: 75000,
        image: "https://hni.net/public/front/img/produk/hania-fc-full_01-03-23_.png",
        description: "Susu kambing full cream dengan kandungan gizi lengkap untuk memenuhi kebutuhan nutrisi harian.",
        benefits: ["Sumber protein tinggi", "Mendukung kesehatan tulang dan gigi", "Mudah dicerna oleh lambung sensitif", "Meningkatkan berat badan dengan sehat"],
        ingredients: "Susu kambing murni full cream, vitamin kompleks, mineral esensial.",
        isBestSeller: false
    },
    {
        id: 9,
        name: "Sevel Stamina",
        category: "Minuman Sehat",
        price: 115000,
        image: "https://hni.net/public/front/img/produk/sevel-stamina_11-09-25_.png",
        description: "Minuman herbal yang diformulasikan khusus untuk meningkatkan stamina dan vitalitas pria dan wanita.",
        benefits: ["Meningkatkan stamina dan energi", "Memperkuat daya tahan tubuh", "Mendukung kesehatan hormonal", "Mengurangi kelelahan kronis"],
        ingredients: "Ekstrak tongkat ali, ekstrak ginseng, madu murni, vitamin B1, B6, B12.",
        isBestSeller: true
    },
    {
        id: 10,
        name: "Hania Realco Cappuccino Less Sugar",
        category: "Minuman Sehat",
        price: 50000,
        image: "https://hni.net/public/front/img/produk/cappucino-lessugar1_14-11-24_.png",
        description: "Minuman cappuccino dengan kadar gula rendah, diformulasikan dari bahan alami.",
        benefits: ["Rasa lezat tanpa terlalu manis", "Memberikan energi ringan", "Tidak menyebabkan lonjakan gula darah", "Cocok untuk diet"],
        ingredients: "Bubuk kopi rendah kafein, susu skim bubuk, gula palem rendah kalori, ekstrak coklat hitam.",
        isBestSeller: false
    },
    {
        id: 11,
        name: "Madu HNI Health",
        category: "Madu Premium",
        price: 80000,
        image: "https://hni.net/public/front/img/produk/hni-health-3_18-11-24_.png",
        description: "Madu yang diformulasikan dengan ekstrak tanaman obat untuk mendukung kesehatan secara menyeluruh.",
        benefits: ["Memperkuat sistem imun", "Menyehatkan saluran pernapasan", "Mendukung kesehatan pencernaan", "Meningkatkan energi"],
        ingredients: "Madu murni, ekstrak daun sirih, ekstrak kunyit, ekstrak jahe.",
        isBestSeller: false
    },
    {
        id: 12,
        name: "Hania Gluta Juicy Drink",
        category: "Minuman Sehat",
        price: 185000,
        image: "https://hni.net/public/front/img/produk/gluta2_27-10-22_.png",
        description: "Minuman kesehatan dengan kandungan glutation dan vitamin C untuk kecantikan kulit dari dalam.",
        benefits: ["Mencerahkan kulit", "Mengurangi noda hitam dan bekas jerawat", "Melindungi kulit dari sinar UV", "Meningkatkan elastisitas kulit"],
        ingredients: "Glutation alami, vitamin C dari buah-buahan, ekstrak lidah buaya, gula buah alami.",
        isBestSeller: true
    },
    {
        id: 13,
        name: "Mahkota Dara",
        category: "Aneka Herbal",
        price: 200000,
        image: "https://hni.net/public/front/img/produk/mahkota%20dara-l_16-06-25_.png",
        description: "Ekstrak tanaman mahkota dara yang diformulasikan untuk mendukung kesehatan reproduksi wanita.",
        benefits: ["Meredakan nyeri haid", "Mendukung kesehatan sistem reproduksi", "Mengatur siklus haid", "Menyehatkan kulit dan rambut"],
        ingredients: "Ekstrak bunga mahkota dara murni, ekstrak kunyit putih, vitamin E, asam folat.",
        isBestSeller: false
    },
    {
        id: 14,
        name: "Habbatusauda Kapsul",
        category: "Aneka Herbal",
        price: 60000,
        image: "https://hni.net/public/front/img/produk/2023-habbats_21-02-24_.png",
        description: "Kapsul biji habbatussauda yang diformulasikan untuk kemudahan konsumsi dan penyerapan optimal.",
        benefits: ["Memperkuat sistem imun", "Mendukung kesehatan jantung dan pembuluh darah", "Mengurangi peradangan", "Menyehatkan saluran pencernaan"],
        ingredients: "Biji habbatussauda murni yang dihancurkan halus, kapsul gelatin halal.",
        isBestSeller: false
    },
    {
        id: 15,
        name: "Minyak Herba Sinergi Hot",
        category: "Minyak Herba",
        price: 55000,
        image: "https://hni.net/public/front/img/produk/mhs-hot_16-12-24_.png",
        description: "Minyak pijat herbal dengan efek hangat yang membantu meredakan nyeri otot dan sendi.",
        benefits: ["Meredakan nyeri otot dan sendi", "Meningkatkan sirkulasi darah", "Menenangkan otot yang tegang", "Mengurangi ketegangan tubuh"],
        ingredients: "Minyak kelapa murni, ekstrak jahe, ekstrak cengkeh, minyak kayu putih, minyak lavender.",
        isBestSeller: false
    },
    {
        id: 16,
        name: "Zareen Bright Glow Serum",
        category: "Perawatan Kulit",
        price: 70000,
        image: "https://hni.net/public/front/img/produk/zareen-serum_22-12-22_.png",
        description: "Serum wajah herbal yang diformulasikan untuk mencerahkan dan melembapkan kulit secara mendalam.",
        benefits: ["Mencerahkan kulit wajah", "Melembapkan kulit secara mendalam", "Mengurangi garis halus", "Melindungi kulit dari polusi"],
        ingredients: "Ekstrak buah alpukat, vitamin C alami, ekstrak lidah buaya, minyak argan.",
        isBestSeller: true
    },
    {
        id: 17,
        name: "Sabun Kolagen",
        category: "Perawatan Kulit",
        price: 25000,
        image: "https://hni.net/public/front/img/produk/SABUN%20KOLAGEN-4_07-01-19_.png",
        description: "Sabun mandi dengan kandungan kolagen dan herbal alami untuk membuat kulit lembut dan kenyal.",
        benefits: ["Melembutkan dan mengencangkan kulit", "Mencerahkan kulit tubuh", "Mengurangi bekas luka ringan", "Menyehatkan kulit dari akar rambut"],
        ingredients: "Kolagen ikan murni, ekstrak lidah buaya, minyak zaitun, sabun herbal alami.",
        isBestSeller: true
    },
    {
        id: 18,
        name: "Hibis Pantyliner",
        category: "Perawatan Pribadi",
        price: 225000,
        image: "https://hni.net/public/front/img/produk/HIBIS%20PANTY-5_26-03-19_.png",
        description: "Pantyliner herbal yang diformulasikan dengan ekstrak tanaman alami untuk kenyamanan dan kesehatan area kewanitaan.",
        benefits: ["Mencegah bau tidak sedap", "Mengurangi iritasi kulit", "Menyehatkan area kewanitaan", "Bisa digunakan setiap hari"],
        ingredients: "Serat kapas organik, ekstrak daun sirih, ekstrak lavender, bahan anti bakteri alami.",
        isBestSeller: false
    }
];

// ==============================================
// 2. FUNGSI UTILITY
// ==============================================
// Format angka menjadi rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// Simpan keranjang ke localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('herbaprimaCart', JSON.stringify(cartItems));
    updateCartUI();
}

// ==============================================
// 3. INISIALISASI HALAMAN SAAT DIMUAT
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi AOS Animasi
    AOS.init({
        duration: 800,
        once: true
    });

    // Sembunyikan Preloader setelah halaman dimuat
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1000);

    // Render daftar produk
    renderAllProducts();
    renderBestSellerProducts();

    // Inisialisasi carousel hero
    initHeroCarousel();

    // Inisialisasi event listener untuk semua elemen
    initEventListeners();

    // Update UI keranjang awal
    updateCartUI();

    // Inisialisasi tombol scroll-to-top
    initScrollToTop();
});

// ==============================================
// 4. FUNGSI CAROUSEL HERO
// ==============================================
function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');

    // Tampilkan slide aktif awal
    showSlide(currentSlide);

    // Event listener tombol navigasi
    prevBtn.addEventListener
    // Event listener tombol navigasi
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });

    // Event listener indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-slide setiap 5 detik
    setInterval(function() {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    }, 5000);
}

// Tampilkan slide tertentu
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    // Sembunyikan semua slide dan reset indicator
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Tampilkan slide dan indicator yang aktif
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

// ==============================================
// 5. FUNGSI RENDER PRODUK
// ==============================================
// Render semua produk ke grid
function renderAllProducts() {
    const produkGrid = document.getElementById('produkGrid');
    produkGrid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'produk-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="produk-card-img">
            <div class="produk-card-body">
                ${product.isBestSeller ? '<span class="produk-card-badge">Terlaris</span>' : ''}
                <h3 class="produk-card-name">${product.name}</h3>
                <p class="produk-card-desc">${product.description.substring(0, 80)}...</p>
                <p class="produk-card-price">${formatRupiah(product.price)}</p>
                <div class="produk-card-buttons">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                    <button class="btn btn-outline" onclick="openProductModal(${product.id})">Detail Produk</button>
                </div>
            </div>
        `;
        produkGrid.appendChild(card);
    });
}

// Render produk terlaris ke grid
function renderBestSellerProducts() {
    const terlarisGrid = document.getElementById('terlarisGrid');
    terlarisGrid.innerHTML = '';

    const bestSellers = products.filter(product => product.isBestSeller);
    bestSellers.forEach(product => {
        const card = document.createElement('div');
        card.className = 'produk-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="produk-card-img">
            <div class="produk-card-body">
                <span class="produk-card-badge">Terlaris</span>
                <h3 class="produk-card-name">${product.name}</h3>
                <p class="produk-card-desc">${product.description.substring(0, 80)}...</p>
                <p class="produk-card-price">${formatRupiah(product.price)}</p>
                <div class="produk-card-buttons">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                    <button class="btn btn-outline" onclick="openProductModal(${product.id})">Detail Produk</button>
                </div>
            </div>
        `;
        terlarisGrid.appendChild(card);
    });
}

// ==============================================
// 6. FUNGSI MODAL PRODUK
// ==============================================
// Buka modal detail produk
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Isi data produk ke modal
    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductImg').alt = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = formatRupiah(product.price);
    document.getElementById('modalProductDesc').textContent = product.description;
    
    // Isi manfaat produk
    const benefitsList = document.getElementById('modalProductBenefits');
    benefitsList.innerHTML = '';
    product.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });

    document.getElementById('modalProductIngredients').textContent = product.ingredients;

    // Set link WhatsApp dan tombol tambah keranjang
    const waMessage = Halo Herbaprima, saya ingin memesan produk ${product.name} dengan harga ${formatRupiah(product.price)}. Mohon informasikan cara pembayaran dan proses pengiriman ya.;
    document.getElementById('whatsappBuyBtn').href = https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)};
    document.getElementById('addToCartModalBtn').setAttribute('onclick', addToCart(${product.id}));

    // Tampilkan modal dan overlay
    document.getElementById('productModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// Tutup modal produk
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// ==============================================
// 7. FUNGSI KERANJANG BELANJA
// ==============================================
// Tambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Cek apakah produk sudah ada di keranjang
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }

    // Simpan dan update UI
    saveCartToLocalStorage();
    showToast(${product.name} berhasil ditambahkan ke keranjang!);
}

// Update jumlah produk di keranjang
function updateCartItemQty(itemId, action) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    if (action === 'plus') {
        item.qty += 1;
    } else if (action === 'minus' && item.qty > 1) {
        item.qty -= 1;
    }

    saveCartToLocalStorage();
}

// Hapus item dari keranjang
function removeCartItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCartToLocalStorage();
}

// Reset seluruh keranjang
function clearCart() {
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
        cartItems = [];
        saveCartToLocalStorage();
    }
}

// Update UI keranjang
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const mobileCartCount = document.getElementById('mobileCartCount');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartText = document.querySelector('.empty-cart');

    // Hitung total item dan total harga
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update jumlah item di tombol keranjang
    cartCount.textContent = totalItems;
    mobileCartCount.textContent = totalItems;

    // Update total harga
    cartTotal.textContent = formatRupiah(totalPrice);

    // Render item keranjang
    if (cartItems.length === 0) {
        emptyCartText.style.display = 'block';
        cartItemsContainer.innerHTML = '';
    } else {
        emptyCartText.style.display = 'none';
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${formatRupiah(item.price)}</p>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateCartItemQty(${item.id}, 'minus')">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartItemQty(${item.id}, 'plus')">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    ${formatRupiah(item.price * item.qty)}
                </div>
                <button class="remove-cart-item-btn" onclick="removeCartItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
}

// Checkout via WhatsApp
function checkoutCart() {
    if (cartItems.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }

    // Buat format pesan
    let message = 'Halo Herbaprima, saya ingin memesan:\n';
    cartItems.forEach(item => {
        message += - ${item.name} Qty: ${item.qty}\n;
    });
    message += Total: ${formatRupiah(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0))}\n\n;
    message += 'Mohon konfirmasi pesanan saya dan berikan informasi berikut:\n';
    message += 'Nama: \n';
    message += 'Alamat: \n';
    message += 'No HP: ';

    // Buka WhatsApp dengan pesan
    window.open(https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}, '_blank');
}

// ==============================================
// 8. FUNGSI FITUR TAMBAHAN
// ==============================================
// Inisialisasi tombol scroll-to-top
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Toggle mode gelap
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const modeBtn = document.getElementById('modeToggleBtn');
    const icon = modeBtn.querySelector('i');
    const text = modeBtn.querySelector('span');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = 'Mode Terang';
        localStorage.setItem('herbaprimaMode', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = 'Mode Gelap';
        localStorage.setItem('herbaprimaMode', 'light');
    }
}

// Tampilkan pesan toast sederhana
function showToast(message) {
    // Buat elemen toast jika belum ada
    let toast = document.getElementById('toastMessage');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastMessage';
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'var(--primary-color)';
        toast.style.color = 'var(--white-color)';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = 'var(--border-radius)';
        toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s, bottom 0.3s';
        document.body.appendChild(toast);
    }

    // Tampilkan pesan
    toast.textContent = message;
    toast.style.bottom = '30px';
    toast.style.opacity = '1';

    // Sembunyikan setelah 3 detik
    setTimeout(function() {
        toast.style.bottom = '20px';
        toast.style.opacity = '0';
    }, 3000);
}

// ==============================================
// 9. INISIALISASI EVENT LISTENER
// ==============================================
function initEventListeners() {
    // Toggle menu mobile
    document.getElementById('hamburgerBtn').addEventListener('click', function() {
        document.getElementById('navMobile').classList.toggle('active');
        document.getElementById('overlay').classList.toggle('active');
    });

    // Tutup menu mobile saat klik link atau overlay
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('navMobile').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        });
    });

    // Toggle keranjang modal
    document.getElementById('cartBtn').addEventListener('click', function() {
        document.getElementById('cartModal').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    });

    document.getElementById('closeCartModal').addEventListener('click', function() {
        document.getElementById('cartModal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });

    // Tutup modal produk
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    document.getElementById('closeProductModalBtn').addEventListener('click', closeProductModal);
    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('cartModal').classList.remove('active');
        document.getElementById('productModal').classList.remove('active');
        document.getElementById('navMobile').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });

    // Tombol keranjang
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('checkoutCartBtn').addEventListener('click', checkoutCart);

    // Toggle mode gelap
    document.getElementById('modeToggleBtn').addEventListener('click', toggleDarkMode);

    // Muat mode yang disimpan
    const savedMode = localStorage.getItem('herbaprimaMode');
    if (savedMode === 'dark') {
        toggleDarkMode();
    }
}
