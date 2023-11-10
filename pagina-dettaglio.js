const fetchProduct = async (productID) => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + productID,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWVkNjI1NGU4ODAwMTgzZjE4OGIiLCJpYXQiOjE2OTk2MDYyMzAsImV4cCI6MTcwMDgxNTgzMH0.NwU0Mk561DnGdLwOvdRa-UdBw5LHw9OEkngZKjh3j9M",
          "Content-Type": "application/json"
        }
      }
    );
    // console.log("RESPONSE AWAITED", response);

    if (!response.ok) {
      throw new Error("General fetching error");
    }

    const product = await response.json();
    console.log(product);
    const productsContainer = document.getElementById("card");

    const cardCol = document.createElement("div");
    cardCol.classList = "col-12 col-md-6 p-2";

    const cardImg = document.createElement("img");
    cardImg.classList =
      "w-100 object-fit-fill border border-1 rounded border-dark p-3  ";
    cardImg.src = product.imageUrl;

    const cardCol2 = document.createElement("div");
    cardCol2.classList = "col-12 col-md-6";

    const cardBody = document.createElement("div");
    cardBody.classList = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.classList = "card-title fs-1 fw-bold";
    cardTitle.innerText = product.name;

    const cardBrand = document.createElement("h6");
    cardBrand.classList = "card-text fs-6 fw-bold badge bg-dark";
    cardBrand.innerText = product.brand;

    const cardPrice = document.createElement("p");
    cardPrice.classList = "card-text fs-5 fw-bold my-2";
    cardPrice.innerText = product.price + "€";

    const cardDesc = document.createElement("p");
    cardDesc.classList = "card-text";
    cardDesc.innerText = product.description;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardDesc);

    cardCol.appendChild(cardImg);
    cardCol2.appendChild(cardBody);
    productsContainer.appendChild(cardCol);
    productsContainer.appendChild(cardCol2);
  } catch (error) {
    console.log("Errore", error);
  }
};

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const productID = params.get("appId");
  fetchProduct(productID);
};
