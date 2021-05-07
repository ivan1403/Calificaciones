export class PaginadorFiltros {
    constructor() {
        this.pagina = 0;
        this.rpp = 0;
        this.columnaOrdenamiento = '';
        this.columnaDireccion = '';
    }
    pagina: number;
    rpp: number;
    columnaOrdenamiento: string;
    columnaDireccion: string;
}