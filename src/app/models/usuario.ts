import {Encargado} from "./encargado"

export class Usuario {
	Identificador: string;
	nombre: string;
	apellido: string;
	numeroDocumento: string;
    fechaNacimiento: Date;
    encargado: Encargado[]
            
}
