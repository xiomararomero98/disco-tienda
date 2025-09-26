// ================== Productos ==================
function getProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Render productos
function renderProductos() {
  const tabla = document.getElementById("tabla-productos");
  if (!tabla) return;

  const productos = getProductos();
  tabla.innerHTML = "";
  productos.forEach((p, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>
          <button onclick="editarProducto(${i})">✏️</button>
          <button onclick="borrarProducto(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// Guardar producto
document.getElementById("form-producto")?.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;

  let productos = getProductos();
  if (id) {
    productos[id] = { nombre, precio };
  } else {
    productos.push({ nombre, precio });
  }
  guardarProductos(productos);
  renderProductos();
  e.target.reset();
});

function editarProducto(i) {
  const productos = getProductos();
  document.getElementById("id").value = i;
  document.getElementById("nombre").value = productos[i].nombre;
  document.getElementById("precio").value = productos[i].precio;
}

function borrarProducto(i) {
  let productos = getProductos();
  productos.splice(i, 1);
  guardarProductos(productos);
  renderProductos();
}

// ================== Usuarios ==================
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Render usuarios
function renderUsuarios() {
  const tabla = document.getElementById("tabla-usuarios");
  if (!tabla) return;

  const usuarios = getUsuarios();
  tabla.innerHTML = "";
  usuarios.forEach((u, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>
          <button onclick="editarUsuario(${i})">✏️</button>
          <button onclick="borrarUsuario(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// Guardar usuario
document.getElementById("form-usuario")?.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("id-usuario").value;
  const nombre = document.getElementById("nombre-usuario").value;
  const correo = document.getElementById("correo-usuario").value;

  let usuarios = getUsuarios();
  if (id) {
    usuarios[id] = { nombre, correo };
  } else {
    usuarios.push({ nombre, correo });
  }
  guardarUsuarios(usuarios);
  renderUsuarios();
  e.target.reset();
});

function editarUsuario(i) {
  const usuarios = getUsuarios();
  document.getElementById("id-usuario").value = i;
  document.getElementById("nombre-usuario").value = usuarios[i].nombre;
  document.getElementById("correo-usuario").value = usuarios[i].correo;
}

function borrarUsuario(i) {
  let usuarios = getUsuarios();
  usuarios.splice(i, 1);
  guardarUsuarios(usuarios);
  renderUsuarios();
}

// ================== Dashboard ==================
document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  renderUsuarios();

  const totalProductos = document.getElementById("total-productos");
  const totalUsuarios = document.getElementById("total-usuarios");

  if (totalProductos) totalProductos.textContent = getProductos().length;
  if (totalUsuarios) totalUsuarios.textContent = getUsuarios().length;
});
