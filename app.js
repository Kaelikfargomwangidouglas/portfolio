function normalizeImagePath(src) {
  return typeof src === "string" ? src.replace(/ /g, "%20") : src;
}

const portfolioProjects = [
  {
    title: "Branded Mugs in a Minimalist Studio",
    category: "Branding",
    description: "Custom mug designs that bring brand identities to life through practical promotional products, combining clear visual communication, distinctive branding, and professional print application.",
    images: [
      "uploads/Kimbio cups.png",
      "uploads/Identity Mug.png"
    ]
  },
  {
    title: "Certificate and Corporate Booklet Display",
    category: "Printing",
    description: "A collection of professionally designed certificates, folders, and institutional publications created with clean layouts, cohesive branding, and polished print-ready visuals.",
    images: ["uploads/1791194495906-7c4b856658.png"]
  },
  {
    title: "Logo Design",
    category: "Printing",
    description: "Creating distinctive, memorable logos that combine typography, symbols, and visual concepts to build strong and recognizable brand identities.",
    images: [
      "uploads/1791192339742-df62be7cf2.jpeg",
      "uploads/1791192339744-4c7a2d91ee.jpeg",
      "uploads/1791192339745-ac007b2f7d.jpeg",
      "uploads/1791192339747-97e0e82773.jpeg",
      "uploads/1791192339753-63d864f377.jpeg"
    ]
  },
  {
    title: "Tshirt",
    category: "Branding",
    description: "A collection of custom apparel designs combining bold typography, distinctive graphics, and cohesive brand identity to create stylish and memorable branded T-shirts.",
    images: [
      "uploads/tshirt1.png",
      "uploads/tshirt 2.jpeg",
      "uploads/tshirt 3.jpeg"
    ]
  },
  {
    title: "Flyer design",
    category: "Printing",
    description: "A clean, modern laundry-service flyer design for JoyFold Laundry, using a fresh blue, white, and navy color palette to communicate cleanliness, freshness, and professionalism.",
    images: [
      "uploads/1791189724668-f1f52deb40.jpeg",
      "uploads/1791189724679-5a787d69c7.jpeg",
      "uploads/1791189724709-22de393607.jpeg",
      "uploads/1791189724711-1696ae69b6.jpeg",
      "uploads/1791189724724-8c6ac9e62c.jpeg",
      "uploads/1791189724729-08a77e8c87.jpeg",
      "uploads/1791189724732-8fdf26323a.jpeg",
      "uploads/1791189724735-41d55dbfff.jpeg",
      "uploads/1791189724739-e7c0e9defa.jpeg",
      "uploads/1791189724745-4115e0059f.jpeg",
      "uploads/1791189724746-e652918135.jpeg",
      "uploads/1791189724748-e252c0153d.jpeg"
    ]
  },
  {
    title: "Brand Identity",
    category: "Branding",
    description: "Creative brand identity work with strong visual direction and clear communication for modern businesses.",
    images: [
      "uploads/Brand 1.jpeg",
      "uploads/brand 2.jpeg",
      "uploads/Brand 3.png"
    ]
  },
  {
    title: "Shop Branding",
    category: "Branding",
    description: "Retail branding concepts focused on recognisable visuals, premium presentation, and memorable customer experience.",
    images: [
      "uploads/1791188304602-9ae44a1376.jpeg",
      "uploads/1791188304624-02b7d5231c.jpeg",
      "uploads/1791188304627-375927a1b4.jpeg",
      "uploads/1791188304630-7dc0faf267.jpeg",
      "uploads/1791188304632-a8bb9501c6.jpeg",
      "uploads/1791188304637-f2e8690a19.jpeg",
      "uploads/1791188304640-1767645939.jpeg"
    ]
  }
].map(project => ({
  ...project,
  images: Array.isArray(project.images) ? project.images.map(normalizeImagePath) : project.images
}));

const portfolioReviews = [
  {
    client: "Webo Samwel",
    role: "Founder Webo Clothline",
    text: "Very nice, my guy! Ah, now I want you to create this entire brand for me. I’ll be giving you all the work, my guy."
  },
  {
    client: "Eunice Ayiemba",
    role: "CEO The way ushering and protocol",
    text: "I’m very impressed with the certificates. The design was professional, elegant, and exactly what we needed. Everything was well organized, from the layout to the final print-ready design. The attention to detail and quality of work really stood out. I would definitely recommend the service to anyone looking for professional graphic design."
  },
  {
    client: "Lisa Kimbio",
    role: "CEO House of Kimbio",
    text: "Yes, even you can see that he did a great job! Business cards. These are 100 pieces, imagine! I’m a happy client. This is my second set of business cards, and he also did the designing… so yeah!"
  }
];

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function renderProjects() {
  const box = document.getElementById("projects");
  if (!box) return;

  const gallery = document.getElementById("projectGallery");
  const galleryView = document.getElementById("galleryView");
  const galleryMainImage = document.getElementById("galleryMainImage");
  const galleryThumbnails = document.getElementById("galleryThumbnails");
  const imageCounter = document.getElementById("imageCounter");
  const previousButton = document.getElementById("galleryPrevious");
  const nextButton = document.getElementById("galleryNext");
  const closeButton = document.getElementById("closeGallery");

  let lastTrigger = null;
  let activeGalleryImages = [];
  let activeGalleryIndex = 0;
  let activeGalleryTitle = "";

  function showGalleryImage(index) {
    if (!activeGalleryImages.length) return;
    activeGalleryIndex = (index + activeGalleryImages.length) % activeGalleryImages.length;
    galleryMainImage.src = activeGalleryImages[activeGalleryIndex];
    galleryMainImage.alt = `${activeGalleryTitle} image ${activeGalleryIndex + 1}`;
    imageCounter.textContent = `${activeGalleryIndex + 1} / ${activeGalleryImages.length}`;

    galleryThumbnails.querySelectorAll(".gallery-thumbnail").forEach((thumbnail, thumbnailIndex) => {
      const active = thumbnailIndex === activeGalleryIndex;
      thumbnail.classList.toggle("active", active);
      thumbnail.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function moveGalleryImage(direction) {
    showGalleryImage(activeGalleryIndex + direction);
  }

  function closeProjectGallery() {
    gallery.hidden = true;
    document.body.classList.remove("gallery-open");
    if (lastTrigger) lastTrigger.focus();
  }

  function openProjectGallery(project, trigger) {
    activeGalleryImages = Array.isArray(project.images) && project.images.length
      ? project.images.filter(Boolean)
      : [project.image || project.imageUrl || project.cover].filter(Boolean);

    activeGalleryIndex = 0;
    activeGalleryTitle = project.title || "Untitled Project";

    document.getElementById("galleryCategory").textContent = project.category || "Graphic Design";
    document.getElementById("galleryTitle").textContent = project.title || "Untitled Project";
    document.getElementById("galleryDescription").textContent = project.description || "";

    galleryView.classList.toggle("single", activeGalleryImages.length === 1);
    galleryThumbnails.hidden = activeGalleryImages.length < 2;
    galleryThumbnails.replaceChildren(...activeGalleryImages.map((src, index) => {
      const thumbnail = document.createElement("button");
      thumbnail.className = "gallery-thumbnail";
      thumbnail.type = "button";
      thumbnail.setAttribute("aria-label", `Show image ${index + 1}`);

      const image = document.createElement("img");
      image.src = src;
      image.alt = "";
      image.loading = "lazy";
      thumbnail.appendChild(image);
      thumbnail.addEventListener("click", () => showGalleryImage(index));
      return thumbnail;
    }));

    showGalleryImage(0);
    lastTrigger = trigger;
    gallery.hidden = false;
    document.body.classList.add("gallery-open");
    closeButton.focus();
  }

  box.addEventListener("click", event => {
    const link = event.target.closest(".project-link");
    if (!link) return;
    const index = Number(link.dataset.projectIndex);
    const project = portfolioProjects[index];
    if (!project) return;
    event.preventDefault();
    openProjectGallery(project, link);
  });

  closeButton.addEventListener("click", closeProjectGallery);
  previousButton.addEventListener("click", () => moveGalleryImage(-1));
  nextButton.addEventListener("click", () => moveGalleryImage(1));
  gallery.addEventListener("click", event => {
    if (event.target === gallery) closeProjectGallery();
  });

  document.addEventListener("keydown", event => {
    if (gallery.hidden) return;
    if (event.key === "Escape") closeProjectGallery();
    if (event.key === "ArrowLeft") moveGalleryImage(-1);
    if (event.key === "ArrowRight") moveGalleryImage(1);
  });

  box.innerHTML = portfolioProjects.map((project, index) => {
    const primaryImage = project.images?.[0] || "";
    const title = escapeHtml(project.title || "Untitled Project");
    return `
      <article class="project-card">
        <a class="project-link" href="#" data-project-index="${index}">
          <div class="project-cover">
            ${primaryImage ? `<img class="cover-image" src="${primaryImage}" alt="${title}" loading="lazy">` : ""}
            <div class="view-project">View project ↗</div>
          </div>
          <div class="project-info">
            <span class="project-category">${escapeHtml(project.category || "Graphic Design")}</span>
            <h3 class="project-title">${title}</h3>
            <p class="project-description">${escapeHtml(project.description || "")}</p>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </div>
        </a>
      </article>
    `;
  }).join("");
}

function renderReviews() {
  const container = document.getElementById("publicReviews");
  if (!container) return;

  if (!portfolioReviews.length) {
    container.innerHTML = '<p class="reviews-empty">Client reviews will appear here.</p>';
    return;
  }

  container.innerHTML = portfolioReviews.map(review => `
    <article class="review-card">
      <div class="quote-mark" aria-hidden="true">“</div>
      <div class="review-content">
        <p class="review-text">${escapeHtml(review.text)}</p>
        <div class="review-author">
          <strong>— ${escapeHtml(review.client)}</strong>
          <span>${escapeHtml(review.role)}</span>
        </div>
      </div>
    </article>
  `).join("");
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

renderProjects();
renderReviews();
