const apiCursos = {
    async obtenerCursos() {
  
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, nombre: "HTML Básico", descripcion: "Introducción a HTML", fechaInicio: "2024-01-10", fechaFin: "2024-02-10" },
                    { id: 2, nombre: "JavaScript para Principiantes", descripcion: "Aprende lógica básica", fechaInicio: "2024-02-15", fechaFin: "2024-04-15" }
                ]);
            }, 500);
        });
    }
};