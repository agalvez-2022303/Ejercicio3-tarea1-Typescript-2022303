import * as readline from 'readline';
import { crearIncidente, modificarIncidente } from './src/service/logica';
import { verIncidentes } from './src/function/function';
import { Prioridad, estadoIncidente } from './src/types/tipos';

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
        prioridad: 'baja',
        estado: 'abierto'
    });

    crearIncidente({
        titulo: 'Servidor caido',
        descripcion: 'La pagina no carga',
        reportadoPor: 'Carlos',
        prioridad: 'alta',
        estado: 'abierto'
    });

    crearIncidente({
        titulo: 'Impresora rota',
        descripcion: 'La impresora hace ruido raro',
        reportadoPor: 'Luis',
        prioridad: 'media',
        estado: 'abierto'
    });
}

async function menuCrear(): Promise<void> {
    const titulo = await preguntar('Titulo: ');
    const descripcion = await preguntar('Descripcion: ');
    const reportadoPor = await preguntar('Reportado por: ');
    const prioridad = await preguntar('Prioridad (alta/media/baja): ') as Prioridad;
    const estado = await preguntar('Estado (abierto/progreso/resuelto): ') as estadoIncidente;

    crearIncidente({ titulo, descripcion, reportadoPor, prioridad, estado });
    console.log('Incidente creado!');
    console.log('');
}

async function menuModificar(): Promise<void> {
    const idTexto = await preguntar('ID del incidente a modificar: ');
    const id = Number(idTexto);
    const nuevoEstado = await preguntar('Estado (abierto/progreso/resuelto): ') as estadoIncidente;
    const modificado = modificarIncidente(id, nuevoEstado);

    if (modificado) {
        console.log('Estado actualizado!');
    } else {
        console.log('No se encontro ese ID');
    }
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