document.addEventListener('DOMContentLoaded', () => {
  const pestanas = document.querySelectorAll('.pestana');
  const listas = {
    ofertados: document.getElementById('lista-ofertados'),
    comprando: document.getElementById('lista-comprando'),
  };
  const panelChat = document.querySelector('.panel-chat');
  const nombreUsuarioChat = document.getElementById('nombre-usuario-chat');
  const btnVolver = document.querySelector('.btn-volver');
  const zonaEscritura = panelChat.querySelector('.zona-escritura');
  const contenidoChat = panelChat.querySelector('.contenido-chat');
  const listaConversaciones = document.querySelectorAll('.lista-conversaciones');

  function crearFondoSinChats() {
    const div = document.createElement('div');
    div.className = 'sin-chats';
    div.textContent = 'Sin chats';
    div.style.cssText = `
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 1.3rem;
      font-weight: 600;
    `;
    return div;
  }

  function actualizarSinChats() {
    Object.values(listas).forEach(lista => {
      const existente = lista.querySelector('.sin-chats');
      if (existente) existente.remove();

      if (lista.children.length === 0) {
        lista.appendChild(crearFondoSinChats());
      }
    });
  }
  actualizarSinChats();

  pestanas.forEach(pestana => {
    pestana.addEventListener('click', () => {
      pestanas.forEach(p => p.classList.remove('activa'));
      Object.values(listas).forEach(lista => {
        lista.classList.add('oculto');
        lista.classList.remove('visible');
      });

      const seccion = pestana.dataset.seccion;
      pestana.classList.add('activa');
      listas[seccion].classList.remove('oculto');
      listas[seccion].classList.add('visible');

      ocultarPanelChat();
    });
  });

  function ocultarPanelChat() {
    panelChat.classList.add('oculto');
    panelChat.classList.remove('visible');
    contenidoChat.innerHTML = '';
    zonaEscritura.style.display = 'none';
    nombreUsuarioChat.textContent = '';
  }

  function mostrarPanelChat(usuario, mensajes = []) {
    panelChat.classList.remove('oculto');
    panelChat.classList.add('visible');
    panelChat.style.backgroundColor = '#e5ddd5';
    zonaEscritura.style.display = 'flex';
    nombreUsuarioChat.textContent = usuario;

    contenidoChat.innerHTML = '';

    if (mensajes.length === 0) {
      contenidoChat.textContent = 'No hay mensajes aún';
      contenidoChat.style.color = '#666';
      contenidoChat.style.fontStyle = 'italic';
    } else {
      contenidoChat.style.color = '';
      contenidoChat.style.fontStyle = '';
      mensajes.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'mensaje ' + (msg.tipo === 'saliente' ? 'saliente' : 'entrante');
        div.textContent = msg.texto;
        contenidoChat.appendChild(div);
      });
    }

    contenidoChat.scrollTop = contenidoChat.scrollHeight;
  }

  Object.values(listas).forEach(lista => {
    lista.addEventListener('click', e => {
      const conv = e.target.closest('.conversacion');
      if (!conv) return;

      const usuario = conv.dataset.usuario || 'Sin nombre';
      let mensajes = [];

      if (usuario === 'Juan Pérez') {
        mensajes = [
          { tipo: 'entrante', texto: 'Hola, ¿sigue disponible?' },
          { tipo: 'saliente', texto: 'Sí, claro.' },
        ];
      } else if (usuario === 'María López') {
        mensajes = [
          { tipo: 'entrante', texto: 'Estoy interesada en tu publicación.' },
        ];
      } else {
        mensajes = [];
      }

      mostrarPanelChat(usuario, mensajes);

      if (window.innerWidth < 768) {
        document.querySelector('.panel-conversaciones').classList.remove('visible');
        document.querySelector('.panel-conversaciones').classList.add('oculto');
      }
    });
  });

  btnVolver.addEventListener('click', () => {
    ocultarPanelChat();
    document.querySelector('.panel-conversaciones').classList.remove('oculto');
    document.querySelector('.panel-conversaciones').classList.add('visible');
  });

  pestanas[0].click();

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      document.querySelector('.panel-conversaciones').classList.add('visible');
      document.querySelector('.panel-conversaciones').classList.remove('oculto');
      panelChat.classList.add('visible');
      panelChat.classList.remove('oculto');
      panelChat.style.backgroundColor = '#e5ddd5';
      zonaEscritura.style.display = 'flex';
    } else {
      if (!panelChat.classList.contains('visible')) {
        panelChat.style.backgroundColor = '#000';
        zonaEscritura.style.display = 'none';
      }
    }
  });
});
