document.addEventListener("DOMContentLoaded", () => {
    // 1. Dismiss Top Offer Bar
    const offerBar = document.getElementById("offer-bar");
    const offerClose = document.getElementById("offer-close");
    if (offerBar && offerClose) {
        offerClose.addEventListener("click", () => {
            offerBar.style.display = "none";
        });
    }

    // 2. Mobile Side Navbar Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const sideNavbar = document.getElementById("side-navbar");
    const sideNavClose = document.getElementById("side-nav-close");

    if (menuToggle && sideNavbar) {
        menuToggle.addEventListener("click", () => {
            sideNavbar.classList.add("open");
        });
    }

    if (sideNavClose && sideNavbar) {
        sideNavClose.addEventListener("click", () => {
            sideNavbar.classList.remove("open");
        });
    }

    // 3. Wishlist Heart Toggle (Home Page)
    const wishlistIcons = document.querySelectorAll(".wishlist-icon");
    wishlistIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            icon.classList.toggle("liked");
            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");
        });
    });

    // 4. Collections Page: Search & Filter Functionality
    const searchInput = document.getElementById("search-input");
    const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
    const productCards = document.querySelectorAll(".product-card");
    const noResultsMsg = document.getElementById("no-results");
    const clearFiltersBtn = document.getElementById("clear-filters");

    function filterProducts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

        // Group checked values by category (occasion, color, arrival)
        const activeFilters = {
            occasion: [],
            color: [],
            arrival: []
        };

        filterCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const category = checkbox.getAttribute("data-category");
                activeFilters[category].push(checkbox.value.toLowerCase());
            }
        });

        let visibleCount = 0;

        productCards.forEach((card) => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const occasion = card.getAttribute("data-occasion");
            const color = card.getAttribute("data-color");
            const arrival = card.getAttribute("data-arrival");

            // Check search text match
            const matchesSearch = title.includes(searchTerm);

            // Check category matches (if none checked in a category, allow all)
            const matchesOccasion =
                activeFilters.occasion.length === 0 || activeFilters.occasion.includes(occasion);
            const matchesColor =
                activeFilters.color.length === 0 || activeFilters.color.includes(color);
            const matchesArrival =
                activeFilters.arrival.length === 0 || activeFilters.arrival.includes(arrival);

            if (matchesSearch && matchesOccasion && matchesColor && matchesArrival) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResultsMsg) {
            noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", filterProducts);
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            filterCheckboxes.forEach((cb) => (cb.checked = false));
            if (searchInput) searchInput.value = "";
            filterProducts();
        });
    }

    // 5. Contact Form Submission Feedback
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm && formFeedback) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userName = document.getElementById("name").value.trim();
            formFeedback.textContent = `Thank you, ${userName}! Your message has been sent to Nostra Support.`;
            contactForm.reset();
        });
    }
});