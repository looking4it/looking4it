// Define all the page contents
const pages = {
  gallery: `
    <h2>Gallery</h2>
  `,
  paintings: `
    <div class="image-grid">
      <img src="images/dogx.png" alt="TJ in Robes. 2025. Oil on Canvas. 36x24. A young woman cares for her aging dog as his condition worsens. A young man commissions his portrait dowered in jewels, sitting on his thrown. He prepares to present it to her on her birthday. $3,200. SOLD.">
      <img src="images/mom and leah.png" alt="I love you, Mom. 2021. Oil on Canvas. 36x16. Sandra and her daughter sharing a homemade yogurt popsicle in 2005. Her husband takes a picture. Her other daughter would come to consolidate this memory in oil paints 16 years later. NOT FOR SALE.">
      <img src="images/painting3.jpg" alt="Painting 3">
      <img src="u" alt="Painting 1">
      <img src="images/painting2.jpg" alt="Painting 2">
      <img src="h" alt="Painting 3">
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

// Load default page
document.getElementById("content").innerHTML = pages.gallery;

// Handle navigation
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    document.getElementById("content").innerHTML = pages[page];
  });
});
// Modal code
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementsByClassName('close')[0];

// Function to attach modal click listeners to current images
function attachModalHandlers() {
  const galleryImages = document.querySelectorAll('.image-grid img');
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      modalText.textContent = img.alt;
    });
  });
}

// Close modal functions
closeBtn.onclick = () => modal.style.display = 'none';
modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Load page content
function loadPage(pageName) {
  document.getElementById("content").innerHTML = pages[pageName];
  attachModalHandlers(); // attach modal handlers to new images
}

// Initial load
loadPage('gallery');


