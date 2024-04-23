 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
 import {getDocs, addDoc, collection, getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlLngo2i5bBqXrF7uWh9Rk7LBetyvHth0",
  authDomain: "boris-f276f.firebaseapp.com",
  projectId: "boris-f276f",
  storageBucket: "boris-f276f.appspot.com",
  messagingSenderId: "277241048439",
  appId: "1:277241048439:web:c3c73d6263c6eeb5204572",
  measurementId: "G-0EJS7NMRLK"
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log('hola probando');

  document.getElementById("confirmar").addEventListener("click", function() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const isla = document.getElementById('isla').value;
    agregarDocumento(nombre,apellido,telefono,isla);
    console.log("Cambio cargado ");
});

  
    async function agregarDocumento(nombre,apellido,telefono,isla){
    try {
   const docRef = await addDoc(collection(db, "usuario"), {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    isla: isla
});
console.log("Document written with ID: ", docRef.id);
alert("Cambio agregado exitosamente" + docRef.id);
limpiarCampos();
} catch (e) {
console.error("Error adding document: ", e);
alert("Error al cargar los datos"+ docRef.id);
}
}    

function limpiarCampos() {
  // queda en blanco
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("isla").value = "";
}

//mostrar y ocultar el calendario
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendario');
  var formulario = document.getElementById('inicio');
  var inputFecha = document.getElementById('fecha');
  var calendarioBoton = document.getElementById('calendarioBoton');

  var calendar = new FullCalendar.Calendar(calendarEl, {
      // Configuración del calendario
      initialView: 'dayGridMonth', // Vista inicial del calendario
      selectable: true, // Permitir selección de fechas
      dateClick: function(info) {
          // Cuando el usuario hace clic en una fecha en el calendario
          inputFecha.value = info.dateStr; // Establecer el valor del campo de entrada de fecha
          calendarEl.style.display = 'none'; // Ocultar el calendario
      }
  });

  // Al hacer clic en el botón, mostrar el calendario
  abrirCalendario.addEventListener('click', function() {
      calendarEl.style.display = 'block'; // Mostrar el calendario
      calendar.render(); // Renderizar el calendario
  });

  // Asegurarse de que el calendario se oculte si se hace clic fuera de él
  document.addEventListener('click', function(e) {
      if (!formulario.contains(e.target) && e.target !== calendarioBoton) {
          calendarEl.style.display = 'none'; // Ocultar el calendario
      }
  });
});