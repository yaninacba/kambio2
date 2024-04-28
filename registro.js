 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
 import {getDocs, addDoc, collection, getFirestore, deleteDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";



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
    const turno = document.getElementById('turno').value;
    const cambiar = document.getElementById('cambiar').value;
    const fecha = document.getElementById('fecha').value;
    agregarDocumento(nombre,apellido,telefono,isla,turno,cambiar,fecha);
    console.log("Cambio cargado ");
});

//validar si los campos estan completos
function validarCampos(nombre, apellido, telefono, isla, turno, cambiar, fecha) {
  if (!nombre || !apellido || !telefono || !isla || !turno || !fecha) {
      alert("Por favor, completa todos los campos.");
      return false;
  }
  return true;
}
  
    async function agregarDocumento(nombre,apellido,telefono,isla,turno,cambiar,fecha){
      if (!validarCampos(nombre, apellido, telefono, isla, turno, fecha)) {
        return;
    }
    try {
   const docRef = await addDoc(collection(db, "usuario"), {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    isla: isla,
    turno: turno,
    cambiar: cambiar,
    fecha: fecha
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
  document.getElementById("turno").value = "";
  document.getElementById("cambiar").value = "";
  document.getElementById("fecha").value = "";

}


const calendarEl = document.getElementById('calendario'); 
let calendar;

calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    dateClick: function(info) {
        const fechaSeleccionada = new Date(info.dateStr);
        const dia = fechaSeleccionada.getDate();
        const mes = fechaSeleccionada.getMonth() + 1;

        document.getElementById('fecha').value = `${dia}/${mes}`;
        calendarEl.style.display = 'none';
    }
});

// Renderizar el calendario al cargar la página
calendar.render();

// Mostrar el calendario
calendarEl.style.display = 'block';








