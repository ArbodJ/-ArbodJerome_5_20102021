// const url = 'http://localhost:3000/api/products';
// console.log(url);
// Recuperation de la selection de product.js
// verification panier
let catchProduct = JSON.parse(localStorage.getItem("selectionProd"));
console.log(catchProduct);

// Affichage de la selection de product.js
catchProduct.forEach(item => {
  // emplacement de l'affichage du et/ou des produits
  let section = document.getElementById('cart__items');
  
  // creation de la balise article
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', item.idProduct);
  article.setAttribute('data-color', item.colorProduct);
  
  
  // creation, placement et affichage div et "IMG"
  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');
  let cartImage = document.createElement('img');
  cartImage.setAttribute('src', item.imageProduct);
  cartImage.textContent = item.imageProduct;
  cartImage.setAttribute('alt', item.altTxt);
  cartImage.textContent = item.altTxt;
  cartItemImg.append(cartImage);
  article.append(cartItemImg);

  // creation et placement div description d'un produit
  let cartItemContent = document.createElement('div');
  cartItemContent.setAttribute('class', 'cart__item__content');
  article.append(cartItemContent);

  // creation et placement div description "NAME", "COLOR", "PRICE" et de son contenu
  let cartItemContentDescription = document.createElement('div');
  cartItemContentDescription.setAttribute('class', 'cart__item__content__description');
  cartItemContent.append(cartItemContentDescription);
  let title = document.createElement('h2');
  title.textContent = item.nameProduct;
  let clr = document.createElement('p');
  clr.textContent = item.colorProduct;
  let price = document.createElement('p');
  price.textContent = item.priceProduct + ' €';
  cartItemContentDescription.append(title, clr, price);

  // creation et placement div setting
  let cartItemSetting = document.createElement('div');
  cartItemSetting.setAttribute('class', 'cart__item__content__settings');
  cartItemContent.append(cartItemSetting);

  // creation et placement div "QUANTITY" et son contenu
  let cartItemSettingQty = document.createElement('div');
  cartItemSettingQty.setAttribute('class', 'cart__item__content__settings__quantity');
  cartItemSetting.append(cartItemSettingQty);
  let quantity = document.createElement('p');
  quantity.textContent = 'Qté :';
  let nbrQty = document.createElement('input');
  nbrQty.setAttribute('type', 'number', 'class', 'itemQuantity', 'name', 'itemQuantity');
  nbrQty.setAttribute('min', '1', 'max','100');
  nbrQty.setAttribute('value', item.numberProduct);
  //modifTotal();
  // appel function
  cartItemSettingQty.append(quantity,nbrQty);

  // creation et placement div "SUPPRIMER" et son contenu
  let cartItemSettingDelete = document.createElement('div');
  cartItemSettingDelete.setAttribute('class', 'cart__item__content__settings__delete');
  cartItemSetting.append(cartItemSettingDelete);
  let deleted = document.createElement('p');
  deleted.setAttribute('href', '');
  deleted.textContent = 'Supprimer';
  // deleted.addEventListener('click', () => {
  //   deleted();
  // });
  cartItemSettingDelete.append(deleted);
  // placement de article dans la section
  section.append(article);
  //displayTotal();
  //localStorage.setItem('selectionProd', JSON.stringify(catchProduct));
});
// ---------- PARTIE PANIER ---------- //

// calcul du panier recuperer du localStorage
function displayTotal(){
  let total = JSON.parse(localStorage.getItem('selectionProd'));
  let totalQty = document.querySelector('#totalQuantity');
  let totalPrice = document.querySelector('#totalPrice');
  let qtyArticle = 0;
  let prcArticle = 0;

  total.forEach(ttl => {
    qtyArticle += ttl.numberProduct;
    prcArticle +=  ttl.numberProduct * ttl.priceProduct;
    totalQty.textContent = qtyArticle; 
    totalPrice.textContent = prcArticle;
    //localStorage.setItem('selectionProd', JSON.stringify(qtyArticle, prcArticle));
  });
  //modifTtl();
  console.log(total);
}
displayTotal();

/* SUPPRESSION DU PANIER */
document.querySelectorAll('.deleteItem').forEach(item => {
  item.addEventListener('click', () => {
      
      let article = item.closest('article');
      let id = article.getAttribute("data-id", item.idProduct);
      let color = article.getAttribute("data-color", item.colorProduct);
      let panier = JSON.parse(localStorage.getItem('selectionProd'));
      let newPanier = [];

      /* SUPPRIMER DU LOCALSTORAGE */
      panier.forEach(element => {
          if(element.idProduct != id || element.colorProduct != color){
              newPanier.push(element);
          }
      })

      localStorage.setItem('selectionProd', JSON.stringify(newPanier));

      /* SUPPRIMER DU HTML */
      article.remove();
     //displayTotal();
  })
})

document.querySelectorAll('.itemQuantity').forEach(item => {
  item.addEventListener('change', (e) => {
      e.preventDefault();
      let article = item.closest('article');
      let id = article.getAttribute("data-id");
      let color = article.getAttribute("data-color");
      let panier = JSON.parse(localStorage.getItem("selectionProd"));
      let newPanier = [];

      /* MODFIER DU LOCALSTORAGE */
      panier.forEach(element => {
          if(element.idProduct != id || element.colorProduct != color){
              element.numberProduct = parseInt(item.value);
          }
          newPanier.push(element);
          console.log(newPanier);
      })
console.log(panier);
      localStorage.setItem('selectionProd', JSON.stringify(newPanier));
      //displayTotal();
  })
})

// ---------- PARTIE FORMULAIRE ---------- //
// Prenom
let firstName = document.getElementById('firstName');
let badFirstName = document.getElementById('firstNameErrorMsg');
let regexFirstNm = /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

firstName.addEventListener('input', (e) => {
  e.preventDefault();
  if(!regexFirstNm.test(firstName.value)){
    badFirstName.textContent = "ERREUR : Prénom non renseigné ou prenom invalide";
  } else {
    badFirstName.textContent = 'Prénom valide';
  }
})
// Nom
let lastName = document.getElementById('lastName');
let badLastName = document.getElementById('lastNameErrorMsg');
let regexLstNm = /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

lastName.addEventListener('input', (e) => {
  e.preventDefault();
  if(!regexLstNm.test(lastName.value)){
    badLastName.textContent= "ERREUR : Nom non renseigné ou nom invalide";
  } else {
    badLastName.textContent= "Nom valide";
  }
})
// Adresse
let address = document.getElementById('address');
let badAddress = document.getElementById('addressErrorMsg');
let regexAdrs = /^[a-zA-Z0-9\s,'-]*$/;

address.addEventListener('input', (e) =>{
  e.preventDefault();
  if(!regexAdrs.test(address.value)){
    badAddress.textContent = "ERREUR : Adresse non rensigne ou adresse invalide";
  } else {
    badAddress.textContent = "Adresse valide";
  }
})
// Ville
let town = document.getElementById('city');
let badTown = document.getElementById('cityErrorMsg');
let regexTwn =  /^[a-zA-Z',.\s-]{1,35}$/;

town.addEventListener('input', (e) => {
  if(!regexTwn.test(town.value)){
    badTown.textContent = "ERREUR : Ville non renseigné ou ville invalide";
  } else {
    badTown.textContent = "Ville valide";
  }
})
// E-mail
let email = document.getElementById('email');
let badEmail = document.getElementById('emailErrorMsg');
let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

email.addEventListener('input', (e) => {
  if(!regexEmail.test(email.value)){
    badEmail.textContent = "ERREUR : Email non renseigné ou email invalid";
  } else {
    badEmail.textContent = "Email valide";
  }
})
console.log(firstName, lastName, address, town, email);

