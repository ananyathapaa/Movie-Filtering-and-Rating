(function () {
  const filterBtns = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".card");
  const search = document.getElementById("searchQuery");
  const modal = document.getElementById("ratingModal");
  const modalText = document.getElementById("modalText");
  const closeModalBtn = document.getElementById("closeModal");

  let activeFilter = "all";
  let query = "";

  function filterProduct() {
    cards.forEach((card) => {
      const category = card.dataset.category;
      const title = card.dataset.title.toLowerCase();
      const matchCategory = activeFilter === "all" || category === activeFilter;
      const matchSearch = title.includes(query);

      if (matchCategory && matchSearch) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      filterProduct();
    }),
  );

  search.addEventListener("input", (e) => {
    query = e.target.value.toLowerCase();
    filterProduct();
  });

  cards.forEach((card) => {
    let stars = card.querySelectorAll(".stars i");
    let btn = card.querySelector(".sbmt-btn");
    let ratingBtn = card.querySelector(".rating");
    let cardContent = card.querySelector(".card-content");
    let starContainer = card.querySelector(".stars");
    let movieTitle = card.dataset.title;
    let rating = 0;

    function highlightRating(count) {
      stars.forEach((star, index) => {
        star.classList.toggle("active", index < count);
      });
    }

    stars.forEach((star, index) => {
      star.addEventListener("mouseenter", () => {
        highlightRating(index + 1);
      });
      star.addEventListener("click", () => {
        rating = index + 1;
      });
    });

    if (starContainer) {
      starContainer.addEventListener("mouseleave", () => {
        highlightRating(rating);
      });
    }

    if (btn) {
      btn.addEventListener("click", () => {
        if (rating === 0) {
          alert("Select stars first!");
        } else {
          ratingBtn.remove();
          let msg = document.createElement("div");
          msg.className = "submitted-msg";
          msg.innerText = "Submitted ✓";
          cardContent.appendChild(msg);
          modalText.innerHTML = `You've given <strong>${rating} stars</strong> to <strong>${movieTitle}</strong>.`;
          modal.classList.add("show");
        }
      });
    }
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
})();

