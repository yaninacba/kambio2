import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { collection, query, where, getDocs, getFirestore, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


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


//funcion para leer hfc
document.getElementById("botonHfc").addEventListener("click", function() {
    mostrarHfc();
   console.log("Botón mostrar clickeado");
 });

            
         async function mostrarHfc() {
    try {
      
        const q = query(collection(db, "usuario"), where("isla", "==", "hfc"));
    
        const querySnapshot = await getDocs(q);

        const datosContainer = document.getElementById('datosContainer');
        datosContainer.innerHTML = ''; // Limpiar contenido previo

        querySnapshot.forEach((doc) => {
            const datosDiv = document.createElement('div');
            datosDiv.textContent = `
                Id: ${doc.id} => ${JSON.stringify(doc.data())}
                Nombre: ${doc.data().nombre}
                Apellido: ${doc.data().apellido}
                Isla: ${doc.data().isla}
                Turno: ${doc.data().turno}
                Cambio por: ${doc.data().cambiar}
                Fecha: ${doc.data().fecha}
            `;

            datosDiv.classList.add('dato');
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Eliminar';
            confirmButton.classList.add('btn', 'btn-success');
            confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
          confirmButton.addEventListener('click', async () => {
    const mensajeConfirmacion = `¿Estás seguro de que deseas eliminar este documento?`;
    const confirmarCambio = confirm(mensajeConfirmacion);
    if (confirmarCambio) {
        try {
            // Eliminar el documento de Firestore
            await deleteDoc(doc(db, "usuario", doc.id));
            console.log("Documento eliminado con éxito");
            
            // Eliminar el div de datosContainer
            datosContainer.removeChild(datosDiv);
        } catch (error) {
            console.error("Error eliminando documento:", error);
            alert("Error al eliminar el documento.");
        }
    }
});

       
        
                


//funcion para leer flow
document.getElementById("botonFlow").addEventListener("click", function() {
  mostrarFlow();
 console.log("Botón mostrar clickeado");
});

async function mostrarFlow() {
    try {
        const q = query(collection(db, "usuario"), where("isla", "==", "flow"));
        const querySnapshot = await getDocs(q);

        const datosContainer = document.getElementById('datosContainer');
        datosContainer.innerHTML = ''; // Limpiar contenido previo

        querySnapshot.forEach((doc) => {
            const datosDiv = document.createElement('div');
            
            datosDiv.textContent = `Nombre: ${doc.data().nombre}\n
                                    Apellido: ${doc.data().apellido}\n
                                    Isla: ${doc.data().isla}\n
                                    Turno: ${doc.data().turno}\n
                                    Cambio por: ${doc.data().cambiar}\n
                                    Fecha:${doc.data().fecha} \;
                                    Id: ${doc.data().id} `;
            datosDiv.classList.add('dato');
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar';
            confirmButton.classList.add('btn', 'btn-success');
            confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
            
        confirmButton.addEventListener('click', async () => {
    const mensajeConfirmacion = `¿Estás seguro de que deseas eliminar este documento?`;
    const confirmarCambio = confirm(mensajeConfirmacion);
    if (confirmarCambio) {
        try {
            // Eliminar el documento de Firestore
            await deleteDoc(doc(db, "usuario", doc.id));
            console.log("Documento eliminado con éxito");
            
            // Eliminar el div de datosContainer
            datosContainer.removeChild(datosDiv);
        } catch (error) {
            console.error("Error eliminando documento:", error);
            alert("Error al eliminar el documento.");
        }
    }
});
          




            
//funcion para leer movil
document.getElementById("botonMovil").addEventListener("click", function() {
  mostrarMovil();
 console.log("Botón mostrar clickeado");
});

async function mostrarMovil() {
    try {
        const q = query(collection(db, "usuario"), where("isla", "==", "movil"));
        const querySnapshot = await getDocs(q);

        const datosContainer = document.getElementById('datosContainer');
        datosContainer.innerHTML = ''; // Limpiar contenido previo

        querySnapshot.forEach((doc) => {
            const datosDiv = document.createElement('div');
            
            datosDiv.textContent = `Nombre: ${doc.data().nombre}\n
                                    Apellido: ${doc.data().apellido}\n
                                    Isla: ${doc.data().isla}\n
                                    Turno: ${doc.data().turno}\n
                                    Cambio por: ${doc.data().cambiar}\n
                                    Fecha: ${doc.data().fecha} `;
            datosDiv.classList.add('dato');
            
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar';
            confirmButton.classList.add('btn', 'btn-success');
            confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
            
            confirmButton.addEventListener('click', async () => {
                const telefono = doc.data().telefono;
                if (telefono) {
                    // Mostrar ventana de confirmación
                    const mensajeConfirmacion = `¿Estás seguro de que deseas confirmar el cambio, ${doc.data().cambiar}?`;
                    const confirmarCambio = confirm(mensajeConfirmacion);
                    if (confirmarCambio) {
                        // Si el usuario confirma el cambio, entonces proceder con el resto del código
                        const mensaje = encodeURIComponent("Hola, confirmas el cambio para ?");
                        const enlaceWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
                        window.open(enlaceWhatsApp, '_blank');
                        
                        try {
                            // Eliminar el documento de Firestore
                            await deleteDoc(doc(db, "usuario", doc.id));
                            console.log("Documento eliminado con éxito");
                            
                            // Eliminar el div de datosContainer
                            datosContainer.removeChild(datosDiv);
                        } catch (error) {
                            console.error("Error eliminando documento:", error);
                            alert("Error al eliminar el documento.");
                        }
                    } else {
                        console.log("La confirmación del cambio ha sido cancelada.");
                    }
                } else {
                    console.error("El documento no contiene un número de teléfono válido.");
                }

            // Agregar el botón de confirmación al div de datos
            datosDiv.appendChild(confirmButton);

            // Agregar el div de datos al contenedor
            datosContainer.appendChild(datosDiv);
        });

