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
