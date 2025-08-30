/* ================= Body ================= */
body {
  margin: 0;
  font-family: 'Urbanist', sans-serif;
  background-color: black;
  color: white;
}

/* ================= Sidebar ================= */
.sidebar {
  width: 15%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-sizing: border-box;
  background-color: black;
  color: white;
}

/* Sidebar title */
.sidebar h1.logo-title {
  font-family: 'Michroma', sans-serif;
  font-weight: normal;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Subtitle under title: Urbanist thin */
.sidebar .subtitle {
  font-family: 'Urbanist', sans-serif;
  font-weight: 100;
  font-style: normal;
  margin-top: 10px;
  letter-spacing: 6px;
}

/* ================= Navigation Links ================= */
.nav-links {
  margin-top: 40px;
}

.nav-links a {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.1;
  text-decoration: none;
  color: white;
  font-weight: 100;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.7;
}

.nav-links a.contact {
  font-weight: 300;
}

/* ================= Main Content ================= */
.content {
  margin-left: 15%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
}

.content-inner {
  margin: 20px;
  padding: 20px;
  min-height: 80vh;
}

/* ================= Image Grid ================= */
.image-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

.image-grid img {
  width: 95%;
  height: auto;
  display: block;
  cursor: pointer;
}

/* ================= Contact Form ================= */
.contact-form label {
  display: block;
  margin-top: 15px;
  font-weight: 100;
}

.contact-form input,
.contact-form textarea {
  width: 90%;
  max-width: 500px;
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px;
  margin-top: 5px;
  font-size: 14px;
}

.contact-form textarea {
  resize: vertical;
  min-height: 80px;
}

/* ================= Modal ================= */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  position: relative;
  margin: 5% auto;
  padding: 20px;
  width: 80%;
  max-width: 900px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  color: white;
}

.modal-content img {
  max-width: 50%;
  height: auto;
}

.modal-text {
  flex: 1;
  font-family: 'Urbanist', sans-serif;
  font-weight: 100;
}

.close {
  position: absolute;
  top: 10px;
  right: 25px;
  color: white;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}
