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
//mostrar y ocultar el calendario
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendario');
  var inputFecha = document.getElementById('fecha');
  var calendarioBoton = document.getElementById('calendarioBoton');
  var calendar;

  // Configuración del calendario
  calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      dateClick: function(info) {
          inputFecha.value = info.dateStr;
          calendarEl.style.display = 'none';
      }
  });

  // Al hacer clic en el botón, mostrar el calendario
  calendarioBoton.addEventListener('click', function() {
      calendar.render();
      calendarEl.style.display = 'block';
  });

  // Asegurarse de que el calendario se oculte si se hace clic fuera de él
  document.addEventListener('click', function(e) {
      if (e.target !== calendarioBoton && !calendarEl.contains(e.target)) {
          calendarEl.style.display = 'none';
      }
  });

  // Navegar al formulario principal
  document.getElementById("principal").addEventListener("click", function() {
      window.location.href = "index.html";
      console.log("Botón principal clickeado");
  });

  // Navegar al formulario de registro
  document.getElementById("reg").addEventListener("click", function() {
      window.location.href = "registrar.html";
      console.log("Botón reg clickeado ok");
  });
});


  // Navegar al formulario principal
  document.getElementById("principal").addEventListener("click", function() {
      window.location.href = "index.html";
      console.log("Botón principal clickeado");
  });

  // Navegar al formulario de registro
  document.getElementById("reg").addEventListener("click", function() {
      window.location.href = "registrar.html";
      console.log("Botón reg clickeado ok");
  });
