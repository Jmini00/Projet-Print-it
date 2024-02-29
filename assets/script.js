const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
];

const banner = document.getElementById('banner');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const nbreImages = slides.length;
let indexSlides = 0;

arrowLeft.addEventListener('click',(e) => {
	indexSlides--;
	if(indexSlides < 0) {
		indexSlides = nbreImages -1;
	}
	displayBanner(indexSlides);
})

arrowRight.addEventListener('click',(e) => {
	indexSlides++;
	if(indexSlides > nbreImages -1) {
		indexSlides = 0;
	}
	displayBanner(indexSlides);
	
})

const createElements = (nbreImages) => {
	banner.insertAdjacentHTML('beforeend', '<p></p><div class="dots"></div>');
	const dots = banner.querySelector('.dots');
	for(let i = 0; i<nbreImages;i++) {
		dots.insertAdjacentHTML('beforeend', `<div class="dot" data-id="${i}"></div>`);
	}
}

createElements(nbreImages);

/// Images
const displayBanner = (indexSlides = 0) => {

	if(! banner.firstElementChild.classList.contains('banner-img')) {
		const img = `<img src="assets/images/slideshow/${slides[indexSlides].image}" class="banner-img">`;
		banner.insertAdjacentHTML('afterbegin', img)

	} else {
		const img = banner.querySelector('.banner-img');
		img.src = `assets/images/slideshow/${slides[indexSlides].image}`;

	}
	
/// Tagline
	const tagLineContent = `${slides[indexSlides].tagLine}`;
	const tagLineElement = banner.querySelector('p');
	tagLineElement.innerHTML = tagLineContent;

/// Dots
	const dots = banner.querySelectorAll('.dots .dot');
	dots.forEach((dot, index) =>{
		if(index === indexSlides) {
			dot.classList.add('dot_selected');
		} else {
			dot.classList.remove('dot_selected');
		}
	})
}

displayBanner(indexSlides);

const dotsHandler = () => {
	const dots = banner.querySelectorAll('.dots .dot');
	for(let dot of dots) {
		dot.style.cursor = "pointer";
		dot.addEventListener('click', (e) => {
			indexSlides = Number(e.target.dataset.id); // dataset recupere un element
			displayBanner(indexSlides);
		})
	}
}

dotsHandler();


const interval = 4000;
const intervalSec = setInterval(() => {
	displayBanner(indexSlides);
	indexSlides++;
	if(indexSlides > nbreImages -1) {
		indexSlides = 0;
	}
}, interval);


const delay = 10000;
const timeOut = setTimeout(() => { /// appel d'une fonction au bout d'un certain delai
	openModal(data, l, h);
}, delay);

window.addEventListener('click', () => {
	//clearTimeout(timeOut);
	closeModal();
})







const data = "Je suis une popup";
const l = 500;
const h = 300;

// fonction en ES6
const openModal = (data, l, h) => {
    const bodyTagDoc = document.body;   
    const htmlModal = `
    <div id="modal">
        <div id="popup">
            <p>${data}</p>
        </div>
    </div>
    `;
    bodyTagDoc.insertAdjacentHTML('afterbegin', htmlModal);
    const modal = document.getElementById("modal");
    ///////////// modal ////////////////
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,.8)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.position ="relative";
    modal.style.zIndex = 10000;
    /////////// popup ///////////////////
    const popup = document.getElementById('popup');
    popup.style.width = l + "px";
    popup.style.height = h + "px";
    popup.style.background = "red";
    popup.style.textAlign = "center";
    popup.style.padding = "30px";
    popup.style.position = "relative";
    ////////////// bt close //////////////
    popup.insertAdjacentHTML("afterbegin", '<div id="close">X</div>');
    const btClose = document.getElementById("close");
    btClose.style.position = "absolute";
    btClose.style.right = "20px";
    btClose.style.top = "10px";
    btClose.style.cursor = "pointer";   
}


// fonction flechée en ES6
const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.remove();
}


// ouverture modal au chargement
// openModal(data, l, h);

 // Events pour fermeture
 const btClose = document.getElementById("close");
 const modal = document.getElementById("modal");
 //btClose.addEventListener('click', closeModal);
 window.addEventListener('click', (e) => {
    //console.log(e.target);
    if(e.target === modal) {
        closeModal();
    }
 })


