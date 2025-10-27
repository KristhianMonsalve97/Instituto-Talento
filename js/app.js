
let cursos = [];
let modal = document.getElementById("modal");
let form = document.getElementById("formCurso");

document.addEventListener("DOMContentLoaded", () => {
    cargarCursos();
    configurarMenu();
    form.addEventListener("submit", guardarCurso);
    document.getElementById("btnCancelar").addEventListener("click", cerrarModal);
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
        });
    });
}

async function cargarCursos() {
    cursos = await apiCursos.obtenerCursos();
    mostrarCursos();
}

function mostrarCursos() {
    const cont = document.getElementById("listaCursos");
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
    modal.style.display = "block";
}

function cerrarModal() {
    modal.style.display = "none";
    form.reset();
    delete form.dataset.id;
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
