//alert(new URLSearchParams(window.location.search).get("id"));

const url = 'http://localhost:3000/api/products';


  let id = new URLSearchParams(window.location.search).get("id"); // id du click de index.html
function getId() {
  console.log(id);
  getProduct(id); // appel de fonction pour json
}

async function getProduct(id) {
  let requete = await fetch(url + '/' + id, {
    method  : 'GET',
  });
  console.log(requete);
  
  if(!requete.ok) {
    alert('Err : Un Prob !!!');
  }
  else {
    let canap = await requete.json();
    console.log(canap);
    getDisplay(canap);
  }   
}
let productImg = document.createElement("img");
function getDisplay(canap){ // Inserrer les elements a leurs places
  // l'image du canapé
   
  productImg.setAttribute('src', canap.imageUrl);
  productImg.setAttribute('alt', canap.altTxt);
  document.getElementsByClassName('item__img')[0].append(productImg); // placement de l'image
  // Afficher le nom du canapé
  document.getElementById('title').append(canap.name); 
  // Afficher le prix du canapé
  document.getElementById('price').append(canap.price); 
  // Afficher la description du canapé
  document.getElementById('description').append(canap.description); 
  // selection de la couleur
  let selectColor = document.getElementById("colors");
  canap.colors.forEach(function(color){
    let option = document.createElement('option');
    option.setAttribute('value', color);
    option.textContent = color;
    selectColor.append(option);
  });
  
  
  addToCart();
}



let btn = document.getElementById('addToCart');

function addToCart() {
  
  btn.addEventListener('click', () => {
    
    let selection = { // Creation objet : selection du produit
      idProduct : id,
      colorProduct : colors.value ,
      numberProduct : quantity.value
    }  

    // Test de verification des choix couleurs et de quantitées
    let selectQuantity = document.getElementById('quantity').value; 
    if(selectQuantity == 0 || selectQuantity >100){
      alert('Err :: La quantité est vide, ou égale à zero, ou superieur a 100');
    }
    let colorTest = document.getElementById('colors'); // test choix couleur
    if(colors.value == []){
      alert('Err :: Une couleur n\'as été selectionnée');
    }
    else{
    //console.log(colorTest);
    }
    
    let selectionProd = JSON.parse(localStorage.getItem('selectionProd'));
      if(selectionProd != null){
        JSON.parse(localStorage.getItem("selectionProd"));
        //console.log(selectionProd, selection);
      }
      else{
        selectionProd = [];
        selectionProd.push(selection);
        localStorage.setItem("selectionProd", JSON.stringify('selectionProd'));
        //console.log(selectionProd);
      }
    console.log(selection);
  })
}
//addToCart();  
getId();