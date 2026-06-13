import { Incident } from '../model/Incident';
import { CrearIncidente, estadoIncidente } from '../types/tipos';

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
        estado: 'abierto',
        fechaCreacion: new Date()
    };

    incidentes.push(nuevoIncidente);

    return nuevoIncidente;
}

export function buscarIncidentePorId(id: number): Incident | undefined {
    for (let i = 0; i < incidentes.length; i++) {
        if (incidentes[i].id === id) {
            return incidentes[i];
        }
    }
    return undefined;
}

export function modificarIncidente(id: number, nuevoEstado: estadoIncidente): boolean {
    for (let i = 0; i < incidentes.length; i++) {
        if (incidentes[i].id === id) {
            incidentes[i].estado = nuevoEstado;
            return true;
        }
    }
    return false;
}