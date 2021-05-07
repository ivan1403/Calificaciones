export class Paginador{
    current_page:number;
    first_page_url:string;
    from:number;
    last_page:number;
    last_page_url:string;
    next_page_url:string;
    path:string;
    per_page:number;
    prev_page_url:string;
    to:number;
    total:number;
    paginas:number[];

    maxPage:number=3;
    MostrarPaginacion:boolean=false;
    MostrarSinResultados: boolean;
     CalcularPaginas(obj:any):void
        {

            ///Toma la configuraciond e la paginacion desde el modelo recibido
            this.from = obj.from;
            this.per_page = obj.per_page;
            this.to = obj.to;
            this.total = obj.totalRegistros;
            this.last_page = obj.paginas;
            this.current_page = obj.pagina;

            let intPaginaInicial = 1;
            let intPaginasTotales = 1;

            //Caso 1.- Solo es una pagina, entonces no se crea la paginacion
            if (this.last_page > 1)
            {


                let intTotal = this.current_page / this.maxPage;

                intPaginaInicial =Math.floor(intTotal) * this.maxPage;

                if (intPaginaInicial == 0) intPaginaInicial = 1;

                if ((intPaginaInicial + this.maxPage) > this.last_page)
                {
                    intPaginasTotales = this.last_page;
                }
                else
                {
                    intPaginasTotales = intPaginaInicial + this.maxPage;
                }

                this.MostrarPaginacion = true;
                this.AgreagarPaginas(intPaginaInicial, intPaginasTotales);


            }
            else
            {
                this.MostrarPaginacion = false;
            }
        }

        AgreagarPaginas( intPaginaInicial, intTotalPaginas):void
        {

            if (!(intPaginaInicial == 1 && intTotalPaginas == 1))
            {
                if (intPaginaInicial >= 10)
                {
                    intPaginaInicial = intPaginaInicial - 1;
                    if (intTotalPaginas <  this.last_page) intTotalPaginas = intTotalPaginas + 1;
                }
                this.MostrarPaginacion = true;
                this.paginas = [];
                for (let i = intPaginaInicial; i <= intTotalPaginas; i++)
                {
                    this.paginas.push(i);
                }
            }

            else
            {
                this.MostrarPaginacion = false;
            }
        }


        inicializar(existeOtraPagina: boolean, paginaActual: number) {

          if (existeOtraPagina || (!existeOtraPagina && paginaActual > 1)) {

            this.paginas = [];
            this.paginas.push(paginaActual);
            this.MostrarPaginacion = true;
            this.current_page = paginaActual;
            if (existeOtraPagina) {
              this.last_page = paginaActual + 1;
            } else {
              this.last_page = paginaActual;
            }
            this.MostrarSinResultados = false;
          }
          else {
            this.MostrarPaginacion = false;
            this.MostrarSinResultados = false;
          }
        }

}
