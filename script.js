// ==================== DATA ====================
const dataMap = {
  paintings: [
    { 
      src: "images/dog.png", 
      title: "TJ in Robes", 
      desc: "<br><br>2025.<br>Oil on Canvas.<br>36x24.<br>86 hours.<br><br>A young woman cares for her aging dog as his condition worsens. A young man commissions his portrait dowered in jewels, sitting on his throne. He prepares to present it to her on her birthday.<br><br><br><strong>$3,200. SOLD.</strong>." 
    },
    { 
      src: "images/mom and leah.png", 
      title: "I Love You, Mom", 
      desc: "<br><br>2021.<br>Oil on Canvas.<br>26x16.<br>6 months.<br><br>Sandra and her daughter sharing a homemade yogurt popsicle in 2005. Her husband takes a picture. Her eldest daughter would come to consolidate this memory in oil paints 16 years later.<br><br><strong>NOT FOR SALE.</strong>." 
    },
    { src: "images/painting3.jpg", title: "Untitled", desc: "Painting 3 description." }
  ],
  films: [
    { 
      src: "images/homunc thumbnail.png",
      title: "Homunculus",
      desc: "Intrigued with its new gift of life, Homunculus is presented with the simple pleasure of consuming a tiny red berry. Homunculus finds pure bliss wrapped in its leathery skin and begins the pathetic search of satisfaction. But as all else, the berries turn sour and start to eat at Homunculus from the inside.",
      video: "videos/Homunculus.mp4"
    },
    { 
      src: "images/film2-thumb.jpg",
      title: "Éclaircie",
      desc: "Something pulls her to the basement, to the canvas, beyond the paint, to the tree, to the girl, to the crows, and the shadows which part them.",
      video: "videos/film2.mp4"
    }
  ],
  photography: [
    { src: "images/photo1.jpg", title: "Photo 1", desc: "Photo 1 description." },
    { src: "images/photo2.jpg", title: "Photo 2", desc: "Photo 2 description." },
    { src: "images/photo3.jpg", title: "Photo 3", desc: "Photo 3 description." }
  ],
  music: [
    { src: "images/music1.jpg", title: "Music 1", desc: "Music 1 description." },
    { src: "images/music2.jpg", title: "Music 2", desc: "Music 2 description." },
    { src: "images/music3.jpg", title: "Music 3", desc: "Music 3 description." }
  ],
  books: [
    { src: "images/book1.jpg", title: "Book 1", desc: "Book 1 description." },
    { src: "images/book2.jpg", title: "Book 2", desc: "Book 2 description." },
    { src: "images/book3.jpg", title: "Book 3", desc: "Book 3 description." }
  ],
  clothing: [
    { src: "images/clothing1.jpg", title: "Clothing 1", desc: "Clothing 1 description." },
    { src: "images/clothing2.jpg", title: "Clothing 2", desc: "Clothing 2 description." },
    { src: "images/clothing3.jpg", title: "Clothing 3", desc: "Clothing 3 description." }
  ],
  other: [
    { src: "images/other1.jpg", title: "Other 1", desc: "Other 1 description." },
    { src: "images/other2.jpg", title: "Other 2", desc: "Other 2 description." },
    { src: "images/other3.jpg", title: "Other 3", desc: "Other 3 description." }
  ]
};

// ==================== GENERATE GRID ====================
function generateGridPage(category) {
  const items = dataMap[category];
  return `
    <div class="image-grid">
      ${items.map((item, i) => `
        <img src="${item.src}" alt="${item.title}" data-index="${i}" data-category="${category}">
      `).join("")}
    </div>
  `;
}

// ==================== LOAD PAGE ====================
function loadPage(page) {
  const content = document.getElementById("content");
  if (page === "gallery") {
    content.innerHTML = "<p>Select a category from the sidebar.</p>";
    return;
  }

  content.innerHTML = generateGridPage(page);

  // Attach click events to thumbnails
  document.querySelectorAll(".image-grid img").forEach(img => {
    img.addEventListener("click", () => {
      const index = img.getAttribute("data-index");
      const category = img.getAttribute("data-category");
      showDetailView(category, index);
    });
  });
}

// ==================== DETAIL VIEW ====================
function showDetailView(category, index) {
  const item = dataMap[category][index];
  const content = document.getElementById("content");

  // Check if item is a video
  const isVideo = item.video !== undefined;

  if (isVideo) {
    content.innerHTML = `
      <div class="detail-view">
        <div class="detail-video">
          <video width="100%" height="100%" controls autoplay>
            <source src="${item.video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="detail-text">
          <h2>${item.title}</h2>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  } else {
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

    // Clicking the big image goes back to the grid
    document.getElementById("big-image").addEventListener("click", () => {
      loadPage(category);
    });
  }
}

// ==================== NAVIGATION ====================
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

// ==================== INITIAL LOAD ====================
loadPage("gallery");

