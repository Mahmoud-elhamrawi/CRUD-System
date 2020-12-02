
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCatagory = document.getElementById("productcatagory");
var productDesc = document.getElementById("productDesc");
var productarray;
if (localStorage.getItem("products") == null) {
    productarray = [];
} else {
    productarray = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

//function add  inputs form form in object and push it in aarray then store it in local storage
function addProduct() {
    var productobject = {
        name: productName.value,
        price: productPrice.value,
        catag: productCatagory.value,
        desc: productDesc.value
    }
    productarray.push(productobject);
    clrearform();
    localStorage.setItem("products", JSON.stringify(productarray));
    displayProducts();
    // console.log(productarray)

}
//function display inputs in table
function displayProducts() {
    var cartonna = '';
    for (var i = 0; i < productarray.length; i++) {

        cartonna += `<tr>
                     <td>${i + 1}</td>
                      <td>${productarray[i].name}</td>
                     <td>${productarray[i].price}</td>
                      <td>${productarray[i].catag}</td>
                      <td>${productarray[i].desc}</td>
                      <td><button onclick="deleteProducts(`+ i + `);" class="btn btn-outline-danger">Delete</button></td>  
                      <td><button onclick="updatePrducts(`+ i + `);" class="btn btn-outline-info">Update</button></td>  
                      </tr>`
    }
    document.getElementById("tbody").innerHTML = cartonna;
}
//function delete row from table so send index of row that selected
function deleteProducts(i) {
    productarray.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(productarray))
    displayProducts();
}
//function clear inputs from form after user click add btn
function clrearform() {
    productName.value = "";
    productPrice.value = "";
    productCatagory.value = "";
    productDesc.value = "";
}
//function make upadte takeold inputs then renew table row that user selected
function updatePrducts(i) {
    productName.value = productarray[i].name;
    productPrice.value = productarray[i].price;
    productCatagory.value = productarray[i].catag;
    productDesc.value = productarray[i].desc;
    var btn = document.getElementById("btnaddproduct");
    btn.innerHTML = "update Product";

    btn.onclick = function () {

        productarray[i].name = productName.value;
        productarray[i].price = productPrice.value;
        productarray[i].catag = productCatagory.value;
        productarray[i].desc = productDesc.value;
        localStorage.setItem("products", JSON.stringify(productarray));
        displayProducts();
        clrearform();
        btn.innerHTML = "add Product";
        btn.onclick = addProduct;


    }






}
// function  make real timem search used includes method 
function searchproducts(trem) {
    var cart = ``;
    for (var i = 0; i < productarray.length; i++) {
        if (productarray[i].name.toLowerCase().includes(trem.toLowerCase()) == true  ||productarray[i].price.toLowerCase().includes(trem.toLowerCase()) == true ) {
            cart += `
                    <tr>
                     <td>${i + 1}</td>
                      <td>${productarray[i].name.toLowerCase().replace(trem.toLowerCase(),
                        `<span style='background-color:yellow;'>${trem.toLowerCase()}</span>`)}</td>
                     <td>${productarray[i].price.replace(trem,  `<span style='background-color:yellow;'>${trem}</span>`)}</td>

                      <td>${productarray[i].catag}</td>
                      <td>${productarray[i].desc}</td>
                      <td><button onclick="deleteProducts(`+ i + `);" class="btn btn-outline-danger">Delete</button></td>  
                      <td><button onclick="updatePrducts(`+ i + `);" class="btn btn-outline-info">Update</button></td>  
                      </tr>`
                              document.getElementById("alerts").innerHTML = " ";

        }
        else {
            document.getElementById("alerts").innerHTML = "NOT FOUND 404 "
        }
        document.getElementById("tbody").innerHTML = cart;

    }
}



