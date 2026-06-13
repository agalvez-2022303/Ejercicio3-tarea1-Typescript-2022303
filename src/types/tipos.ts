import { Incident } from '../model/Incident';
export type Prioridad = 'alta' | 'media' | 'baja';
export type estadoIncidente = 'abierto' | 'progreso' | 'resuelto';
export type CrearIncidente = Omit<Incident, 'id' | 'fechaCreacion'>;

export function esEstadoValido(valor: string): valor is estadoIncidente {
    if (valor === 'abierto') {
        return true;
    }
    if (valor === 'progreso') {
        return true;
    }
    if (valor === 'resuelto') {
        return true;
    }
    return false;
}

export function esPrioridadValida(valor : string) : valor is Prioridad {
    if (valor === 'alta' || valor === 'media' || valor === 'baja') {
        return true;
    }
    return false;
}