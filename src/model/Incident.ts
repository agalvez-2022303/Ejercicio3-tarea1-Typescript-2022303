import { Prioridad, estadoIncidente } from '../types/tipos';
export interface Incident { 
    readonly id: number; 
    titulo: string;
    descripcion: string; 
    reportadoPor: string;
    prioridad: Prioridad;
    estado: estadoIncidente;
    fechaCreacion: Date;
} 