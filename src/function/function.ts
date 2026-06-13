import { Incident } from '../model/Incident';
import { incidentes } from '../service/logica';

export function verIncidentes(): void {
    const alta: Incident[] = [];
    const media: Incident[] = [];
    const baja: Incident[] = [];

    for (let i = 0; i < incidentes.length; i++) {
        if (incidentes[i].prioridad === 'alta') {
            alta.push(incidentes[i]);
        } else if (incidentes[i].prioridad === 'media') {
            media.push(incidentes[i]);
        } else {
            baja.push(incidentes[i]);
        }
    }

    const ordenados = alta.concat(media, baja);

    console.log('=== INCIDENCIAS ORDENADAS POR PRIORIDAD ===');
    console.log('');

    for (let j = 0; j < ordenados.length; j++) {
        const inc = ordenados[j];
        console.log('ID: ' + inc.id);
        console.log('Titulo: ' + inc.titulo);
        console.log('Descripcion: ' + inc.descripcion);
        console.log('Reportado por: ' + inc.reportadoPor);
        console.log('Prioridad: ' + inc.prioridad);
        console.log('Estado: ' + inc.estado);
        console.log('Fecha creacion: ' + inc.fechaCreacion);
        console.log('-------------------');
    }
}