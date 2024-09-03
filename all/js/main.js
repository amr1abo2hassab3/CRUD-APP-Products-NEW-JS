// get element form page document
let titleInput = document.getElementById("title");
let categoryInput = document.getElementById("gategory");
let priceInput = document.getElementById("price");
let taxesInput = document.getElementById("taxes");
let adsInput = document.getElementById("ads");
let discountInput = document.getElementById("discount");
let total = document.getElementById("total");
let countInput = document.getElementById("count");
let btnSubmit = document.getElementById("submit");
let bodyProduct = document.getElementById("bodyProduct");
let mode = "create";
let tmepEdit = 0;
let arrayProducts;
let delAllBtn = document.querySelector(".delAll");

// check the localstorage if localstorage has the data or not
if (
  localStorage.getItem("products") !== null &&
  localStorage.getItem("products") !== "undefined"
) {
  arrayProducts = JSON.parse(localStorage.getItem("products"));
  // this function in loading page
  document.addEventListener("DOMContentLoaded", function () {
    const loadingElement = document.querySelector(".loading");

    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.transform = "scaleY(0)";
      }, 1500);
    }
  });
  display();
} else {
  // this function in loading page
  document.addEventListener("DOMContentLoaded", function () {
    const loadingElement = document.querySelector(".loading");

    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.transform = "scaleY(0)";
      }, 1500);
    }
  });
  arrayProducts = [];
}

// create product fucntion
// function Create
function createProducts() {
  // create opject to get data

  product = {
    title: titleInput.value.toLowerCase(),
    category: categoryInput.value.toLowerCase(),
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: total.textContent,
  };

  if (mode === "create") {
    // count of product
    if (countInput.value > 1) {
      for (let i = 0; i < countInput.value; i++) {
        //   push data in array
        arrayProducts.push(product);
      }
    } else {
      arrayProducts.push(product);
    }
  } else {
    arrayProducts[tmepEdit] = product;

    mode = "create";
    btnSubmit.innerHTML = "Create";
    countInput.style.display = "block";
  }

  // create localstorage
  localStorage.setItem("products", JSON.stringify(arrayProducts));
  total.style.background = "#a00d20";
  display();
  clearInputs();
}

// -----------------------------

// this function calculater the total price of the product and show in element total
function getTotal() {
  if (priceInput.value !== "") {
    let result =
      +priceInput.value +
      +taxesInput.value +
      +adsInput.value -
      +discountInput.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.style.background = "#a00d20";
    total.innerHTML = "";
  }
}

// -------------------------------------------

// this function clear data when add product
function clearInputs() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  categoryInput.value = "";
  countInput.value = "";
  total.innerHTML = "";
}

//-----------------------

// this function show data in page document
function display() {
  let tabel = "";
  for (let i = 0; i < arrayProducts.length; i++) {
    tabel += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${arrayProducts[i].title}</td>
                        <td>${arrayProducts[i].price}</td>
                        <td>${arrayProducts[i].taxes}</td>
                        <td>${arrayProducts[i].ads}</td>
                        <td>${arrayProducts[i].discount}</td>
                        <td>${arrayProducts[i].total}</td>
                        <td>${arrayProducts[i].category}</td>
                        <td class="actionbtn">
                            <div id="update" onclick="edit(${i})"><i class='bx bx-edit'></i></div>
                            <div id="delete" onclick="deleteProduct(${i})"><i class='bx bxs-trash-alt'></i></div>
                            <div id="show" onclick=" showProduct(${i})"><i class='bx bxs-show'></i>  </div>
                        </td>
                    </tr>           `;
  }
  // this code if array has data or not to show button delete
  if (arrayProducts.length > 0) {
    delAllBtn.style.transform = "scale(1)";
    delAllBtn.innerHTML = `Delete All products  (${arrayProducts.length})`;
  } else {
    delAllBtn.style.transform = "scale(0)";
  }
  bodyProduct.innerHTML = tabel;
}

// this function delete one product and show swl are you sure
let checkCard = document.querySelector(".checkCard");
let boxCheck = document.querySelector(".box");
let btnYES = document.getElementById("btnYES");
let btnNO = document.getElementById("btnNO");
let indexDeleteText = document.getElementById("indexDeleteText");
let tmepDelete = 0;

// this function delete one product
function deleteProduct(i) {
  tmepDelete = i;
  checkCard.style.transform = "scale(1)";
  boxCheck.style.transform = "scale(1)";
}
function checkModeBtn(e) {
  if (e === "btnYES") {
    arrayProducts.splice(tmepDelete, 1);
    localStorage.setItem("products", JSON.stringify(arrayProducts));
    checkCard.style.transform = "scale(0)";
    boxCheck.style.transform = "scale(0)";
    display();
  } else {
    checkCard.style.transform = "scale(0)";
    boxCheck.style.transform = "scale(0)";
  }
}

// this function delete all products
delAllBtn.addEventListener("click", () => {
  arrayProducts.splice(0);
  localStorage.setItem("products", JSON.stringify(arrayProducts));
  delAllBtn.style.transform = "scale(0)";
  display();
});
// this function edit one products
function edit(i) {
  titleInput.value = arrayProducts[i].title;
  priceInput.value = arrayProducts[i].price;
  taxesInput.value = arrayProducts[i].taxes;
  adsInput.value = arrayProducts[i].ads;
  discountInput.value = arrayProducts[i].discount;
  total.innerHTML = arrayProducts[i].total;
  categoryInput.value = arrayProducts[i].category;
  countInput.value = "";
  mode = "edit";
  btnSubmit.innerHTML = "Edit";
  total.style.background = "#040";
  countInput.style.display = "none";
  tmepEdit = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search  function

let searchInput = document.getElementById("search");
let searchCategory = document.getElementById("searchCategory");
let searchTitle = document.getElementById("searchTitle");
let modeSerach = "title";

function searchMood(e) {
  if (e == "searchTitle") {
    modeSerach = "title";
    searchInput.placeholder = "Search By Title";
  } else {
    modeSerach = "category";
    searchInput.placeholder = "Search By Category";
  }
  searchInput.value = "";
  searchInput.focus();
  display();
}

function search() {
  tabel = "";
  for (let i = 0; i < arrayProducts.length; i++) {
    if (modeSerach === "title") {
      if (arrayProducts[i].title.includes(searchInput.value.toLowerCase())) {
        tabel += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${arrayProducts[i].title}</td>
                        <td>${arrayProducts[i].price}</td>
                        <td>${arrayProducts[i].taxes}</td>
                        <td>${arrayProducts[i].ads}</td>
                        <td>${arrayProducts[i].discount}</td>
                        <td>${arrayProducts[i].total}</td>
                        <td>${arrayProducts[i].category}</td>
                        <td class="actionbtn">
                            <div id="update" onclick="edit(${i})"><i class='bx bx-edit'></i></div>
                            <div id="delete" onclick="deleteProduct(${i})"><i class='bx bxs-trash-alt'></i></div>
                            <div id="show" ><i class='bx bxs-show'></i>  </div>
                        </td>
                    </tr>           `;
      }
      bodyProduct.innerHTML = tabel;
    }
    if (modeSerach === "category") {
      if (arrayProducts[i].category.includes(searchInput.value.toLowerCase())) {
        tabel += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${arrayProducts[i].title}</td>
                        <td>${arrayProducts[i].price}</td>
                        <td>${arrayProducts[i].taxes}</td>
                        <td>${arrayProducts[i].ads}</td>
                        <td>${arrayProducts[i].discount}</td>
                        <td>${arrayProducts[i].total}</td>
                        <td>${arrayProducts[i].category}</td>
                        <td class="actionbtn">
                            <div id="update" onclick="edit(${i})"><i class='bx bx-edit'></i></div>
                            <div id="delete" onclick="deleteProduct(${i})"><i class='bx bxs-trash-alt'></i></div>
                            <div id="show" ><i class='bx bxs-show'></i>  </div>
                        </td>
                    </tr>           `;
      }
      bodyProduct.innerHTML = tabel;
    }
  }
}

// ------------------------------------

// this function show product in card and close
let bodyShow = document.querySelector(".productShow");
let boxShow = document.querySelector(".boxShow");

function showProduct(i) {
  bodyShow.style.transform = "scale(1)";
  bodyShow.innerHTML = `
   <div class="boxShow">
            <div class="iconClose">
                <i class='bx bx-x'></i>
            </div>
            <div class="idShow">
                <h1>number : ${i + 1} </h1>
            </div>
            <div class="titleShow">
                <h1>title : ${arrayProducts[i].title}</h1>
            </div>
             <div class="catShow">
                <h1>category : ${arrayProducts[i].category} </h1>
            </div>
            <div class="priceShow">
                <h1>price :${arrayProducts[i].price}</h1>
            </div>
            <div class="taxesShow">
                <h1>taxes :${arrayProducts[i].taxes}</h1>
            </div>
            <div class="adsShow">
                <h1>ads : ${arrayProducts[i].ads}</h1>
            </div>
            <div class="disShow">
                <h1>discount :${arrayProducts[i].discount} </h1>
            </div>
            <div class="totalShow">
                <h1>total : ${arrayProducts[i].total} </h1>
            </div>
           
        </div>
  `;
  let iconClose = document.querySelector(".iconClose");
  iconClose.addEventListener("click", () => {
    bodyShow.style.transform = "scale(0)";
  });
}

display();
