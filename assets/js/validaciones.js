// =====================
// Validaciones de formularios
// =====================

// Validación de Login
document.getElementById("form-login")?.addEventListener("submit", validarLogin);

function validarLogin(event) {
  event.preventDefault();
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  // ✅ Solo validamos la contraseña
  if (password.length < 4 || password.length > 10) {
    alert("La contraseña debe tener entre 4 y 10 caracteres");
    return false;
  }

  alert("Login válido ✅ Bienvenido a Disco Online");
  return true;
}


// Validación de Registro
function validarRegistro(event) {
  event.preventDefault();
  // Aquí después completamos reglas para run, nombre, apellidos, etc.
  alert("Registro validado ✅ (falta lógica completa)");
}

// Validación de Contacto
function validarContacto(event) {
  event.preventDefault();
  // Aquí después completamos reglas
  alert("Formulario de contacto validado ✅");
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