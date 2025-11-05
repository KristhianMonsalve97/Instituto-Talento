document.addEventListener("DOMContentLoaded", function() {
 
    const $formulario = document.getElementById("formulario");
    if (!$formulario) return;

    const $inputs = document.querySelectorAll("#formulario input");

    
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // AQUI ACEPTARA LETRAS CON O SIN ACENTO Y ESPACIOS
        direccion: /^[a-zA-ZÀ-ÿ\s0-9.,-]{5,60}$/, // ACEPTA LETRAS, NÚMEROS Y ESPACIOS
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // ACEPTA DE TODO MENOS CARACTERES ESPECIALES
        telefono: /^\d{10}$/ // ACEPTARA EXACTAMENTE 10 NÚMEROS
    };

   
    const campos = {
        nombre: false,
        direccion: false,
        correo: false,
        telefono: false
    };

  
    const validarFormulario = (e) => {
        switch(e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, "nombre");
                break;
            case "direccion":
                validarCampo(expresiones.direccion, e.target, "direccion");
                break;
            case "correo":
                validarCampo(expresiones.correo, e.target, "correo");
                break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, "telefono");
                break;
        }
    };

    
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)){
            document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
            document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
            document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
            document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
            document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
            document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
            document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
            campos[campo] = false;
        }
    };

   
    $inputs.forEach((input) => {
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
    });

    
    $formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const $terminos = document.getElementById("terminos");
        if(campos.nombre && campos.direccion && campos.correo && campos.telefono && $terminos.checked) {
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
            
            setTimeout(() => {
                document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            }, 3000);
            
           
            setTimeout(() => {
                const formularioEstudiante = document.getElementById("formularioEstudiante");
                if (formularioEstudiante) {
                    formularioEstudiante.style.display = "none";
                }
                $formulario.reset();
                
              
                const grupos = document.querySelectorAll(".formulario__grupo");
                grupos.forEach(grupo => {
                    grupo.classList.remove("formulario__grupo-correcto", "formulario__grupo-incorrecto");
                });
                
                const iconos = document.querySelectorAll(".formulario__validacion-estado");
                iconos.forEach(icono => {
                    icono.classList.remove("fa-check-circle", "fa-times-circle");
                    icono.classList.add("fa-times-circle");
                });
                
            
                campos.nombre = false;
                campos.direccion = false;
                campos.correo = false;
                campos.telefono = false;
            }, 3000);
            
        } else {
            document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
            setTimeout(() => {
                document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            }, 3000);
        }
    });
});