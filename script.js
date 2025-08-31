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
  paintings: generateGridPage("Paintings", paintingsData, "paintings"),
  films: generateGridPage("Films", filmsData, "films"),
  photography: generateGridPage("Photography", photographyData, "photography"),
  music: generateGridPage("Music", musicData, "music"),
  books: generateGridPage("Books", booksData, "books"),
  clothing: generateGridPage("Clothing", clothingData, "clothing"),
  other: generateGridPage("Other", otherData, "other"),
  contact: `
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
  content.innerHTML = pages[pageName];

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

// ================= Define all page contents =================
const pages = {
  gallery: `<h2>Gallery</h2>`,
  
  paintings: `
    <div class="image-grid">
      <img src="images/dogx.png" alt="TJ in Robes. 2025. Oil on Canvas. 36x24. Dowered in jewels.">
      <img src="images/mom and leah.png" alt="I love you, Mom. 2021. Oil on Canvas. Not for sale.">
      <img src="images/painting3.jpg" alt="Painting 3">
    </div>
  `,

  films: `
    <div class="image-grid">
      <img src="images/film1.jpg" alt="Film 1">
      <img src="images/film2.jpg" alt="Film 2">
      <img src="images/film3.jpg" alt="Film 3">
    </div>
  `,

  photography: `
    <div class="image-grid">
      <img src="images/photo1.jpg" alt="Photo 1">
      <img src="images/photo2.jpg" alt="Photo 2">
      <img src="images/photo3.jpg" alt="Photo 3">
    </div>
  `,

  music: `
    <div class="image-grid">
      <img src="images/music1.jpg" alt="Music 1">
      <img src="images/music2.jpg" alt="Music 2">
      <img src="images/music3.jpg" alt="Music 3">
    </div>
  `,

  books: `
    <div class="image-grid">
      <img src="images/book1.jpg" alt="Book 1">
      <img src="images/book2.jpg" alt="Book 2">
      <img src="images/book3.jpg" alt="Book 3">
    </div>
  `,

  clothing: `
    <div class="image-grid">
      <img src="images/clothing1.jpg" alt="Clothing 1">
      <img src="images/clothing2.jpg" alt="Clothing 2">
      <img src="images/clothing3.jpg" alt="Clothing 3">
    </div>
  `,

  other: `
    <div class="image-grid">
      <img src="images/other1.jpg" alt="Other 1">
      <img src="images/other2.jpg" alt="Other 2">
      <img src="images/other3.jpg" alt="Other 3">
    </div>
  `,

  contact: `
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

// ================= Modal elements =================
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementsByClassName('close')[0];

// ================= Load page and attach image click handlers =================
function loadPage(pageName) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = pages[pageName];

  // Attach modal click handlers for new images
  const galleryImages = document.querySelectorAll('.image-grid img');
  galleryImages.forEach(img => {
    img
};
// ==================== Page Data ====================
const paintingsData = [
  {
    src: "images/dogx.png",
    title: "TJ in Robes",
    desc: `2025. Oil on Canvas. 36x24. 
           A young woman cares for her aging dog as his condition worsens. 
           A young man commissions his portrait dowered in jewels, sitting on his throne. 
           He prepares to present it to her on her birthday. $3,200. SOLD.`
  },
  {
    src: "images/mom and leah.png",
    title: "I Love You, Mom",
    desc: `2021. Oil on Canvas. 36x16. 
           Sandra and her daughter sharing a homemade yogurt popsicle in 2005. 
           Her husband takes a picture. 
           Her other daughter would come to consolidate this memory in oil paints 16 years later. 
           NOT FOR SALE.`
  },
  {
    src: "images/painting3.jpg",
    title: "Untitled",
    desc: `Painting 3 description here...`
  }
];

// ==================== Pages ====================
const pages = {
  gallery: `<h2>Gallery</h2>`,
  paintings: `
    <h2>Paintings</h2>
    <div class="image-grid">
      ${paintingsData.map((p, i) => `
        <img src="${p.src}" alt="${p.title}" data-index="${i}" class="painting-thumb">
      `).join("")}
    </div>
  `,
  films: `<h2>Films</h2>`,
  photography: `<h2>Photography</h2>`,
  music: `<h2>Music</h2>`,
  books: `<h2>Books</h2>`,
  clothing: `<h2>Clothing</h2>`,
  other: `<h2>Other</h2>`,
  contact: `
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
  content.innerHTML = pages[pageName];

  if (pageName === "paintings") {
    // Attach click events to thumbnails
    document.querySelectorAll(".painting-thumb").forEach(img => {
      img.addEventListener("click", () => {
        const index = img.getAttribute("data-index");
        showPaintingDetail(index);
      });
    });
  }
}

// ==================== Painting Detail View ====================
function showPaintingDetail(index) {
  const painting = paintingsData[index];
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="painting-detail">
      <div class="painting-image">
        <img src="${painting.src}" alt="${painting.title}">
      </div>
      <div class="painting-text">
        <h2>${painting.title}</h2>
        <p>${painting.desc}</p>
        <button id="back-to-paintings">← Back to Paintings</button>
      </div>
    </div>
  `;

  // back button
  document.getElementById("back-to-paintings").addEventListener("click", () => {
    loadPage("paintings");
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
