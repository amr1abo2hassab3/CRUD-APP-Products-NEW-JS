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
let EditAll = document.getElementById("EditAll");
let EditFrom = document.querySelector(".EditFrom");
let closeFormEdit = document.querySelector(".closeFormEdit");
let editStart = document.querySelector(".editStart");
let editEnd = document.querySelector(".editEnd");
let btn1Edit = document.querySelector(".btn1Edit");
let DeleteForm = document.getElementById("DeleteForm");
let btn1Delete = document.querySelector(".btn1Delete");
let modeEditAll = "";

// this function in loading page
window.onload = function () {
  const loadingElement = document.querySelector(".loading");

  if (loadingElement) {
    setTimeout(() => {
      loadingElement.style.transform = "scaleY(0)";
    }, 1500);
  }
};

// check the localstorage if localstorage has hhthe data or not
if (
  localStorage.getItem("products") !== null &&
  localStorage.getItem("products") !== "undefined"
) {
  arrayProducts = JSON.parse(localStorage.getItem("products"));

  display();
} else {
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
    if (modeEditAll === "EditAll") {
      for (let i = editStart.value - 1; i < editEnd.value; i++) {
        arrayProducts[i] = product;
      }
      editStart.value = "";
      editEnd.value = "";
    } else {
      arrayProducts[tmepEdit] = product;
    }
    modeEditAll = "";
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
    EditAll.style.transform = "scale(1)";
    DeleteForm.style.transform = "scale(1)";
  } else {
    DeleteForm.style.transform = "scale(0)";
    delAllBtn.style.transform = "scale(0)";
    EditAll.style.transform = "scale(0)";
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
  ScrollTopToEdit();
}

// this function scroll Top to page scroll Y = 0
function ScrollTopToEdit() {
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// this function Delete the products form start value to end
DeleteForm.addEventListener("click", () => {
  btn1Edit.style.display = "none";
  EditFrom.style.right = "0";
  btn1Delete.style.display = "Block";
  editStart.placeholder = "Please Enter Start Delete";
  editEnd.placeholder = "Please Enter End Delete";
});
btn1Delete.addEventListener("click", () => {
  if (arrayProducts.length === 0) {
    console.error("There Are No Products to Delete !!");
  } else {
    if (editStart.value === "" && editEnd.value === "") {
      console.error("Please Enter The value ");
    } else if (editStart.value === "") {
      console.error("Please Enter <<<< Start >>>> Delete ");
    } else if (editEnd.value === "") {
      console.error("Please Enter End Delete ");
    } else if (editStart.value <= 0) {
      console.error("Please Enter <<<< Start >>>> The value > 0 ");
    } else if (editEnd.value <= 0) {
      console.error("Please Enter <<<< End >>>> The value > 0 ");
    } else if (editStart.value >= editEnd.value) {
      console.error("Please Enter <<<< End >>>> The value > strat value ");
    } else if (arrayProducts.length < editEnd.value) {
      console.error(
        ` wrong number >>>\n   End of Delete number (${editEnd.value})     \n<<< not valid  >>>  \n Please Enter number valid \n  >= (${arrayProducts.length})`
      );
    } else {
      for (let i = editEnd.value - 1; i >= editStart.value - 1; i--) {
        arrayProducts.splice(i, 1);
      }

      EditFrom.style.right = "-1000px";
      editStart.value = "";
      editEnd.value = "";
      localStorage.setItem("products", JSON.stringify(arrayProducts));
      display();
    }
  }
});

// function Edit form
EditAll.addEventListener("click", () => {
  EditFrom.style.right = "0";
  btn1Delete.style.display = "none";
  btn1Edit.style.display = "Block";
  editStart.placeholder = "Please Enter Start Edit";
  editEnd.placeholder = "Please Enter End Edit";
});

closeFormEdit.addEventListener("click", () => {
  EditFrom.style.right = "-1000px";
  btn1Delete.style.display = "none";
  btn1Edit.style.display = "none";
});

btn1Edit.addEventListener("click", () => {
  if (arrayProducts.length === 0) {
    console.error("There Are No Products to Edit !!");
  } else {
    if (editStart.value === "" && editEnd.value === "") {
      console.error("Please Enter The value ");
    } else if (editStart.value === "") {
      console.error("Please Enter <<<< Start >>>> Edit ");
    } else if (editEnd.value === "") {
      console.error("Please Enter End Edit ");
    } else if (editStart.value <= 0) {
      console.error("Please Enter <<<< Start >>>> The value > 0 ");
    } else if (editEnd.value <= 0) {
      console.error("Please Enter <<<< End >>>> The value > 0 ");
    } else if (editStart.value >= editEnd.value) {
      console.error("Please Enter <<<< End >>>> The value > strat value ");
    } else if (arrayProducts.length < editEnd.value) {
      console.error(
        ` wrong number >>>\n   End of modification number (${editEnd.value})     \n<<< not valid  >>>  \n Please Enter number valid \n  >= (${arrayProducts.length})`
      );
    } else {
      titleInput.value = arrayProducts[editStart.value].title;
      priceInput.value = arrayProducts[editStart.value].price;
      taxesInput.value = arrayProducts[editStart.value].taxes;
      adsInput.value = arrayProducts[editStart.value].ads;
      discountInput.value = arrayProducts[editStart.value].discount;
      total.innerHTML = arrayProducts[editStart.value].total;
      categoryInput.value = arrayProducts[editStart.value].category;
      countInput.value = "";
      mode = "edit";
      modeEditAll = "EditAll";
      btnSubmit.innerHTML = "Edit All ";
      total.style.background = "#040";
      countInput.style.display = "none";
      ScrollTopToEdit();
      EditFrom.style.right = "-1000px";
      btn1Edit.style.display = "none";
    }
  }
});

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
