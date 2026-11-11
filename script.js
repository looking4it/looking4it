// =============================================================================================================================================================
// ============================================================== Gallery =====================================================================================
// =============================================================================================================================================================


// =============================================================================================================================================================
// ========================================================== Gallery List =====================================================================================
// =============================================================================================================================================================
// ==================== ART INFORMATION ====================
const dataMap = {
  paintings: [
    { 
      src: "images/dog.png", 
      title: "TJ in Robes", 
      desc: "<br><br>2025.<br>Oil on Canvas.<br>36x24''.<br>56 hours.<br><br>A young woman cares for her aging dog as his condition worsens. A young man commissions his portrait dowered in jewels, sitting on his throne. He prepares to present it to her on her birthday.<br><br><br><strong>$3,200. SOLD.</strong>" 
    },
    { 
      src: "images/mom and leah.png", 
      title: "I Love You, Mom", 
      desc: "<br><br>2021.<br>Oil on Canvas.<br>26x16''.<br>6 months.<br><br>Sandra and her daughter sharing a homemade yogurt popsicle in 2005. Her husband takes a picture. Her eldest daughter would come to consolidate this memory in oil paints 16 years later.<br><br><strong>NOT FOR SALE.</strong>" 
    },
    { 
      src: "images/mother and baby.png", 
      title: "Mother's Day", 
      desc: "<br><br>2025.<br>Oil on Canvas.<br>24x16''.<br> 18 hours.<br><br>The first mother's day.<br><br><br><strong>$200. SOLD.</strong>"
    },
    // ---- Also hanging in the 3D gallery (titles and descriptions still to be written) ----
    {
      src: "images/3d/waterfall.jpg",
      title: "Waterfall",
      desc: ""
    },
    {
      src: "images/3d/35886dce-783f-4b70-a4a3-81d396a437ca.jpg",
      title: "Untitled",
      desc: ""
    },
    {
      src: "images/3d/19497f0c-36ca-47ee-a987-b63529a2245b.jpg",
      title: "Untitled",
      desc: ""
    },
    {
      src: "images/3d/5e57eb2c-3f8b-4285-ac14-7879273a14da.jpg",
      title: "Untitled",
      desc: ""
    },
    {
      src: "images/3d/1f3872ee-60ab-4ee2-911e-27e960353647.jpg",
      title: "Untitled",
      desc: ""
    },
  ],
  films: [
    { 
      src: "images/homunc thumbnail.png",
      title: "Homunculus",
      desc: "2023.<br>Intrigued with the newfound gift of life, Homunculus stumbles upon a tiny red berry. the bite is infectious and causes Homunculus to search for a vice, as perscribed by the viewer, until the berries sour and start to corrode Homunculus from the inside.",
      video: "videos/Homunculus.mp4"
    },
    { 
      src: "images/film2-thumb.jpg",
      title: "Éclaircie",
      desc: "2024<br>Something pulls her to the basement, to the canvas, beyond the paint, to the tree, to the girl, to the crows, and the shadows which part them.",
      video: "videos/film2.mp4"
    }
  ],
  photography: [
    { src: "images/photo1.jpg", title: "Photo 1", desc: "Photo 1 description." },
    { src: "images/photo2.jpg", title: "Photo 2", desc: "Photo 2 description." },
    { src: "images/photo3.jpg", title: "Photo 3", desc: "Photo 3 description." }
  ],
  jewelry: [
    { src: "images/jewelry1.jpg", title: "Jewelry 1", desc: "Jewelry 1 description." },
    { src: "images/jewelry2.jpg", title: "Jewelry 2", desc: "Jewelry 2 description." },
    { src: "images/jewelry3.jpg", title: "Jewelry 3", desc: "Jewelry 3 description." }
  ],

  // ---- Further down the Paintings page ----
  // Paintings for sale, shown under "- FOR SALE -". Add them like the paintings above, e.g.
  //   { src: "images/my-painting.jpg", title: "Title", desc: "2026.<br>Oil on Canvas.<br>24x36''.<br><br><strong>$900.</strong>" },
  paintingsForSale: [
  ],

  // ---- Their own tabs ----
  // Mural photos (MURALS tab). Same format as the paintings above.
  murals: [
    {
      src: "images/murals/nursery-dragon-mural.jpg",
      title: "Nursery Mural",
      desc: "Hand-painted mural for a baby's nursery."
    },
  ],
  // Photos from live painting events (LIVE PAINTING EVENTS tab). Same format.
  liveEvents: [
  ]
};

// The for-sale section shows as part of the Paintings page (clicking a big picture goes back there).
const PARENT_PAGE = { paintingsForSale: "paintings" };

// What a tab shows while it has no pictures yet.
const EMPTY_TEXT = { murals: "Photos coming soon.", liveEvents: "Photos coming soon." };

// ==================== ABOUT, REVIEWS AND LINKS (bottom of the Paintings page) ====================
const ABOUT_TEXT = "I am a multi-medium painter based in Montreal, Canada. I sell both original paintings and custom orders. Custom paintings are typically completed within two weeks and are able to be shipped globally. If you are interested in working together, send me an inquiry through the CUSTOM ORDER tab and I will get back to you within 48 hours to get started :)";

// Reviews from Book an Artist. Dates are YYYY-MM-DD; they're shown newest first.
const REVIEWS = [
  {
    name: "Kayla Z", date: "2025-12-02", stars: 5,
    text: "I had a fantastic experience working with Emma! She is so talented, efficient, and great to communicate with. This project was a large one (requiring 16 unique illustrations) and I love absolutely everything she created! She was great at understanding the vision I had in mind, always very pleasant and kind, and she completed the project super efficiently. I'm thrilled with the dreamy whimsical paintings she has created for my children's story, they are even more beautiful than I imagined! Thank you so much Emma for your hard work and talent! It was such a joy working with you!",
    photos: ["images/reviews/kayla-1.jpg", "images/reviews/kayla-2.jpg", "images/reviews/kayla-3.jpg"]
  },
  {
    name: "Nick V", date: "2025-11-29", stars: 5,
    text: "I highly recommend Emma! Everything about working with her was a pleasure. She's very accomodating and cares about the product and does a great job translating ideas to canvas. We love the painting."
  },
  {
    name: "Edouard P", date: "2025-02-05", stars: 5,
    text: "She made a beautiful painting of my girlfriend and me. All the conditions were respected. Would recommand!"
  },
  {
    name: "Frank C", date: "2025-05-10", stars: 5,
    text: "Emma was absolutely amazing to deal with. She is extremely talented and very kind and easy going. Could not recommend more!"
  },
  {
    name: "Kaitlyn H", date: "2025-06-05", stars: 5,
    text: "Emma was great! From beginning to end she was so communicative and showing me the process !"
  },
  {
    name: "Christy C", date: "2025-07-18", stars: 5,
    text: "Emma was as great as her work! Very talented and professional. Great experience."
  },
  {
    name: "Jeffrey V", date: "2025-10-21", stars: 5,
    text: "My first time ever using the platform, Emma made sure it was a safe, friendly, and efficient process. I'm quite impressed with how this whole process was handled. Couldn't have been easier, and the oil painting she made for me is superb. Thanks again Emma!",
    photos: ["images/reviews/jeffrey-1.jpg"]
  },
  {
    name: "Bader A", date: "2026-11-06", stars: 5,
    text: "Great experience! Efficient communication and an excellent art piece!"
  }
];

// Live painting reviews, shown at the bottom of the LIVE PAINTING EVENTS tab (newest first).
const LIVE_EVENT_REVIEWS = [
  {
    name: "Karen L", date: "2026-02-28", stars: 5,
    text: "Emma was incredible! very flexible. punctual. smiling. very professional work. speed painting interpreted exactly as I expected in just minutes . I loved working with her and our collaboration will certainly recur."
  }
];

// Photography reviews, shown at the bottom of the PHOTOGRAPHY tab (newest first).
const PHOTOGRAPHY_REVIEWS = [
  {
    name: "Rafael P", date: "2025-09-25", stars: 5,
    text: "A great professional — excellent communication, reliability, and true professionalism."
  }
];

// Mural reviews, shown at the bottom of the MURALS tab (newest first).
const MURAL_REVIEWS = [
  {
    name: "Sarah V", date: "2026-01-13", stars: 5,
    text: "Emma was an absolute delight to work with on this project! We were tasked with finding a chalk artist to design a 16 foot long chalkboard in our office and the end result blew our expectations out of the water. Emma was extremely communicative and accommodating with our schedules to complete the project. She was very receptive to our design ideas, adding her own creative flare and ultimately creating a beautiful chalk mural that was admired by the entire office. I could not recommend working with Emma enough!"
  },
  {
    name: "Daniela P", date: "2026-09-06", stars: 5,
    text: "We hired Emma to paint a mural for our baby's nursery, and the experience was fantastic from start to finish. We only had a vague idea and a color scheme in mind, but she took that and turned it into a beautiful, well-thought-out design we absolutely loved. She was punctual, professional, and finished the mural much faster than we expected — all while bringing her own supplies and leaving the space spotless when she was done. What really stood out was her follow-through: months later, we accidentally damaged part of the mural while moving the crib, and Emma came back to fix it without any hassle or complaint. That kind of care and reliability is hard to find. We'd absolutely hire her again, and we can't recommend Emma highly enough to anyone looking for a talented, dependable artist. Thanks so much Emma!",
    photos: ["images/reviews/daniela-1.jpg"]
  },
  {
    name: "Kristina K", date: "2026-01-28", stars: 5,
    text: "I absolutely love the art work that Emma did for my baby nursery. She delivered exactly what I wanted. Emma is very professional and was a pleasure to work with. I am extremely happy with how the nursery wall turned out. thank you Emma for making this special room magical."
  }
];

// Tabs (other than Paintings) that end with a reviews section.
const TAB_REVIEWS = { murals: MURAL_REVIEWS, liveEvents: LIVE_EVENT_REVIEWS, photography: PHOTOGRAPHY_REVIEWS };

const PROFILE_LINKS = [
  { label: "Book an Artist profile", href: "https://bookanartist.co/artist/artist-for-hire/14583" },
  { label: "Instagram", href: "https://www.instagram.com/emma_veres/" }
];

// Category pages that show the "MAKE A CUSTOM ORDER" button (page name → its CATEGORY in the order form).
const CUSTOM_ORDER_BUTTON_PAGES = {
  paintings: "Paintings",
  murals: "Murals",
  liveEvents: "Live Painting Events",
  films: "Films",
  photography: "Photography",
  jewelry: "Jewelry"
};

// ==================== CUSTOM ORDERS ====================
// Where custom order requests go. Pressing SEND opens the visitor's email app with a new email to this address,
// the subject and the whole order already filled in; they press send there. (A mailto: link, so no outside service.)
const ORDER_EMAIL = "emma@expostudios.ca";

// Categories in the CATEGORY drop-down. Categories listed in SIZE_CATEGORIES also ask for a size.
const ORDER_CATEGORIES = ["Paintings", "Murals", "Live Painting Events", "Photography", "Films", "Jewelry"];
const SIZE_CATEGORIES = ["Paintings", "Murals"];

// =================================== SLIDING GALLERY PANEL ========================================
const galleryDrawer = document.getElementById("galleryDrawer");
const galleryToggle = document.getElementById("galleryToggle");
const galleryClose = document.getElementById("galleryClose");
let galleryIsOpen = false;
// The circled X in the top right corner closes the open gallery.
galleryClose.addEventListener("click", () => {
  if (galleryIsOpen) {
    galleryToggle.click();
  }
});
galleryToggle.addEventListener("click", () => {
  galleryIsOpen = !galleryIsOpen;
  // Every time the gallery opens, it starts on the Paintings page, scrolled to the top.
  if (galleryIsOpen) {
    loadPage("paintings");
    document.getElementById("galleryContent").scrollTop = 0;
  }
  galleryDrawer.classList.toggle("is-open", galleryIsOpen);
  galleryClose.tabIndex = galleryIsOpen ? 0 : -1;
  galleryToggle.setAttribute(
    "aria-expanded",
    String(galleryIsOpen)
  );
  galleryToggle.setAttribute(
    "aria-label",
    galleryIsOpen ? "Close gallery" : "Open gallery"
  );
});


// ==================== GENERATE GRID ================================================================
function generateGrid(category, emptyText = "") {
  const items = dataMap[category];
  if (!items.length) {
    return `<p class="section-empty">${emptyText}</p>`;
  }
  return `
    <div class="image-grid image-grid--${category}">
      ${items.map((item, i) => `
        <img src="${item.src}" alt="${item.title}" data-index="${i}" data-category="${category}">
      `).join("")}
    </div>
  `;
}

function generateGridPage(category) {
  const orderCategory = CUSTOM_ORDER_BUTTON_PAGES[category];
  const isPaintings = category === "paintings";
  // Paintings also gets a FOR SALE button that scrolls down to that section.
  const buttons = orderCategory ? `
    <div class="custom-order-cta">
      <button type="button" class="custom-order-button" data-order-category="${orderCategory}">
        Make a custom order
      </button>
      ${isPaintings ? `
        <button type="button" class="custom-order-button" data-scroll-to="forSaleSection">For sale</button>
      ` : ""}
    </div>
  ` : "";
  return `
    ${buttons}
    ${generateGrid(category, EMPTY_TEXT[category])}
    ${isPaintings ? generatePaintingsExtras() : ""}
    ${TAB_REVIEWS[category] ? `
      <section class="paintings-section reviews-section">
        <h2 class="section-divider">- Reviews -</h2>
        ${generateReviews(TAB_REVIEWS[category])}
      </section>
    ` : ""}
  `;
}

// The rest of the Paintings page: for sale, about, reviews and links.
function generatePaintingsExtras() {
  return `
    <section class="paintings-section" id="forSaleSection">
      <h2 class="section-divider">- For sale -</h2>
      ${generateGrid("paintingsForSale", "No paintings for sale at the moment. Check back soon!")}
    </section>

    <section class="paintings-section about-section">
      <p class="about-text">${ABOUT_TEXT}</p>
    </section>

    <section class="paintings-section reviews-section">
      <h2 class="section-divider">- Reviews -</h2>
      ${generateReviews(REVIEWS)}
    </section>

    <nav class="profile-links" aria-label="Find me elsewhere">
      ${PROFILE_LINKS.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join("")}
    </nav>
  `;
}

// A list of reviews, newest first.
function generateReviews(list) {
  const formatDate = iso => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  };
  const initials = name => name.split(/\s+/).map(w => w[0]).join("").toUpperCase();
  const reviews = [...list].sort((a, b) => b.date.localeCompare(a.date)); // newest first

  return `
      <ol class="review-list">
        ${reviews.map(r => `
          <li class="review">
            <div class="review-head">
              <span class="review-avatar" aria-hidden="true">${initials(r.name)}</span>
              <div>
                <p class="review-name">${r.name}</p>
                <p class="review-stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</p>
              </div>
              <time class="review-date" datetime="${r.date}">${formatDate(r.date)}</time>
            </div>
            <p class="review-text">${r.text}</p>
            ${r.photos ? `
              <button type="button" class="review-photos-toggle" aria-expanded="false"
                      aria-label="Show the artwork from this order">
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="M3 6 L8 11 L13 6" fill="none" stroke="currentColor" stroke-width="1.4"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="review-photos-wrap">
                <div class="review-photos">
                  ${r.photos.map(src => `<img src="${src}" alt="Artwork from ${r.name}'s order">`).join("")}
                </div>
              </div>
            ` : ""}
          </li>
        `).join("")}
      </ol>
  `;
}

// ==================== CUSTOM ORDER FORM =======================================================
function generateCustomOrderPage() {
  return `
    <form class="order-form" id="orderForm" novalidate>

      <p class="order-intro">
        Leave project details below and I will be happy to get back to you within 48 hours
        to discuss next steps to complete this project together.
      </p>

      <div class="order-field">
        <label class="visually-hidden" for="orderCategory">Category</label>
        <select id="orderCategory" name="category">
          <option value="" selected>Category</option>
          ${ORDER_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join("")}
        </select>
      </div>

      <!-- Only "Your email" has to be filled in; everything else is optional. -->
      <div class="order-details" id="orderDetails">

        <div class="order-field" id="orderSizeField" hidden>
          <span class="order-label" id="orderSizeLabel">Size</span>
          <div class="order-size" role="group" aria-labelledby="orderSizeLabel">
            <input id="orderLength" name="sizeLength" type="number" inputmode="decimal" min="0" step="any" placeholder="L" aria-label="Length">
            <span class="order-times" aria-hidden="true">x</span>
            <input id="orderWidth" name="sizeWidth" type="number" inputmode="decimal" min="0" step="any" placeholder="W" aria-label="Width">
            <select id="orderUnits" name="units" aria-label="Units">
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="feet">feet</option>
            </select>
          </div>
        </div>

        <div class="order-field">
          <label class="visually-hidden" for="orderBudget">Budget in Canadian dollars</label>
          <div class="order-money">
            <span class="order-prefix" aria-hidden="true">CAD $</span>
            <input id="orderBudget" name="budget" type="number" inputmode="decimal" min="0" step="any" placeholder="Budget (CAD $)">
          </div>
        </div>

        <div class="order-field">
          <label class="visually-hidden" for="orderCity">Shipping location (city)</label>
          <input id="orderCity" name="city" type="text" placeholder="Shipping location (city)" autocomplete="address-level2">
        </div>

        <div class="order-field">
          <label class="visually-hidden" for="orderEmail">Email</label>
          <input id="orderEmail" name="email" type="email" placeholder="Email" autocomplete="email" required>
        </div>

        <div class="order-field">
          <label for="orderDescription">Description</label>
          <textarea id="orderDescription" name="description" rows="7"></textarea>
        </div>

        <p class="order-error" id="orderError" role="alert" hidden></p>

        <button type="submit" class="order-send">Send</button>

      </div>
    </form>
  `;
}

function updateOrderForm(form) {
  const category = form.elements.category.value;
  form.querySelector("#orderSizeField").hidden = !SIZE_CATEGORIES.includes(category);
}

function sendOrder(form) {
  const error = form.querySelector("#orderError");
  form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

  // The only thing that must be filled in is a valid email address.
  const f = form.elements;
  if (!f.email.checkValidity()) {
    f.email.classList.add("is-invalid");
    error.textContent = f.email.value.trim()
      ? "Please check your email address."
      : "Please enter your email address.";
    error.hidden = false;
    f.email.focus();
    return;
  }
  error.hidden = true;

  // The email's subject and body, built from whatever was filled in (blank fields are left out).
  const category = f.category.value;
  const length = f.sizeLength.value;
  const width = f.sizeWidth.value;
  const budget = f.budget.value;
  const city = f.city.value.trim();
  const description = f.description.value.trim();

  const subject = category ? `Custom order request: ${category}` : "Custom order request";
  const lines = [
    "Hello,",
    "",
    "I would like to request a custom order:",
    ""
  ];
  if (category) {
    lines.push(`Category: ${category}`);
  }
  if (SIZE_CATEGORIES.includes(category) && (length || width)) {
    lines.push(`Size: ${length || "?"} x ${width || "?"} ${f.units.value}`);
  }
  if (budget) {
    lines.push(`Budget: CAD $${budget}`);
  }
  if (city) {
    lines.push(`Shipping location: ${city}`);
  }
  lines.push(`My email: ${f.email.value.trim()}`);
  if (description) {
    lines.push("", "Description:", description);
  }

  const body = lines.join("\r\n");
  const order = {
    mailto: `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `To: ${ORDER_EMAIL}\r\nSubject: ${subject}\r\n\r\n${body}`
  };

  // Open the visitor's email app with everything filled in, and explain the last step.
  window.location.href = order.mailto;
  showOrderPopup(
    "Almost done!",
    "Your email app should now open with your order filled in. Please click send in your email client to finish sending the email, and I will get back to you within 48 hours.",
    order
  );
}

// ==================== ORDER POPUP =======================================================
function showOrderPopup(title, message, order) {
  let popup = document.getElementById("orderPopup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "orderPopup";
    popup.hidden = true;
    popup.innerHTML = `
      <div class="order-popup-box" role="dialog" aria-modal="true" aria-labelledby="orderPopupTitle">
        <h2 id="orderPopupTitle"></h2>
        <p id="orderPopupMessage"></p>
        <div class="order-popup-retry">
          <p>Email app didn't open?</p>
          <div class="order-popup-options">
            <a id="orderPopupMailto" href="#">Try again</a>
            <button type="button" id="orderPopupCopy">Copy order</button>
          </div>
          <p>or email <a href="mailto:${ORDER_EMAIL}">${ORDER_EMAIL}</a></p>
        </div>
        <button type="button" class="order-send order-popup-close">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
    const close = () => {
      popup.classList.remove("is-open");
      setTimeout(() => { popup.hidden = true; }, 250);
    };
    popup.addEventListener("click", async e => {
      if (e.target.closest(".order-popup-close")) {
        // CLOSE also closes the gallery panel, back to the 3D gallery.
        close();
        if (galleryIsOpen) {
          galleryToggle.click();
        }
        return;
      }
      if (e.target === popup) {
        close();
        return;
      }
      const copyButton = e.target.closest("#orderPopupCopy");
      if (copyButton) {
        try {
          await navigator.clipboard.writeText(copyButton.dataset.text);
          copyButton.textContent = "Copied!";
        } catch {
          copyButton.textContent = "Couldn't copy";
        }
        setTimeout(() => { copyButton.textContent = "Copy order"; }, 2500);
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !popup.hidden) {
        close();
      }
    });
  }
  popup.querySelector("#orderPopupTitle").textContent = title;
  popup.querySelector("#orderPopupMessage").textContent = message;
  popup.querySelector("#orderPopupMailto").href = order.mailto;
  popup.querySelector("#orderPopupCopy").dataset.text = order.text;
  popup.hidden = false;
  requestAnimationFrame(() => popup.classList.add("is-open"));
  popup.querySelector(".order-popup-close").focus();
}

// ==================== LOAD PAGE =======================================================
function loadPage(page) {
  const content = document.getElementById("content");
   // Stop any video that was playing before changing pages.
  content.querySelectorAll("video").forEach(video => {
    video.pause();
  });
  // Back to a normal, scrollable page.
  document.getElementById("galleryContent").classList.remove("is-detail");
  // Empty gallery landing page.
  if (page === "gallery") {
    content.innerHTML = "<p></p>";
    return;
  }
  content.innerHTML = page === "custom-orders"
    ? generateCustomOrderPage()
    : generateGridPage(page);

   // Update active navigation link.

  document.querySelectorAll(".nav-links a").forEach(link => {

    link.classList.toggle(
      "active",
      link.dataset.page === page
    );

  });

}

// ==================== DETAIL VIEW =====================================================================
function showDetailView(category, index) {
  const item = dataMap[category][index];
  const content = document.getElementById("content");
   if (!item) {
    return;
  }

  // The big picture view fits the panel exactly (picture left, text right) and doesn't scroll.
  const galleryContent = document.getElementById("galleryContent");
  galleryContent.scrollTop = 0;
  galleryContent.classList.add("is-detail");


  // =================== Check if item is a video =======================================================
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
          <img src="${item.src}" alt="${item.title}" id="big-image" data-category="${category}">
        </div>
        <div class="detail-text">
          <h2>${item.title}</h2>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  }
}

// ==================== CATEGORY NAVIGATION ============================================================
 document.querySelector(".nav-links").addEventListener("click", e => {

  const link = e.target.closest("a[data-page]");

  if (!link) {
    return;
  }

  e.preventDefault();

  const page = link.dataset.page;

  loadPage(page);

});


// ============================================================================
// IMAGE GRID AND DETAIL VIEW INTERACTIONS
// ============================================================================

document.getElementById("content").addEventListener("click", e => {

  // Clicking a thumbnail opens its detail view.

  const thumbnail = e.target.closest(
    ".image-grid img[data-index]"
  );

  if (thumbnail) {

    const category = thumbnail.dataset.category;

    const index = Number(thumbnail.dataset.index);

    showDetailView(category, index);

    return;

  }

  // Clicking a large artwork image returns to its category grid.

  // "MAKE A CUSTOM ORDER" opens the Custom Orders page with this page's category already chosen.

  const orderButton = e.target.closest(".custom-order-button[data-order-category]");

  if (orderButton) {

    loadPage("custom-orders");

    const form = document.getElementById("orderForm");

    form.elements.category.value = orderButton.dataset.orderCategory;

    updateOrderForm(form);

    document.getElementById("galleryContent").scrollTop = 0;

    return;

  }

  // The little arrow under a review slides its artwork down into view, or back up out of sight.

  const photosToggle = e.target.closest(".review-photos-toggle");

  if (photosToggle) {

    const open = photosToggle.getAttribute("aria-expanded") !== "true";

    photosToggle.setAttribute("aria-expanded", String(open));

    photosToggle.setAttribute("aria-label", open ? "Hide the artwork from this order" : "Show the artwork from this order");

    photosToggle.closest(".review").classList.toggle("is-photos-open", open);

    return;

  }

  // FOR SALE glides down to its section.

  const scrollButton = e.target.closest("[data-scroll-to]");

  if (scrollButton) {

    const section = document.getElementById(scrollButton.dataset.scrollTo);
    const scroller = document.getElementById("galleryContent");

    if (section) {
      const top = section.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 20;
      glideScroll(scroller, top);
    }

    return;

  }

  const bigImage = e.target.closest("#big-image");

  if (bigImage) {

    const category = bigImage.dataset.category;

    loadPage(PARENT_PAGE[category] || category);

  }

});



// Smoothly scrolls an element to a position (about 0.7 s, easing in and out). Done by hand rather than with the
// browser's smooth scrolling, which some browsers skip; it always ends exactly at the target.
function glideScroll(el, target, duration = 700) {
  const start = el.scrollTop;
  const distance = Math.min(target, el.scrollHeight - el.clientHeight) - start;
  const startTime = performance.now();
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const finish = () => { el.scrollTop = start + distance; };
  const step = now => {
    const t = Math.min(1, (now - startTime) / duration);
    el.scrollTop = start + distance * ease(t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  setTimeout(finish, duration + 150); // makes sure it lands even if animation frames are paused
}

// ==================== CUSTOM ORDER FORM INTERACTIONS ================================================
document.getElementById("content").addEventListener("change", e => {
  const form = e.target.closest("#orderForm");
  if (!form) {
    return;
  }
  if (e.target.name === "category") {
    updateOrderForm(form);
  }
});

document.getElementById("content").addEventListener("input", e => {
  // Clear the red outline as soon as a highlighted field is filled in.
  if (e.target.classList.contains("is-invalid") && e.target.checkValidity()) {
    e.target.classList.remove("is-invalid");
  }
});

document.getElementById("content").addEventListener("submit", e => {
  const form = e.target.closest("#orderForm");
  if (!form) {
    return;
  }
  e.preventDefault();
  sendOrder(form);
});


// ==================== INITIAL LOAD ==================================================================
loadPage("gallery");

