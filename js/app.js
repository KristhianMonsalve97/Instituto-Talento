let cursos = [];
let modal = document.getElementById("modal");
let form = document.getElementById("formCurso");

document.addEventListener("DOMContentLoaded", () => {
    cargarCursos();
    configurarMenu();
    form.addEventListener("submit", guardarCurso);
    document.getElementById("btnCancelar").addEventListener("click", cerrarModal);
    document.getElementById("btnNuevoCurso").addEventListener("click", abrirModal);
    
   
    document.getElementById("btnEstudiante").addEventListener("click", mostrarFormularioEstudiante);
    document.getElementById("btnCancelarRegistro").addEventListener("click", ocultarFormularioEstudiante);
});

function configurarMenu() {
    const links = document.querySelectorAll(".menu a");
    const sections = document.querySelectorAll(".section");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            links.forEach(l => l.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));
            link.classList.add("active");
            document.querySelector(link.getAttribute("href")).classList.add("active");
            
           
            if (link.getAttribute("href") !== "#usuarios") {
                ocultarFormularioEstudiante();
            }
        });
    });
}

async function cargarCursos() {
    try {
        cursos = await apiCursos.obtenerCursos();
        mostrarCursos();
    } catch (error) {
        console.error("Error al cargar cursos:", error);
        mostrarCursos();
    }
}

function mostrarCursos() {
    const cont = document.getElementById("listaCursos");
    if (!cont) return;
    
    if (cursos.length === 0) {
        cont.innerHTML = "<p>No hay cursos todavía</p>";
        return;
    }

    cont.innerHTML = cursos.map(c =>
        `<div class="curso">
            <h3>${c.nombre}</h3>
            <p>${c.descripcion}</p>
            <small>${c.fechaInicio} - ${c.fechaFin}</small><br>
            <button onclick="editarCurso(${c.id})">Editar</button>
            <button onclick="eliminarCurso(${c.id})">Eliminar</button>
        </div>`
    ).join("");
}

function abrirModal() {
    if (modal) {
        modal.style.display = "block";
    }
}

function cerrarModal() {
    if (modal) {
        modal.style.display = "none";
        form.reset();
        delete form.dataset.id;
    }
}

function guardarCurso(e) {
    e.preventDefault();
    const nuevoCurso = {
        id: Date.now(),
        nombre: document.getElementById("nombreCurso").value,
        descripcion: document.getElementById("descripcionCurso").value,
        fechaInicio: document.getElementById("fechaInicio").value,
        fechaFin: document.getElementById("fechaFin").value
    };

    if (form.dataset.id) {
        const id = parseInt(form.dataset.id);
        cursos = cursos.map(c => c.id === id ? nuevoCurso : c);
    } else {
        cursos.push(nuevoCurso);
    }

    cerrarModal();
    mostrarCursos();
}

function editarCurso(id) {
    const curso = cursos.find(c => c.id === id);
    if (!curso) return;
    form.dataset.id = id;
    document.getElementById("nombreCurso").value = curso.nombre;
    document.getElementById("descripcionCurso").value = curso.descripcion;
    document.getElementById("fechaInicio").value = curso.fechaInicio;
    document.getElementById("fechaFin").value = curso.fechaFin;
    abrirModal();
}

function eliminarCurso(id) {
    if (confirm("¿Eliminar este curso?")) {
        cursos = cursos.filter(c => c.id !== id);
        mostrarCursos();
    }
}


function mostrarFormularioEstudiante() {
    const formularioEstudiante = document.getElementById("formularioEstudiante");
    if (formularioEstudiante) {
        formularioEstudiante.style.display = "block";
    }
}

function ocultarFormularioEstudiante() {
    const formularioEstudiante = document.getElementById("formularioEstudiante");
    const formulario = document.getElementById("formulario");
    
    if (formularioEstudiante) {
        formularioEstudiante.style.display = "none";
    }
    
    if (formulario) {
        formulario.reset();
        

        const grupos = document.querySelectorAll(".formulario__grupo");
        grupos.forEach(grupo => {
            grupo.classList.remove("formulario__grupo-correcto", "formulario__grupo-incorrecto");
        });
        
        const iconos = document.querySelectorAll(".formulario__validacion-estado");
        iconos.forEach(icono => {
            icono.classList.remove("fa-check-circle", "fa-times-circle");
            icono.classList.add("fa-times-circle");
        });
        
        document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
        document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const btnCambiarColor = document.getElementById('btnCambiarColor');
    const selectorColores = document.getElementById('selectorColores');
    const colorOptions = document.querySelectorAll('.color-option');
    
   
    const colorGuardado = localStorage.getItem('colorMenu');
    if (colorGuardado) {
        aplicarColor(colorGuardado);
        marcarColorActivo(colorGuardado);
    }
    
   
    btnCambiarColor.addEventListener('click', function(e) {
        e.stopPropagation();
        selectorColores.classList.toggle('mostrar');
    });
    

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            aplicarColor(color);
            marcarColorActivo(color);
            selectorColores.classList.remove('mostrar');
           
            localStorage.setItem('colorMenu', color);
        });
    });
    
  
    document.addEventListener('click', function() {
        selectorColores.classList.remove('mostrar');
    });
    
    
    selectorColores.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    function aplicarColor(color) {
        
        const header = document.querySelector('.header');
        const botones = document.querySelectorAll('button:not(.btn-color)');
        const badges = document.querySelectorAll('.badge');
        
     
        document.documentElement.style.setProperty('--color-primario', color);
        
       
        header.style.backgroundColor = color;
        
        
        botones.forEach(btn => {
            if (!btn.classList.contains('btn-color')) {
                btn.style.backgroundColor = color;
                btn.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = oscurecerColor(color, 20);
                });
                btn.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = color;
                });
            }
        });
        
    
        badges.forEach(badge => {
            badge.style.backgroundColor = color;
        });
        
    
        const ths = document.querySelectorAll('.tabla-notas th');
        ths.forEach(th => {
            th.style.backgroundColor = color;
        });
    }
    
    function marcarColorActivo(color) {
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === color) {
                option.classList.add('activo');
              
                if (!option.querySelector('.color-indicador')) {
                    const indicador = document.createElement('div');
                    indicador.className = 'color-indicador';
                    option.appendChild(indicador);
                }
            } else {
                option.classList.remove('activo');
                const indicador = option.querySelector('.color-indicador');
                if (indicador) {
                    indicador.remove();
                }
            }
        });
    }
    
    function oscurecerColor(color, porcentaje) {
   
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);
        
     
        r = Math.max(0, r - (r * porcentaje / 100));
        g = Math.max(0, g - (g * porcentaje / 100));
        b = Math.max(0, b - (b * porcentaje / 100));
        
        // Volver a hex
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    }
});