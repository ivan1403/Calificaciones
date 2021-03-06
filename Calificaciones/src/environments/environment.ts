// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  // urlApiContabilidad: '/ApiContabilidad/api/',
  urlApiContabilidad: 'http://localhost:59514/api/',
  urlApiConfReglasNegocio: 'http://localhost:65137/api/',
  urlApiGeneral: 'https://localhost:44327/api/',
  URL_INFORMATICA_INFERPAPI001: 'https://localhost:44304/api/',
  version: '21.03.29.1',
  urlWebContabilidad: 'http://localhost:4201/',
  urlVerDetalles: 'http://25.78.92.29/ReportServer_SQLEXPRESS/Pages/ReportViewer.aspx?%2fContabilidad%2fADMCONT005RS&rs:Command=Render&DoctoOrigen=',
  urlProcesoVerlog:''
};
