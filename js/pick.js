const products = [
  {
    category: "Fashion",
    name: "Jaket Kulit",
    price: "Rp 800.000",
    description: "Kondisi 90%, warna hitam, size L.",
    image:
      "https://st.depositphotos.com/3323581/54368/i/450/depositphotos_543685562-stock-photo-cool-modern-bald-man-beard.jpg"
  },

  {
    category: "Elektronik",
    name: "Headphone Gaming",
    price: "Rp 550.000",
    description: "Lengkap box dan kabel original.",
    image:
      "https://c2.peakpx.com/wallpaper/45/234/482/headphones-instagram-video-games-wallpaper-preview.jpg"
  },

  {
    category: "Aksesoris",
    name: "Jam Tangan Casio",
    price: "Rp 1.000.000",
    description: "Fungsi normal, minus pemakaian ringan.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIbarPrJcgcliKInJ6Kok69A1c3Pu47uaTPA&s"
  },

  {
    category: "Sneakers",
    name: "Sepatu Sneakers",
    price: "Rp 275.000",
    description: "Ukuran 42, kondisi sangat baik.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQDu4VRMSuegaUyLpIv8wK5CWT3FdOhr3bw&s"
  }
];

const productContainer = document.getElementById("productContainer");

products.forEach(product => {
  productContainer.innerHTML += `
  
    <div class="card">

      <div class="card-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="card-content">

        <span class="badge">${product.category}</span>

        <h3>${product.name}</h3>

        <div class="price-tag">
          ${product.price}
        </div>

        <p>
          ${product.description}
        </p>

        <button class="btn-primary">
          Pilih Barang
        </button>

      </div>

    </div>

  `;
});