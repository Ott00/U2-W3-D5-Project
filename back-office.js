const addLastProductToList = async () => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWVkNjI1NGU4ODAwMTgzZjE4OGIiLCJpYXQiOjE2OTk2MDYyMzAsImV4cCI6MTcwMDgxNTgzMH0.NwU0Mk561DnGdLwOvdRa-UdBw5LHw9OEkngZKjh3j9M",
          "Content-Type": "application/json"
        }
      }
    );
    console.log("RESPONSE AWAITED", response);

    if (!response.ok) {
      throw new Error("General fetching error");
    }

    const products = await response.json();
    console.log(products);
    const productList = document.getElementById("products-list");

    const lastElement = products.pop();
    const list = document.getElementById("product-list-ul");

    const listElement = document.createElement("li");
    listElement.classList = "list-group-item";
    listElement.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
             <p class="m-0">
                  Prodotto: ${lastElement.name} 
                  Prezzo: ${lastElement.price}€
             </p>
          <div>
              <button type="button" class="btn p-0"><i class="fa-solid fa-square-pen fs-3 p-1 text-secondary"></i></button>
              <button type="button" class="btn p-0"><i class="fa-solid fa-trash fs-5 p-1 text-danger"></i></button>
          </div>
          </div>`;

    const editForm = document.createElement("div");
    editForm.classList = "d-none justify-content-between align-items-center";
    editForm.setAttribute("id", "edit-form-container");
    editForm.innerHTML = `
          <form id="edit-product-form" class="d-flex flex-column w-100 my-3">
          <h6 class="mb-1">Modifica Prodotto</h6>
          <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        id="product-name"
                        placeholder="Nome Prodotto"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        id="product-description"
                        placeholder="Descrizione Prodotto"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        id="product-brand"
                        placeholder="Brand"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        id="product-img-url"
                        placeholder="Image Url"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="number"
                        class="form-control"
                        id="product-price"
                        placeholder="Price"
                        />
                    </div>
                    <button type="submit" class="btn btn-dark w-25 align-self-center">
                        Modifica
                    </button>
            </form>`;

    const thisProductName = editForm.querySelectorAll("input")[0];
    const thisProductDesc = editForm.querySelectorAll("input")[1];
    const thisProductBrand = editForm.querySelectorAll("input")[2];
    const thisProductImg = editForm.querySelectorAll("input")[3];
    const thisProductPrice = editForm.querySelectorAll("input")[4];

    thisProductName.value = lastElement.name;
    thisProductDesc.value = lastElement.description;
    thisProductBrand.value = lastElement.brand;
    thisProductImg.value = lastElement.imageUrl;
    thisProductPrice.value = lastElement.price;

    list.appendChild(listElement);
    list.appendChild(editForm);

    const editProductBtn = listElement.getElementsByClassName("btn")[0];
    editProductBtn.addEventListener("click", () => {
      editForm.classList.toggle("d-none");
      editProduct(editProductBtn, lastElement._id);
    });

    const deleteProductBtn = listElement.getElementsByClassName("btn")[1];
    deleteProductBtn.addEventListener("click", () =>
      deleteProduct(deleteProductBtn, lastElement._id)
    );
  } catch (error) {
    console.log("Errore", error);
  }
};

const addProduct = async () => {
  const productName = document.getElementById("product-name");
  const productDesc = document.getElementById("product-description");
  const productBrand = document.getElementById("product-brand");
  const productImg = document.getElementById("product-img-url");
  const productPrice = document.getElementById("product-price");

  const productObj = {
    name: productName.value,
    description: productDesc.value,
    brand: productBrand.value,
    imageUrl: productImg.value,
    price: productPrice.value
  };
  //   console.log(productObj);

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product",
      {
        method: "POST",
        body: JSON.stringify(productObj),
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
    } else {
      productName.value = "";
      productDesc.value = "";
      productBrand.value = "";
      productImg.value = "";
      productPrice.value = "";

      //Aggiungo il prodotto direttamente alla lista
      addLastProductToList();
      console.log("Prodotto aggiunto");
    }
  } catch (error) {
    console.log("Errore", error);
  }
};

const deleteProduct = async (deleteBtn, productID) => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + productID,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWVkNjI1NGU4ODAwMTgzZjE4OGIiLCJpYXQiOjE2OTk2MDYyMzAsImV4cCI6MTcwMDgxNTgzMH0.NwU0Mk561DnGdLwOvdRa-UdBw5LHw9OEkngZKjh3j9M",
          "Content-Type": "application/json"
        }
      }
    );
    console.log("RESPONSE AWAITED", response);
    if (!response.ok) {
      throw new Error("General fetching error");
    }

    deleteBtn.closest("li").remove();
  } catch (error) {
    console.log("Errore", error);
  }
};

// const editProduct = async (editBtn, productID) => {
//   editBtn.addEventListener("click", async function (e) {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://striveschool-api.herokuapp.com/api/product/" + productID,
//         {
//           method: "PUT",
//           body: JSON.stringify(thisProductObj),
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWVkNjI1NGU4ODAwMTgzZjE4OGIiLCJpYXQiOjE2OTk2MDYyMzAsImV4cCI6MTcwMDgxNTgzMH0.NwU0Mk561DnGdLwOvdRa-UdBw5LHw9OEkngZKjh3j9M",
//             "Content-Type": "application/json"
//           }
//         }
//       );
//       console.log("RESPONSE AWAITED", response);
//       if (!response.ok) {
//         throw new Error("General fetching error");
//       }
//     } catch (error) {
//       console.log("Errore", error);
//     }
//   });
// };

const fetchProduct = async () => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWVkNjI1NGU4ODAwMTgzZjE4OGIiLCJpYXQiOjE2OTk2MDYyMzAsImV4cCI6MTcwMDgxNTgzMH0.NwU0Mk561DnGdLwOvdRa-UdBw5LHw9OEkngZKjh3j9M",
          "Content-Type": "application/json"
        }
      }
    );
    console.log("RESPONSE AWAITED", response);

    if (!response.ok) {
      throw new Error("General fetching error");
    }

    const products = await response.json();
    console.log(products);
    const list = document.getElementById("product-list-ul");

    products.forEach((product) => {
      const listElement = document.createElement("li");
      listElement.classList = "list-group-item";
      listElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
      <p class="m-0">
      Prodotto: ${product.name} 
      Prezzo: ${product.price}€
      </p>
      <div>
      <button type="button" class="btn p-0"><i class="fa-solid fa-square-pen fs-3 p-1 text-secondary"></i></button>
      <button type="button" class="btn p-0"><i class="fa-solid fa-trash fs-5 p-1 text-danger"></i></button>
      </div>
      </div>`;

      const editForm = document.createElement("div");
      editForm.setAttribute("id", "edit-form-container");
      editForm.classList =
        "d-flex d-none justify-content-between align-items-center";
      editForm.innerHTML = `
            <form id="edit-product-form" class="d-flex flex-column w-100 my-3">
                <h6 class="mb-1">Modifica Prodotto</h6>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Nome Prodotto"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Descrizione Prodotto"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Brand"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Image Url"
                        />
                    </div>
                    <div class="mb-2">
                        <input
                        type="number"
                        class="form-control"
                        placeholder="Price"
                        />
                    </div>
                    <button type="submit" class="btn btn-dark w-25 align-self-center">
                        Modifica
                    </button>
            </form>`;

      const thisProductName = editForm.querySelectorAll("input")[0];
      const thisProductDesc = editForm.querySelectorAll("input")[1];
      const thisProductBrand = editForm.querySelectorAll("input")[2];
      const thisProductImg = editForm.querySelectorAll("input")[3];
      const thisProductPrice = editForm.querySelectorAll("input")[4];

      thisProductName.value = product.name;
      thisProductDesc.value = product.description;
      thisProductBrand.value = product.brand;
      thisProductImg.value = product.imageUrl;
      thisProductPrice.value = product.price;

      const thisProductObj = {
        name: product.name,
        description: product.description,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price
      };

      list.appendChild(listElement);
      list.appendChild(editForm);

      const productID = product._id;

      // const editProductBtn = listElement.getElementsByClassName("btn")[0];
      // const editFormBtn = editForm.getElementsByClassName("btn")[0];
      // editProductBtn.addEventListener("click", () => {
      //   editForm.classList.toggle("d-none");
      //   editProduct(editFormBtn, productID);
      // });

      const deleteProductBtn = listElement.getElementsByClassName("btn")[1];
      deleteProductBtn.addEventListener("click", () => {
        editForm.remove();
        deleteProduct(deleteProductBtn, productID);
      });
    });
  } catch (error) {
    console.log("Errore", error);
  }
};

window.onload = () => {
  fetchProduct();

  const addProductForm = document.getElementById("add-product-form");
  const resetForm = document.getElementById("reset-form");
  resetForm.onclick = () => {
    addProductForm.reset();
  };

  addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addProduct();
  });
};
