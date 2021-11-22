//alert(new URLSearchParams(window.location.search).get("id"));

const url = 'http://localhost:3000/api/products';

function getId() {
  let id = new URLSearchParams(window.location.search).get("id"); // id du click de index.html
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
    let canap = await requete.json(url);
    console.log(canap);
    getDisplay(canap);
  }   
}


function getDisplay(canap){ // Inserrer les elements a leurs places
  
  let productImg = document.createElement("img"); // la photo du canapé
  productImg.setAttribute('src', canap.imageUrl);
  productImg.setAttribute('alt', canap.altTxt);

  document.getElementsByClassName('item__img')[0].append(productImg); // placement de l'image

  document.getElementById('title').append(canap.name); // Afficher le nom du canapé

  document.getElementById('price').append(canap.price); // Afficher le prix du canapé

  document.getElementById('description').append(canap.description); // Afficher la description du canapé
  // selection de la couleur
  let selectColor = document.getElementById("colors");
  let option = document.createElement("option"); 
  option = canap.colors;
  
  option.forEach(function(element, key){
    selectColor[key] = new Option(element, key); 
  });
  // for (let i = 0; i < canap.colors.length; i++) {
  //   let option = document.createElement("option");
  //   option.textContent = canap.colors[i];
  //   option.setAttribute('value', canap.colors[i]);
  //   selectColor.append(option);
  // }
  let btn = document.getElementById('addToCart');
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    
    let selectQuantity = document.getElementById('quantity').value; // test choix quantité
    if(selectQuantity == 0 || selectQuantity >100){
    alert('Err :: La quantité est vide, ou égale à zero, ou superieur a 100');
    }

    let colorTest = document.getElementById('colors'); // test choix couleur
    if(colors.value == []){
      alert('Err :: Une couleur n\'as été selectionnée');
    }
    else{
      console.log(colorTest);
    }

    let selection = { // Creation objet : selection du produit
      idProduct : canap._id,
      // imageProduct : canap.imageUrl,
      // nameProduct : canap.name,
      // descriptionProduct : canap.description,
      colorProduct : colors.value ,
      numberProduct : quantity.value
    };

    addBtn(selection);
    
    
    
  })
  function addBtn(selection) { 
      
      
    let selectionProd = JSON.parse(localStorage.getItem(selection));
    console.log(selectionProd);

    if(selectionProd){

    }
    else{
      selectionProd = [];
      selectionProd.push(selection);
      localStorage.setItem("produit", JSON.stringify(selectionProd));
      console.log(selectionProd);
    }
    //let setItem = selection;
    //localStorage.setItem('addToCart', JSON.stringify(new 'addToCart'));
    //console.log(setItem);
    // creation de localStorage.setItem
  
    // addBtn.addEventListener('click', () => {
    //   btn = window.location.assign("./cart.html);
    //   console.log(btn);
    // })
  }
} 
/**
 * Creation d'un objet 
 * au click addToCart, ainsi que la lecture,
 * la recuperation et stockage du produit
 *  selectionné + couleur et quantité testés
 */
 

 

getId();

