const cards = document.getElementById('cards'); 
const footer = document.getElementById('footer'); 
const items = document.getElementById('items'); 

const templateCard = document.getElementById('template-card').content; 
const templateCarrito = document.getElementById('template-carrito').content; 
const templateFooter = document.getElementById('template-footer').content; 

const fragment = document.createDocumentFragment(); 

let comprar = document.getElementById('comprar'); 


const btnAdd = document.getElementsByClassName('btnAdd');
let contador = document.getElementById('contador');
let contadorContenido = Number(document.getElementById('contador').innerText);


class Producto {

    constructor(item){
        this.id = item.id;
        this.titulo = item.titulo;
        this.imagen = item.imagen;
        this.precio = item.precio;
    }

};

const PRODUCTOS = [
    new Producto ({id: "1", titulo: "Riñonera", imagen: "../Imagen & Video/Bolsos/riñonera1.png" ,precio: "3500",}),
    new Producto ({id: "2", titulo: "Cartera Mediana", imagen: "../Imagen & Video/Bolsos/mediano1.jpg" ,precio: "5200",}),
    new Producto ({id: "3", titulo: "Bandolera", imagen: "../Imagen & Video/Bolsos/foto1.png" , precio: "2500",}),
    new Producto ({id: "4", titulo: "Mochila rojo", imagen: "../Imagen & Video/Bolsos/mochila roja.png" , precio: "5350",}),
    new Producto ({id: "5", titulo: "Mochila negro", imagen: "../Imagen & Video/Bolsos/Mochila negra.png" , precio: "5900",}),
    new Producto ({id: "6", titulo: "Bolso Azul", imagen: "../Imagen & Video/Bolsos/cardera azul.jpg" , precio: "5200",}),
    new Producto ({id: "7", titulo: "Bolso sintético", imagen: "../Imagen & Video/Bolsos/foto2.jpg" , precio: "6800",}),
    new Producto ({id: "8", titulo: "Bolso con flecos", imagen: "../Imagen & Video/Bolsos/foto6.jpg" , precio: "4500",}),
    new Producto ({id: "9", titulo: "Cartera Saffiano", imagen: "../Imagen & Video/Bolsos/foto3.jpg" , precio: "3100",}),
    new Producto ({id: "10", titulo: "Cartera blanca", imagen: "../Imagen & Video/Bolsos/cartera blanca.jpg" , precio: "3550",}),
    new Producto ({id: "11", titulo: "Bolso nylon", imagen: "../Imagen & Video/Bolsos/foto5.jpg" , precio: "4200",}),
    new Producto ({id: "12", titulo: "Minibolso", imagen: "../Imagen & Video/Bolsos/foto4.jpg" , precio: "2500",}),
];


document.addEventListener('DOMContentLoaded' , () => {
    if(localStorage.length == ''){
        contador.innerText = contadorContenido;
    
    }else{
        contador.innerText = localStorage.getItem('datos');  
        contadorContenido = Number(document.getElementById('contador').innerText);
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito();
    }
});

PRODUCTOS.forEach((item) => {
    templateCard.querySelector('h5').textContent = item.titulo;
    templateCard.querySelector('span').textContent = item.precio;
    templateCard.querySelector('img').setAttribute("src", item.imagen)
    templateCard.querySelector('button').dataset.id = item.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
});

cards.appendChild(fragment); 

cards.addEventListener('click' , evento => {

    if(evento.target.classList.contains('btn-dark')){
        setCarrito(evento.target.parentElement);

        sweetAlert(
            'Buen trabajo!',
            'Producto agregado con éxito',
            'success',
          );

    };
    
});

items.addEventListener('click', evento => {
    btnAccion(evento);
})

const setCarrito = objeto => {
    const productoAdd = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    };

    if(carrito.hasOwnProperty(productoAdd.id)){
        productoAdd.cantidad = carrito[productoAdd.id].cantidad + 1
    };

    carrito[productoAdd.id] = {...productoAdd};
    pintarCarrito();
};




const pintarCarrito = () => {
    items.innerHTML = '';
    Object.values(carrito).forEach(productoAdd => {
        templateCarrito.querySelector('th').textContent = productoAdd.id
        templateCarrito.querySelectorAll('td')[0].textContent = productoAdd.titulo
        templateCarrito.querySelectorAll('td')[1].textContent = productoAdd.cantidad
        templateCarrito.querySelector('.btn-success').dataset.id = productoAdd.id
        templateCarrito.querySelector('.btn-secondary').dataset.id = productoAdd.id
        templateCarrito.querySelector('span').textContent = productoAdd.cantidad * productoAdd.precio

        const clone = templateCarrito.cloneNode(true);
        
        fragment.appendChild(clone);
    });
    
    items.appendChild(fragment);

    pintarFooter();

    localStorage.setItem('carrito' , JSON.stringify(carrito));
}


const pintarFooter = () => {
    footer.innerHTML = "";

    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>`
        

        return
    }

    const nCantidad = Object.values(carrito).reduce( (acc , {cantidad}) => acc + cantidad, 0);

    const nPrecio = Object.values(carrito).reduce( (acc , {cantidad,precio}) => acc + cantidad * precio, 0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;
    contador.textContent = nCantidad

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    localStorage.setItem('datos' , contadorContenido); 

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click' , () => {
        carrito = {};
        contador.textContent = 0;
        pintarCarrito();
        pintarFooter();
    });
};

const btnAccion = evento => {
    if (evento.target.classList.contains('btn-success')){

        const productoI = carrito[evento.target.dataset.id];
        productoI.cantidad++ ;

        carrito[evento.target.dataset.id] = {...productoI}
        pintarCarrito();
    }

    if(evento.target.classList.contains('btn-secondary')){
        const productoD = carrito[evento.target.dataset.id];
        productoD.cantidad--;

        if(productoD.cantidad === 0){
            delete carrito[evento.target.dataset.id]
        }        
        pintarCarrito();
    }
}

comprar.addEventListener('click' , () => {
    sweetAlert(
        'Compra finalizada!'
      );

      carrito = {};
      contador.textContent = 0;
      pintarCarrito();
      pintarFooter();
})








