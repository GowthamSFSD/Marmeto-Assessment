async function fetchData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayProducts(category) {
  const data = await fetchData();
  const categories = data.categories;

  for (const cat of categories) {
    const tabContent = document.getElementById(cat.category_name.toLowerCase());
    tabContent.style.display =
      cat.category_name.toLowerCase() === category ? "flex" : "none";

    if (cat.category_name.toLowerCase() === category) {
      tabContent.innerHTML = "";

      cat.category_products.forEach((product) => {
        const discount = Math.round(
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
            100
        );
        const badge = product.badge_text
          ? `<div class="badge">${product.badge_text}</div>`
          : "";
        const productCard = `
          <div class="product-card">
          <div class="img-container">
            <img src="${product.image}" alt="${product.title}">
            ${badge}
            </div>
            <h3 class="title">${product.title}</h3>
            <p>Vendor: ${product.vendor}</p>
            <p  class="price">Price: Rs.${product.price}</p>
            <p class="discount">Discount: ${discount}% off</p>
            <p >Orginal Price: Rs. <span class = "orginal-price" >${product.compare_at_price}</span></p>
            
            <button class="button">Add to Cart</button>
          </div>
        `;

        tabContent.innerHTML += productCard;
      });
    }
  }
}

function setActiveButtonStyle(category) {
  const tablinks = document.getElementsByClassName("tablinks");
  for (const tablink of tablinks) {
    if (tablink.textContent.toLowerCase() === category.toLowerCase()) {
      tablink.setAttribute("id", "change");
    } else {
      tablink.removeAttribute("change");
    }
  }
}

function openCategory(evt, category) {
  const tablinks = document.getElementsByClassName("tablinks");
  for (const tablink of tablinks) {
    tablink.removeAttribute("id");
  }

  evt.currentTarget.setAttribute("id", "change");
  setActiveButtonStyle(category);
  displayProducts(category);
}

window.onload = function () {
  displayProducts("men");
  setActiveButtonStyle("men"); // Initially set the 'men' tab as active
};
