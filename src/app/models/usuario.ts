import {Encargado} from "./encargado"
import {User} from "./user"

export class Usuario {
	id: string;
	nombre: string;
	apellido: string;
	numeroDocumento: string;
	user: User;
	encargado:string[]

}
