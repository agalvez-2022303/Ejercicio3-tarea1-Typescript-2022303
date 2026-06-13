import * as readline from 'readline';
import { buscarIncidentePorId, crearIncidente, modificarIncidente } from './src/service/logica';
import { verIncidentes } from './src/function/function';
import { Prioridad, estadoIncidente, esEstadoValido, esPrioridadValida } from './src/types/tipos';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(texto, (respuesta) => {
            resolve(respuesta);
        });
    });
}

function cargarDatosDeEjemplo(): void {
    crearIncidente({
        titulo: 'El wifi no funciona',
        descripcion: 'No hay internet en la oficina',
        reportadoPor: 'Ana',
        prioridad: 'baja'
    });

    crearIncidente({
        titulo: 'Servidor caido',
        descripcion: 'La pagina no carga',
        reportadoPor: 'Carlos',
        prioridad: 'alta'
    });

    crearIncidente({
        titulo: 'Impresora rota',
        descripcion: 'La impresora hace ruido raro',
        reportadoPor: 'Luis',
        prioridad: 'media'
    });
}

async function pedirEstado(): Promise<estadoIncidente> {
    let estado = await preguntar('Estado (abierto/progreso/resuelto): ');

    while (!esEstadoValido(estado)) {
        console.log('Estado no valido. Solo: abierto, progreso o resuelto');
        estado = await preguntar('Estado (abierto/progreso/resuelto): ');
    }

    return estado;
}

async function pedirPrioridad(): Promise<Prioridad> {
    let prioridad = await preguntar('Prioridad (alta/media/baja): ');

    while (!esPrioridadValida(prioridad)) {
        console.log('Prioridad no valida. Solo: alta, media o baja');
        prioridad = await preguntar('Prioridad (alta/media/baja): ');
    }

    return prioridad;
}

async function menuCrear(): Promise<void> {
    const titulo = await preguntar('Titulo: ');
    const descripcion = await preguntar('Descripcion: ');
    const reportadoPor = await preguntar('Reportado por: ');
    const prioridad = await pedirPrioridad();

    crearIncidente({ titulo, descripcion, reportadoPor, prioridad });
    console.log('Incidente creado con estado: abierto');
    console.log('');
}

async function menuModificar(): Promise<void> {
    const idTexto = await preguntar('ID del incidente a modificar: ');
    const id = Number(idTexto);

    if (!Number.isInteger(id) || id <= 0) {
        console.log('ID no valido');
        console.log('');
        return;
    }

    const incidente = buscarIncidentePorId(id);

    if (!incidente) {
        console.log('No se encontro ese ID');
        console.log('');
        return;
    }

    const nuevoEstado = await pedirEstado();
    modificarIncidente(id, nuevoEstado);
    console.log('Estado actualizado!');
    console.log('');
}

async function menu(): Promise<void> {
    console.log('=== MENU INCIDENTES ===');
    console.log('1. Crear incidente');
    console.log('2. Ver incidentes');
    console.log('3. Modificar estado');
    console.log('4. Salir');
    console.log('');

    const opcion = await preguntar('Elige una opcion: ');

    if (opcion === '1') {
        await menuCrear();
        await menu();
    } else if (opcion === '2') {
        verIncidentes();
        await menu();
    } else if (opcion === '3') {
        await menuModificar();
        await menu();
    } else if (opcion === '4') {
        console.log('Adios!');
        rl.close();
    } else {
        console.log('Opcion no valida');
        console.log('');
        await menu();
    }
}

cargarDatosDeEjemplo();
menu();