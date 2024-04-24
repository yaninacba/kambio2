import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { collection, query, where, getDocs, getFirestore} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


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
         
          datosDiv.textContent = `Nombre: ${doc.data().nombre}\n
                                  Apellido: ${doc.data().apellido}\n
                                  Isla: ${doc.data().isla}\n
                                  Turno: ${doc.data().turno}\n
                                  Fecha:${doc.data().fecha} `;
          datosDiv.classList.add('dato');
          const confirmButton = document.createElement('button');
          confirmButton.textContent = 'Confirmar';
          confirmButton.classList.add('btn', 'btn-success');
          confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
          
          confirmButton.addEventListener('click', () => {
              const telefono = doc.data().telefono;
              if (telefono) {
                  // mensaje automatico
                  const mensaje = encodeURIComponent("Hola, confirmas el cambio?");
                  const enlaceWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
                  window.open(enlaceWhatsApp, '_blank');
                  
                  // Eliminar el botón de confirmación del datosDiv
                  datosDiv.removeChild(confirmButton);
              } else {
                  console.error("El documento no contiene un número de teléfono válido.");
              }
          });

          // Agregar el botón de confirmación al div de datos
          datosDiv.appendChild(confirmButton);

          // Agregar el div de datos al contenedor
          datosContainer.appendChild(datosDiv);
      });
  } catch (error) {
      console.error("Error al recuperar datos:", error);
  }
}


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
                                Fecha:${doc.data().fecha} `;
        datosDiv.classList.add('dato');
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar';
        confirmButton.classList.add('btn', 'btn-success');
        confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
        
        confirmButton.addEventListener('click', () => {
            const telefono = doc.data().telefono;
            if (telefono) {
                // mensaje automatico
                const mensaje = encodeURIComponent("Hola, confirmas el cambio?");
                const enlaceWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
                window.open(enlaceWhatsApp, '_blank');
                
                // Eliminar el botón de confirmación del datosDiv
                datosDiv.removeChild(confirmButton);
            } else {
                console.error("El documento no contiene un número de teléfono válido.");
            }
        });

        // Agregar el botón de confirmación al div de datos
        datosDiv.appendChild(confirmButton);

        // Agregar el div de datos al contenedor
        datosContainer.appendChild(datosDiv);
    });
} catch (error) {
    console.error("Error al recuperar datos:", error);
}
}


//funcion para leer cattv
document.getElementById("botonCattv").addEventListener("click", function() {
  mostrarCattv();
 console.log("Botón mostrar clickeado");
});

async function mostrarCattv() {
    try {
        const q = query(collection(db, "usuario"), where("isla", "==", "cattv"));
        const querySnapshot = await getDocs(q);

        const datosContainer = document.getElementById('datosContainer');
        datosContainer.innerHTML = ''; 

        querySnapshot.forEach((doc) => {
            const datosDiv = document.createElement('div');
           
            datosDiv.textContent = `Nombre: ${doc.data().nombre}\n
                                    Apellido: ${doc.data().apellido}\n
                                    Isla: ${doc.data().isla}\n
                                    Turno: ${doc.data().turno}\n
                                    Fecha:${doc.data().fecha} `;
            datosDiv.classList.add('dato');
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar';
            confirmButton.classList.add('btn', 'btn-success');
            confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
            
            confirmButton.addEventListener('click', () => {
                const telefono = doc.data().telefono;
                if (telefono) {
                    // mensaje automatico
                    const mensaje = encodeURIComponent("Hola, confirmas el cambio?");
                    const enlaceWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
                    window.open(enlaceWhatsApp, '_blank');
                    
                    // Eliminar el botón de confirmación del datosDiv
                    datosDiv.removeChild(confirmButton);
                } else {
                    console.error("El documento no contiene un número de teléfono válido.");
                }
            });

            // Agregar el botón de confirmación al div de datos
            datosDiv.appendChild(confirmButton);

            // Agregar el div de datos al contenedor
            datosContainer.appendChild(datosDiv);
        });
    } catch (error) {
        console.error("Error al recuperar datos:", error);
    }
}

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
                                    Fecha:${doc.data().fecha} `;
            datosDiv.classList.add('dato');
            
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Confirmar';
            confirmButton.classList.add('btn', 'btn-success');
            confirmButton.type = 'button'; // Para asegurarse de que no sea un botón de envío de formulario
            
            confirmButton.addEventListener('click', () => {
                const telefono = doc.data().telefono;
                if (telefono) {
                    // mensaje automatico
                    const mensaje = encodeURIComponent("Hola, confirmas el cambio?");
                    const enlaceWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
                    window.open(enlaceWhatsApp, '_blank');
                    
                    // Eliminar el botón de confirmación del datosDiv
                    datosDiv.removeChild(confirmButton);
                } else {
                    console.error("El documento no contiene un número de teléfono válido.");
                }
            });

            // Agregar el botón de confirmación al div de datos
            datosDiv.appendChild(confirmButton);

            // Agregar el div de datos al contenedor
            datosContainer.appendChild(datosDiv);
        });
    } catch (error) {
        console.error("Error al recuperar datos:", error);
    }
}










