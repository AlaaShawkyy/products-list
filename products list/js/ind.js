
var productNameInput=document.getElementById("productName");
var productPriceInput=document.getElementById("productPrice");
var productCategoryInput=document.getElementById("productCategory");
var productDescInput=document.getElementById("productDesc");

var currentIndex = 0;
var productContainer;
if(localStorage.getItem("productList")==null){
    productContainer = [];
}
else{
    productContainer = JSON.parse (localStorage.getItem("productList") )//btrga3 el json string
    displayProduct()
}

function add(){
    if (mybtn.innerHTML=="Add product"){
        addProduct();
    }
    else{
        addupdate();
    }
}

function addProduct(){


    if (validationInput()){
        var product={
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value,
           
        }
        
        productContainer.push(product)
        localStorage.setItem("productList",JSON.stringify(productContainer))
        displayProduct();
        clearForm();
    }
    else{
        window.alert("all inputs are required")
    }
    }
  

function displayProduct(){
    var disp = "";  //bafady beha el list
    for( var i=0; i<productContainer.length; i++)
    {
        disp+= `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td>
        <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>`

    }
    document.getElementById("tableDisplay").innerHTML=disp 
}
   
function clearForm() {

    productNameInput.value= "";
    productPriceInput.value= "";
    productCategoryInput.value= "";
    productDescInput.value= "";

   }

function validationInput() {

    if(productNameInput.value!="" && productPriceInput.value!="" &&
    productCategoryInput.value!=''&&  productDescInput.value!='')
    {
        return true
    }
    else{
        return false
    }
    
}

function deleteProduct(index) {
    productContainer.splice(index,1);
    displayProduct()
    localStorage.setItem("productList",JSON.stringify(productContainer))
}


function search(term){
    var disp= "";
    for(var i =0; i<productContainer.length; i++){
        if(
            productContainer[i].name.toLowerCase().includes(term.toLowerCase())||productContainer[i].category.toLowerCase().includes(term.toLowerCase()
            )) 
            {
        disp+=
        `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td>
        <button class="btn btn-warning onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>`

    }
}
document.getElementById("tableDisplay").innerHTML=disp 
}


function updateProduct(index){
    currentIndex = index;
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;

    mybtn.innerHTML="Update Product";

}

function addupdate(){
    productContainer[currentIndex].name = productNameInput.value;
    productContainer[currentIndex].price = productPriceInput.value;
    productContainer[currentIndex].category = productCategoryInput.value;
    productContainer[currentIndex].desc = productDescInput.value;
    displayProduct()
    localStorage.setItem("productList",JSON.stringify(productContainer))
    clearForm()
    mybtn.innerHTML="Add product";
   
}