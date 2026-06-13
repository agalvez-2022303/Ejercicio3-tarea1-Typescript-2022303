import { Incident } from '../model/Incident';
import { CrearIncidente } from '../types/tipos';

let ultimoID = 0;

export const incidentes: Incident[] = [];

export function crearIncidente(datos: CrearIncidente): Incident {
    ultimoID = ultimoID + 1;

    const nuevoIncidente: Incident = {
        id: ultimoID,
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        reportadoPor: datos.reportadoPor,
        prioridad: datos.prioridad,
        estado: datos.estado,
        fechaCreacion: new Date()
    };

    incidentes.push(nuevoIncidente);

    return nuevoIncidente;
}