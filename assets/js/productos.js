const productos = [
  { id: 1, nombre: "Entrada General", precio: 10000, imagen: "assets/img/entradas.png" },
  { id: 2, nombre: "Promo Balde de Cervezas", precio: 20000, imagen: "assets/img/cervezas.png" },
  { id: 3, nombre: "Promo Balde de Whisky + bebidas", precio: 50000, imagen: "assets/img/whiskys.png" }
];

const listaProductos = document.getElementById("lista-productos");

if (listaProductos) {
  productos.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("producto");
    item.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarCarrito(${p.id})">Añadir al carrito</button>
    `;
    listaProductos.appendChild(item);
  });
}

function agregarCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContadorCarrito(); // 👈 actualiza el numerito

  if (confirm(`${producto.nombre} agregado ✅\n¿Quieres ir al carrito?`)) {
    window.location.href = "carrito.html";
  }
}
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    if (carrito.length === 0) {
      contador.style.display = "none"; // se oculta cuando está en 0
    } else {
      contador.style.display = "inline-block"; // visible cuando hay productos
      contador.textContent = carrito.length;
    }
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);



