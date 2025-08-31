// ==================== DATA ====================
const paintingsData = [
  { src: "images/dogx.png", title: "TJ in Robes", desc: "2025. Oil on Canvas. 36x24. Dowered in jewels. $3,200. SOLD." },
  { src: "images/mom and leah.png", title: "I Love You, Mom", desc: "2021. Oil on Canvas. 36x16. Memory of Sandra and her daughter. NOT FOR SALE." },
  { src: "images/painting3.jpg", title: "Untitled", desc: "Painting 3 description." }
];

const filmsData = [
  { src: "images/film1.jpg", title: "Film 1", desc: "Film 1 description." },
  { src: "images/film2.jpg", title: "Film 2", desc: "Film 2 description." },
  { src: "images/film3.jpg", title: "Film 3", desc: "Film 3 description." }
];

const photographyData = [
  { src: "images/photo1.jpg", title: "Photo 1", desc: "Photo 1 description." },
  { src: "images/photo2.jpg", title: "Photo 2", desc: "Photo 2 description." },
  { src: "images/photo3.jpg", title: "Photo 3", desc: "Photo 3 description." }
];

const musicData = [
  { src: "images/music1.jpg", title: "Music 1", desc: "Music 1 description." },
  { src: "images/music2.jpg", title: "Music 2", desc: "Music 2 description." },
  { src: "images/music3.jpg", title: "Music 3", desc: "Music 3 description." }
];

const booksData = [
  { src: "images/book1.jpg", title: "Book 1", desc: "Book 1 description." },
  { src: "images/book2.jpg", title: "Book 2", desc: "Book 2 description." },
  { src: "images/book3.jpg", title: "Book 3", desc: "Book 3 description." }
];

const clothingData = [
  { src: "images/clothing1.jpg", title: "Clothing 1", desc: "Clothing 1 description." },
  { src: "images/clothing2.jpg", title: "Clothing 2", desc: "Clothing 2 description." },
  { src: "images/clothing3.jpg", title: "Clothing 3", desc: "Clothing 3 description." }
];

const otherData = [
  { src: "images/other1.jpg", title: "Other 1", desc: "Other 1 description." },
  { src: "images/other2.jpg", title: "Other 2", desc: "Other 2 description." },
  { src: "images/other3.jpg", title: "Other 3", desc: "Other 3 description." }
];

// ==================== Helper: Grid Page ====================
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
  paintings: () => generateGridPage("Paintings", paintingsData, "paintings"),
  films: () => generateGridPage("Films", filmsData, "films"),
  photography: () => generateGridPage("Photography", photographyData, "photography"),
  music: () => generateGridPage("Music", musicData, "music"),
  books: () => generateGridPage("Books", booksData, "books"),
  clothing: () => generateGridPage("Clothing", clothingData, "clothing"),
  other: () => generateGridPage("Other", otherData, "other"),
  contact: () => `
    <h2>Contact</h2>
    <form class="contact-form">
      <label>Name</label>
      <input type="text" name="name">
      <label>Email</label>
      <input type="email" name="email">
      <label>Subject</label>
      <input type="text" name="subject">
      <label>Message</label>
      <textarea name="message" rows="6"></textarea>
    </form>
  `
};

// ==================== Load Page ====================
function loadPage(pageName) {
  const content = document.getElementById("content");

  // if page is function (grid/contact) → call it
  content.innerHTML = typeof pages[pageName] === "function" ? pages[pageName]() : pages[pageName];

  // attach events for thumbs
  document.querySelectorAll(".thumb").forEach(img => {
    img.addEventListener("click", () => {
      const index = img.getAttribute("data-index");
      const category = img.getAttribute("data-category");
      showDetailView(category, index);
    });
  });
}

// ==================== Detail View ====================
function showDetailView(category, index) {
  let dataset;
  switch (category) {
    case "paintings": dataset = paintingsData; break;
    case "films": dataset = filmsData; break;
    case "photography": dataset = photographyData; break;
    case "music": dataset = musicData; break;
    case "books": dataset = booksData; break;
    case "clothing": dataset = clothingData; break;
    case "other": dataset = otherData; break;
  }

  const item = dataset[index];
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="detail-view">
      <div class="detail-image">
        <img src="${item.src}" alt="${item.title}">
      </div>
      <div class="detail-text">
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
        <button id="back-to-category">← Back</button>
      </div>
    </div>
  `;

  // Back button → reload category grid
  document.getElementById("back-to-category").addEventListener("click", () => {
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

// ==================== Initial Load ====================
loadPage("gallery");

