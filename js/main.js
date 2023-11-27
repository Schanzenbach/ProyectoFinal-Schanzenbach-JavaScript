//Array con los productos como objetos en archivo .json
let kart;
let storedKart = localStorage.getItem("kart"); //Me traigo el carrito del storage, pero todavía está en formato JSON

/*
if (storedKart) { 
    kart = JSON.parse(storedKart); 
} else { 
    kart = [];
}; **Código pasado a ternario abajito
*/

storedKart //Si existe el carrito en el storage que quise traer arriba
? kart = JSON.parse(storedKart) //Entonces lo vuelvo a formato array y lo guardo en el carrito.
: kart = []; //Si no existe, inicio un carrito vacío.

//Función que me da un array con un producto cuya id sea igual a la que le paso por argumento, es uno solo
//Porque aunque sea un filter, las Id son únicas
function checkKart(idProd) {  
    let quantidad = 0;
    let checkedProduct = kart.filter(i => i.id == idProd)
    //Si existe el producto en el carrito, me devuelve  su propiedad .quantity, y lo guarda en la variable que
    //por defecto es 0 ("quantidad");
    if (checkedProduct != null && checkedProduct.length > 0) {
        quantidad = checkedProduct[0].quantity;
    };
    return quantidad; //En pocas palabras, función que me devuelve la cantidad de un producto en el carrito.
};

// Función para crear los productos como objetos en el HTML
let shopEl = document.getElementById("shop");
const getData = async () => {
    const response = await fetch("./json/data.json");
    const dataResponse = await response.json();
    startShop(dataResponse);
};

function startShop(productsArray) {
    for (item of productsArray) {
        let cantidad = checkKart(item.id); //Va a fijarse si en el carrito existe el producto, 
        // y me va a traer su cantidad en una variable llamada cantidad xd
        shopEl.innerHTML+=`
        <div id="item-id-${item.id}"class="item">
        <img
          width="100%"
          src=${item.img}
          alt=""
        />
        <div class="details">
          <h3>${item.name}</h3>
          <p>
            ${item.description}
          </p>
          <div class="price-quantity">
              <h2>$${item.price}</h2>
              <div class="buttons">
                  <button onclick="decrement(${item.id}, ${item.price})" id="minus-btn">-</button>
                  <div id="${item.id}" class="quantity">${cantidad}</div>
                  <button onclick="increment(${item.id}, ${item.price}, '${item.name}')" id="add-btn">+</button>
              </div>
          </div>
        </div>
      </div>
        `
    };
    
};
getData();
//startShop(products);

// Buttons functions
function increment(productID, productPrice, productName) {
    let quantityInCard = document.getElementById(`${productID}`);
    parseInt(quantityInCard.innerText);
    let findProduct = kart.find(x => x.id === productID); //La función find me va a traer en la variable el objeto
    if (findProduct) { //Cuya x.id sea igual a la productID que le estoy pasando por parámetro
        findProduct.quantity++; //Y si ese objeto existe, le sumo a la propiedad quantity
        findProduct.price = productPrice*findProduct.quantity
        quantityInCard.innerText++;
        
    } else { //Acordate que en findproduct está el objeto entero, por eso puedo hacerle .quantity :p
        kart.push({
            id: productID,
            name: productName,
            quantity: 1,
            price: productPrice    
        });
        quantityInCard.innerText++;
    };
    localStorage.setItem("kart", JSON.stringify(kart))
    console.log(localStorage);
};

function decrement(productID, productPrice) {
    let quantityInCard = document.getElementById(`${productID}`);
    parseInt(quantityInCard.innerText);
    let findProduct = kart.find(x => x.id === productID);
    if (findProduct && (findProduct.quantity>0)) { //Si este objeto existe = true y no quiero valores -0
        findProduct.quantity--;
        findProduct.price = productPrice*findProduct.quantity
        quantityInCard.innerText--;
    };
    localStorage.setItem("kart", JSON.stringify(kart))
    console.log(localStorage);
};

//Kart functions


let kartBtn = document.getElementById("kart-btn");

kartBtn.addEventListener("click", createKart);

totalContainer = document.getElementById("total-container");


function createKart() {
    totalContainer.classList.toggle("hidden");
    totalContainer.innerHTML =`
    <div class="kart-container" id="kart-cotainer"> 

        <div id="quantity-in-car" class="quantity-in-kart kart-background">

        </div>

        <ul id="kart-list" class="kart-list kart-background">

        </ul>

        <div id="price-in-kart" class="price-in-kart kart-background">

        </div>

    </div>
    <div class="price-container kart-background" id="price-container">
        <div id="total-price-container"></div>
        <button id="empty-kart-btn">🗑️</button>
        <button id="pay-kart-btn">PAGAR</button>
    </div>
    `;
    let qInKart = document.getElementById("quantity-in-car");
    let nameInKart = document.getElementById("kart-list");
    let priceInKart = document.getElementById("price-in-kart");
    let totalPrice=0;
    for(p of kart) {
        qInKart.innerHTML+=`
        <div class="total-q">${p.quantity}</div> 
        `;
        nameInKart.innerHTML+=`
        <li>${p.name}</li>
        `;
        priceInKart.innerHTML+=`
        <div class="total-price">$${p.price}</div>
        `;
        totalPrice += p.price;
    };
    
    let totalPriceContainer = document.getElementById("total-price-container");
    totalPriceContainer.innerText=`PRECIO TOTAL: $${totalPrice}`;
    let clearKartBtn = document.getElementById("empty-kart-btn");
    clearKartBtn.addEventListener("click", clearKart);
    let payKartBtn = document.getElementById("pay-kart-btn");
    payKartBtn.addEventListener("click", payKart);
};

function payKart() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Función todavía no creada :D!",
        footer: '<a target="_blank" href="https://www.instagram.com/effeminate.fellow_/">Cualquier cosita acá está mi ig</a>'
      });
};
function clearKart() {
    Swal.fire({
        title: "Vaciar el carrito?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Vaciar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Carrito eliminado completamente!", "", "success");
          localStorage.clear();
          location.reload();
        } 
      });
};



//filter Functions

let minimum = document.getElementById("minimum-input")
let maximum = document.getElementById("maximum-input")
let filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function() { // función para filtrar que crea 2 variables, min y max
    let minPrice;   // Luego chequeo si el usuario no puso nada en el input (NaN= not a number)
    let maxPrice;   // con la función isNaN() **IMPORTANTE** parsear el NaN (?) no sé por qué 
    if (isNaN(parseFloat(minimum.value))) { //Si es NaN entonces en el min vale 0 la variable
        minPrice = 0;
    } else {
        minPrice = parseFloat(minimum.value); // Si le puso algo entonces, la variable vale el value del input
    };                                       
    if (isNaN(parseFloat(maximum.value))) {
        maxPrice = 9999999;
    } else {
        maxPrice = parseFloat(maximum.value);
    };
    
    const getDataFiltered = async () => {
        const response = await fetch("./json/data.json");
        const dataResponse = await response.json();
        let priceFiltered = dataResponse.filter(p => //Voy a copiar del array dataResponse los p cuya p.price coincidan con mi condición
            (p.price>=minPrice && p.price<= maxPrice) //Y pegarlos en un nuevo array priceFiltered
        );
        shopEl.innerHTML=""
        startShop(priceFiltered); //Inicio el shop con ese arreglo. No supe cómo hacer para no llamar al fetch dos veces. 
        // Intenté hacer una función fetch que me retorne el array de productos y luego trabajar con ese array. No pude.
    }
    getDataFiltered();
});









