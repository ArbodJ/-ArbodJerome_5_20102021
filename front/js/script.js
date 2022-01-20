/**
 *  Variable contenant l' adresse de l'API 
 *  A.P.I. (Application Programmin Interface)
 * l'API contient des objets
 */
const url = 'http://localhost:3000/api/products';

// fonction pour l'appel de l'Api
//asynch pour permettre de s'executer independamment du code
async function addImage() { 
  // await pour attendre la resolution d'une promesse(promise)
  let requete = await fetch(url, { 
    method  : 'GET'
  });
  // on test si l'attente a été executé
  if(!requete.ok) {
    alert('Err : API non effectué ou non disponible');
  }
  else {
    //executer une fois la promesse resolue
    let findImage = await requete.json();
    // on transforme le json(objet) en tableau
    findImage.map((product)=> {
      create(product);// appel de la fonction
    })
  }
}
/**
 *  Fonction pour afficher les elements contenue dans l'api
 */
function create(product) {
  // Creation element lien dynamiquement
  let link = document.createElement('a'); 
  link.setAttribute('href', './product.html?id=' + product._id); // adresse sur page product.html
  console.log(link);
  // Creation element article
  let article = document.createElement('article');
  // Creation element image
  let img = document.createElement('img');
  img.setAttribute('src', product.imageUrl);
  img.setAttribute('alt', product.altTxt);
  // Creation element titre
  let h3 = document.createElement('h3');
  h3.setAttribute('class', 'productName');
  h3.textContent = product.name;
  // Creation element paragraphe
  let p = document.createElement('p');
  p.setAttribute('class', 'productDescription');
  p.textContent = product.description;
  // positionnement des elements  
  article.append(img, h3, p);
  link.append(article);

  document.getElementById('items').append(link);
}
addImage();

