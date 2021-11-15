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
    
    if(requete.ok) {
      let canap = await requete.json();
      console.log(canap);
        getDisplay(canap);
    }
    else {
      alert('Err : Un Prob !!!');  
      }   
  }

  function getDisplay(canap){ // Inserrer les elements a leurs place a sa place
    
    let productImg = document.createElement("img"); // la photo du canapé
    productImg.setAttribute('src', canap.imageUrl);
    productImg.setAttribute('alt', canap.altTxt);
  
    document.getElementsByClassName('item__img')[0].append(productImg); // placement de l'image

    document.getElementById('title').append(canap.name); // Afficher le nom du canapé

    document.getElementById('price').append(canap.price); // Afficher le prix du canapé

    document.getElementById('description').append(canap.description); // Afficher la description du canapé

    // selection de la couleur
    let selectColor = document.getElementById("colors"); 
      for (let i = 0; i < canap.colors.length; i++) {
        let option = document.createElement("option");
        option.textContent = canap.colors[i];
        selectColor.append(option);
      }
      
      let btn = document.getElementById('addToCart');
      //btn.setAttribute('href', './cart.html?');
      
      btn.addEventListener('click', () => {
        btn = window.location.assign("./cart.html?id=" + canap._id);
        console.log(btn);
      })  
      
        
      
   }
   
getId();

