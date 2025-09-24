// =====================
// Regiones y Comunas
// =====================
const regiones = {
  "Metropolitana": ["Santiago", "Maipú", "Puente Alto"],
  "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

// Función para poblar selects dinámicos
function cargarRegiones() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  if (!selectRegion || !selectComuna) return;

  // Llenar regiones
  for (let region in regiones) {
    let option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    selectRegion.appendChild(option);
  }

  // Cambiar comunas cuando cambia la región
  selectRegion.addEventListener("change", function() {
    selectComuna.innerHTML = "";
    regiones[this.value].forEach(comuna => {
      let option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      selectComuna.appendChild(option);
    });
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarRegiones);
