import { Incident } from '../model/Incident';
export type Prioridad = 'alta' | 'media' | 'baja';
export type estadoIncidente = 'abierto' | 'progreso' | 'resuelto';
export type CrearIncidente = Omit<Incident, 'id' | 'fechaCreacion'>;