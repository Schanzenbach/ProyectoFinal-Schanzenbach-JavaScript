//Array con los productos como objetos
let products = [
    {
        id:1,
        name: "Yu Gi Oh! Dark Magician Deck",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        price: 8000,
        img:"img/tablas/Madrid-x-Yu-Gi-Oh!-Dark-Magician-8.25_-Skateboard-Deck-_356853-front-US.jpg"
    },

    {
        id: 2,
        name: "DGK-Sunshine",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        price: 10000,
        img: "img/tablas/DGK-Sunshine-8.25_-Skateboard-Deck-_347265.jpg"   
    },

    {
        id: 3,
        name: "DGK-Viper",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        price: 15000,
        img:"img/tablas/DGK-Viper-Logo-8.1_-Skateboard-Deck-_321196.jpg" 
    },

    {
        id: 4,
        name: "Toy-Machine Sketchy Monster",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        price: 20000,
        img:"img/tablas/toy-machine-sketchy-monster-8skateboard-deck-172_2048x.jpg"   
    },
];
// Función para crear los productos como objetos en el HTML
let shopEl = document.getElementById("shop");
function startShop(productsArray) {
    for (item of productsArray) {
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
                  <div id="${item.id}" class="quantity">0</div>
                  <button onclick="increment(${item.id}, ${item.price}, '${item.name}')" id="add-btn">+</button>
              </div>
          </div>
        </div>
      </div>
        `
    };
    
};
startShop(products);




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
    console.log(kart);
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
    console.log(kart);
};

//Kart functions
let kart = [];

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
    sakjdhasiasuiad
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
    
    let priceContainer = document.getElementById("price-container");
    priceContainer.innerText=`PRECIO TOTAL: $${totalPrice}`;
};

//filter Functions

let minimum = document.getElementById("minimum-input")
let maximum = document.getElementById("maximum-input")
let filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function() {
    const minPrice = parseFloat(minimum.value);
    const maxPrice = parseFloat(maximum.value);
    console.log(minPrice, maxPrice);
    let priceFiltered = products.filter(p => 
        (p.price>=minPrice && p.price<= maxPrice)
    );
    console.log(priceFiltered);
    shopEl.innerHTML=""
    startShop(priceFiltered);
});






