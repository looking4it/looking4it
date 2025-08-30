// Define all the page contents
const pages = {
  gallery: `
    <h2>Gallery</h2>
  `,
  paintings: `
    <div class="image-grid">
      <img src="images/dogx.png" alt="Painting 1">
      <img src="images/mon and leah.png" alt="Painting 2">
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
