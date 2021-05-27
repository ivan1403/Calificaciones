export class Proceso
{
    idTarea:number; 
    idCondicion:number;
    descripcionCondicion:string;
    comentario:string;
    frecuencia:string;
    fechaInicio:Date;
    horaInicio:Date;
    horaFin:Date;
    repetirHora:number;
    repetirDia:number;
    repetirDiaMes:number;
    ultimaEjecucion:Date;
    usuarioInsert:string;
    usuarioModifica:string;
    usuarioBaja:string;
    fechaInsert:Date;
    fechaModifica:Date;
    fechaBaja:Date
    estatus:boolean;
    diasSemana:string;
}