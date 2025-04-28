import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { collection, query, where, getDocs, getFirestore, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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


// = CONFIGURACIÓN RAG =====
// Simulador de embeddings (en producción usa OpenAI/VertexAI)
async function generarEmbedding(texto) {
  // Esto es un simulador - reemplázalo con una API real en producción
  const palabras = texto.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/);
  return palabras.filter((palabra, i) => palabras.indexOf(palabra) === i);
}

//FUNCIÓN PRINCIPAL RAG =====
async function buscarConRAG(consultaUsuario) {
  try {
    // Generar embedding de la consulta
    const embeddingConsulta = await generarEmbedding(consultaUsuario);
    
    // Obtener todas las solicitudes (en producción usa límites/paginación)
    const q = query(collection(db, "usuario"));
    const querySnapshot = await getDocs(q);
    
    const resultados = [];
    
    // Calcular similitud para cada documento
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const textoDocumento = `${data.turno} ${data.cambiar} ${data.isla} ${data.fecha}`;
      const embeddingDoc = await generarEmbedding(textoDocumento);
      
      // Calcular similitud (método simplificado)
      const palabrasComunes = embeddingConsulta.filter(palabra => 
        embeddingDoc.includes(palabra)
      ).length;
      const similitud = (palabrasComunes / embeddingConsulta.length) * 100;
      
      if (similitud > 30) { // Umbral ajustable
        resultados.push({
          id: doc.id,
          ...data,
          similitud: similitud.toFixed(0) + "%"
        });
      }
    });
    
    // Ordenar por similitud
    return resultados.sort((a, b) => b.similitud - a.similitud);
    
  } catch (error) {
    console.error("Error en RAG:", error);
    return [];
  }
}

// ===== [3] MOSTRAR RESULTADOS RAG =====
function mostrarResultadosEnModal(resultados) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.zIndex = '1000';
  modal.style.padding = '20px';
  modal.style.overflowY = 'auto';
  
  modal.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; max-width: 800px; margin: 20px auto;">
      <h2 style="margin-bottom: 20px;">Resultados de búsqueda inteligente</h2>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="float: right; background: red; color: white; border: none; padding: 5px 10px; border-radius: 5px;">
        Cerrar
      </button>
      <div id="resultadosContainer"></div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const container = modal.querySelector('#resultadosContainer');
  
  if (resultados.length === 0) {
    container.innerHTML = '<p>No encontré coincidencias relevantes. Intenta con otros términos.</p>';
    return;
  }
  
  resultados.forEach(item => {
    const card = document.createElement('div');
    card.style.border = '1px solid #ddd';
    card.style.borderRadius = '8px';
    card.style.padding = '15px';
    card.style.marginBottom = '15px';
    card.innerHTML = `
      <h3>${item.nombre} ${item.apellido}</h3>
      <p><strong>Área:</strong> ${item.isla}</p>
      <p><strong>Turno actual:</strong> ${item.turno}</p>
      <p><strong>Quiere cambiar por:</strong> ${item.cambiar}</p>
      <p><strong>Fecha:</strong> ${item.fecha}</p>
      <p><strong>Similitud:</strong> <span style="color: ${item.similitud > '70%' ? 'green' : 'orange'}">${item.similitud}</span></p>
      <button onclick="confirmarCambioRAG('${item.id}', '${item.telefono}')" 
              style="background: #4CAF50; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
        Contactar para cambio
      </button>
    `;
    container.appendChild(card);
  });
}

// ===== [4] FUNCIÓN PARA CONFIRMAR CAMBIO DESDE RAG =====
window.confirmarCambioRAG = async function(id, telefono) {
  const confirmacion = confirm("¿Deseas contactar a esta persona para el cambio de turno?");
  if (confirmacion && telefono) {
    const mensaje = encodeURIComponent("Hola, vi tu solicitud de cambio de turno y me interesa. ¿Aún está disponible?");
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
    
    // Opcional: Marcar como "en negociación" en Firestore
    try {
      await updateDoc(doc(db, "usuario", id), {
        estado: "en_negociacion"
      });
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  }
};

/
// Modificación a tu función mostrarDatos para incluir similitud
async function mostrarDatos(isla) {
  try {
    const q = query(collection(db, "usuario"), where("isla", "==", isla));
    const querySnapshot = await getDocs(q);

    const datosContainer = document.getElementById('datosContainer');
    datosContainer.innerHTML = '';
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const datosDiv = document.createElement('div');
      datosDiv.innerHTML = `
        <!-- Tus campos actuales -->
        <p>Nombre: ${data.nombre}</p>
        <!-- ... otros campos ... -->
        
        <!-- Nuevo: Botón de búsqueda semántica -->
        <button class="btn btn-info btn-sm mt-2" 
                onclick="buscarSimilares('${data.turno}', '${data.cambiar}')">
          <i class="fas fa-search"></i> Encontrar similares
        </button>
      `;
      // ... resto de tu código ...
    });
  } catch (error) {
    console.error("Error al recuperar datos:", error);
  }
}

// Función auxiliar para buscar similares
window.buscarSimilares = async function(turno, cambiar) {
  const resultados = await buscarConRAG(`Turno ${turno} cambio por ${cambiar}`);
  mostrarResultadosEnModal(resultados);
};
