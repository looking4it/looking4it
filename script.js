// ==================== DATA ====================
const paintingsData = [
  { src: "images/dogx.png", title: "TJ in Robes", desc: "2025. Oil on Canvas. 36x24." },
  { src: "images/mom and leah.png", title: "I Love You, Mom", desc: "2021. Oil on Canvas. Memory of Sandra and her daughter." },
  { src: "images/painting3.jpg", title: "Untitled", desc: "Painting 3 description." },
  { src: "images/painting4.jpg", title: "Painting 4", desc: "Painting 4 description." },
  { src: "images/painting5.jpg", title: "Painting 5", desc: "Painting 5 description." },
  { src: "images/painting6.jpg", title: "Painting 6", desc: "Painting 6 description." }
];

const filmsData = [
  { src: "images/film1.jpg", title: "Film 1", desc: "Film 1 description." },
  { src: "images/film2.jpg", title: "Film 2", desc: "Film 2 description." },
  { src: "images/film3.jpg", title: "Film 3", desc: "Film 3 description." },
  { src: "images/film4.jpg", title: "Film 4", desc: "Film 4 description." },
  { src: "images/film5.jpg", title: "Film 5", desc: "Film 5 description." },
  { src: "images/film6.jpg", title: "Film 6", desc: "Film 6 description." }
];

// Add other categories like photographyData, musicData, booksData, clothingData, otherData similarly

// ==================== Alternate Detail Images ====================
const detailImageMap = {
  paintings: {
    0: { src: "images/alt_dogx.png", title: "Alt TJ in Robes", desc: "Alternate image for TJ in Robes" },
    1: { src: "images/alt_mom.png", title: "Alt Mom", desc: "Alternate image for I Love You, Mom" },
    2: { src: "images/alt_painting3.png", title: "Alt Painting 3", desc: "Alternate image for Painting 3" }
  },
  films: {
    0: { src: "images/alt_film1.png", title: "Alt Film 1", desc: "Alternate image for Film 1" },
    1: { src: "images/alt_film2.png", title: "Alt Film 2", desc: "Alternate image for Film 2" },
    2: { src: "images/alt_film3.png", title: "Alt Film 3", desc: "Alternate image for Film 3" }
  }
  // Add other categories here
};

// ==================== Helper Function: Generate Grid ====================
function generateGridPage(title, data, category) {
  return `
    <h2>${title}</h2>
    <div class="image-grid">
      ${data.map((item, i) => `
        <img src="${item.src}" alt="${item.title}" data-index="${i}" data-category="${category}" class="thumb">
      `).join("")}
    </div>
  `;
}

// ==================== Pages ====================
const pages = {
  gallery: `<h2>Gallery</h2><p>Select a category from the left.</p>`,
  paintings: generateGridPage("Paintings", paintingsData, "paintings"),
  films: generateGridPage("Films", filmsData, "films"),
  // Add other categories similarly
};

// ==================== Load Page ====================
function loadPage(pageName) {
  const content = document.getElementById("content");
  content.innerHTML = pages[pageName];

  // Attach click to thumbnails
  document.querySelectorAll(".thumb").forEach(img => {
    img.addEventListener("click", () => {
      const index = img.getAttribute("data-index");
      const category = img.getAttribute("data-category");
      showDetailView(category, index);
    });
  });
}

// ==================== Show Detail View ====================
function showDetailView(category, index) {
  const dataset = window[category + "Data"];
  const item = (detailImageMap[category] && detailImageMap[category][index]) ? 
               detailImageMap[category][index] : dataset[index];

  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="detail-view">
      <div class="detail-image">
        <img src="${item.src}" alt="${item.title}" id="big-image">
      </div>
      <div class="detail-text">
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
      </div>
    </div>
  `;

  // Clicking big image returns to grid
  document.getElementById("big-image").addEventListener("click", () => {
    loadPage(category);
  });
}

// ==================== Navigation ====================
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

// Initial load
loadPage("gallery");
