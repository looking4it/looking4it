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
  jewelry: [
    { src: "images/jewelry1.jpg", title: "Jewelry 1", desc: "Jewelry 1 description." },
    { src: "images/jewelry2.jpg", title: "Jewelry 2", desc: "Jewelry 2 description." },
    { src: "images/jewelry3.jpg", title: "Jewelry 3", desc: "Jewelry 3 description." }
  ]
};

// Category pages that show the "MAKE A CUSTOM ORDER" button (page name → its CATEGORY in the order form).
const CUSTOM_ORDER_BUTTON_PAGES = {
  paintings: "Paintings",
  films: "Films",
  photography: "Photography",
  books: "Books",
  jewelry: "Jewelry"
};

// ==================== CUSTOM ORDERS ====================
// Where custom order requests go. Pressing SEND opens the visitor's email app with a new email to this address,
// the subject and the whole order already filled in; they press send there. (A mailto: link, so no outside service.)
const ORDER_EMAIL = "emma.veres@outlook.com";

// Categories in the CATEGORY drop-down. Categories listed in SIZE_CATEGORIES also ask for a size.
const ORDER_CATEGORIES = ["Paintings", "Photography", "Films", "Books", "Jewelry"];
const SIZE_CATEGORIES = ["Paintings"];

// =================================== SLIDING GALLERY PANEL ========================================
const galleryDrawer = document.getElementById("galleryDrawer");
const galleryToggle = document.getElementById("galleryToggle");
let galleryIsOpen = false;
galleryToggle.addEventListener("click", () => {
  galleryIsOpen = !galleryIsOpen;
  galleryDrawer.classList.toggle("is-open", galleryIsOpen);
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
function generateGridPage(category) {
  const items = dataMap[category];
  const orderCategory = CUSTOM_ORDER_BUTTON_PAGES[category];
  const orderButton = orderCategory ? `
    <div class="custom-order-cta">
      <button type="button" class="custom-order-button" data-order-category="${orderCategory}">
        Make a custom order
      </button>
    </div>
  ` : "";
  return `
    ${orderButton}
    <div class="image-grid image-grid--${category}">
      ${items.map((item, i) => `
        <img src="${item.src}" alt="${item.title}" data-index="${i}" data-category="${category}">
      `).join("")}
    </div>
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
        <label for="orderCategory">Category</label>
        <select id="orderCategory" name="category">
          <option value="" selected>Select a category</option>
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
          <label for="orderBudget">Budget</label>
          <div class="order-money">
            <span class="order-prefix" aria-hidden="true">CAD $</span>
            <input id="orderBudget" name="budget" type="number" inputmode="decimal" min="0" step="any">
          </div>
        </div>

        <div class="order-field">
          <label for="orderCity">Shipping location</label>
          <input id="orderCity" name="city" type="text" placeholder="City" autocomplete="address-level2">
        </div>

        <div class="order-field">
          <label for="orderEmail">Your email</label>
          <input id="orderEmail" name="email" type="email" placeholder="name@example.com" autocomplete="email" required>
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
      if (e.target === popup || e.target.closest(".order-popup-close")) {
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

  const orderButton = e.target.closest(".custom-order-button");

  if (orderButton) {

    loadPage("custom-orders");

    const form = document.getElementById("orderForm");

    form.elements.category.value = orderButton.dataset.orderCategory;

    updateOrderForm(form);

    document.getElementById("galleryContent").scrollTop = 0;

    return;

  }

  const bigImage = e.target.closest("#big-image");

  if (bigImage) {

    loadPage(bigImage.dataset.category);

  }

});



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

