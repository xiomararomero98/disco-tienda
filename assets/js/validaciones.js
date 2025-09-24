// =====================
// Validaciones de formularios
// =====================

// Validación de Login
function validarLogin(event) {
  event.preventDefault();
  const correo = document.querySelector("#form-login input[name='correo']").value;
  const password = document.querySelector("#form-login input[name='password']").value;

  if (!correo.endsWith("@duoc.cl") && !correo.endsWith("@profesor.duoc.cl") && !correo.endsWith("@gmail.com")) {
    alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return false;
  }

  if (password.length < 4 || password.length > 10) {
    alert("La contraseña debe tener entre 4 y 10 caracteres");
    return false;
  }

  alert("Login válido ✅");
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
