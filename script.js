// Cambia esta variable manualmente según la cantidad de tareas completadas:
let tareasCompletadas = 4;

const etapas = [
  { nombre: "huevo",    limite: 10, sprite: "dragon_huevo.png" },
  { nombre: "bebé",     limite: 20, sprite: "dragon_bebe.png" },
  { nombre: "niño",     limite: 50, sprite: "dragon_nino.png" },
  { nombre: "adolescente", limite: 100, sprite: "dragon_adolescente.png" },
  { nombre: "adulto",   limite: Infinity, sprite: "dragon_adulto.png" }
];

function actualizarMascota() {
  const dragonImg = document.getElementById("dragonImage");
  const expBar = document.getElementById("expBar");
  const progressText = document.getElementById("progressText");

  let etapaActual = etapas[0];
  for (let i = 1; i < etapas.length; i++) {
    if (tareasCompletadas >= etapas[i].limite) {
      etapaActual = etapas[i];
    } else {
      break;
    }
  }

  // Determinar el progreso relativo para la barra
  let progresoEtapa = 0;
  let tareasInicio = 0;
  for (let i = 0; i < etapas.length; i++) {
    if (etapaActual === etapas[i]) {
      tareasInicio = i === 0 ? 0 : etapas[i - 1].limite;
      break;
    }
  }
  const tareasEtapa = etapaActual.limite - tareasInicio;
  progresoEtapa = ((tareasCompletadas - tareasInicio) / tareasEtapa) * 100;

  dragonImg.src = etapaActual.sprite;
  expBar.style.width = `${Math.min(progresoEtapa, 100)}%`;
  progressText.textContent = `${tareasCompletadas}/${etapaActual.limite} tareas completadas`;
}
  async function cargarEstudiantes() {
    try {
      const respuesta = await fetch("https://raw.githubusercontent.com/Crjs2025/DragonGrupal/main/estudiantes.json");
      const estudiantes = await respuesta.json();

      const tbody = document.getElementById("tabla-estudiantes").querySelector("tbody");

      estudiantes.sort((a, b) => b.tareas - a.tareas); // Ordenar de mayor a menor

      estudiantes.forEach(est => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td style="border: 1px solid #ccc; padding: 8px;">${est.nombre}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${est.tareas}</td>
        `;

        tbody.appendChild(fila);
      });
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  }
  cargarEstudiantes();
actualizarMascota();
