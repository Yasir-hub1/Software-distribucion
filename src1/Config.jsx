export const config = {
  BASE_URL: "http://54.89.151.2/api",
  PREVIEW_IMAGE_COMPANY: "https://ws.cotifacil.com/",
  

/*   BASE_URL: "http://192.168.0.114:8000/api",
  PREVIEW_IMAGE_COMPANY: "http://192.168.0.114:8000/",
 */
  NOMBRE_APP: "BellRouteClient",

  /* COLORES DE WORKCORP */
  COLOR_RED: "#ff3838",
  COLOR_YELOW: "#fff200",
  COLOR_BLACK: "#3d3d3d",
  COLOR_WHITE: "#fff",

  /* COLORES PARA EL TOAST */
  COLOR_SUCCESS: "#0be881",
  COLOR_ERROR: "#ff4d4d",
  COLOR_WARNING:"#ffa502",

  /* DATOS ALMACENADOS EN LOCAL STORAGE  */
  USER_TOKEN_KEY: "userToken",
  USER_KEY: "user",

  /* DATOS ALMACENADOS DE LA COMPANIA DEL USUARIO LOGUEADO  */
  USER_COMPANY:"userCompany",
  USER_CITY:"userCity",
  CUSTOMER:"customer",
  /* NAVEGACION DE AUTENTICACION */
  routes: {
    Login: "Login",
    Sign_up: "Sign_up",
    Onboarding: "Onboarding",


    /* RUTAS PARA LA NAVEGACION INTERNA DE COTIZACION */
    WebViewQuotation:"webViewQuotation",
    CreateQuotation: "createQ",
    EditQuotation:"EditQuotation",
    ListViewQuotation: "ListViewQ",
    ScreenPreviewQuote:"ScreenPreviewQuote",

   
   

    /* SPECIES */
    ViewSpecies: "ViewSpecies",
    EditViewSpecies: "EditViewSpecies",

    /* CONTACTS */
    ListViewCustomer: "ListViewC",
    CreateCustomer: "createC",
    showInfoCustomer:"showCustomer",
    EditCustomer:"editCustomer",

    /* PROFILES */
    viewProfile: "ViewProfile",
    viewInfoWorkCorp: "ViewInfoWk",
    viewUser: "viewUser",
    viewCompany: "viewCompany",
    EditViewCompany:"EditViewCompany",


    /* CARPENTRY */
    WebViewCarpentry:"webViewCarpentry",// vista de visualizar el pdf
    CreateCarpentry:"createCarpentry",// vista del formulario de registro
    EditCarpentry:"EditCarpentry",   // vista del formulario de editor
    ListViewCarpentry: "ListViewCarpentry",     // lista de carpinteria activas con filtros etc
    ScreenPreviewCarpentry:"ScreenPreviewCarpentry",  // vista para previsualizar el pdf despues de haber creado la carpinteria
   
  },

  /* opciones de de Btns  */
  COTIZACION: 1,
  CONTACTOS: 2,
  CARPINTERIA:3,

  NUM_SOPORTE: +59160095371,
  NUM_PAYMENT_SUSCRIPCION: +59160095371,
  OPT_LISTQUOTATION:4, // btn de opciones para la cotizacion
  OPT_LISTCARPENTRY:5, // btn de opciones para la carpinteria


  /* OPCIONES DE BOTONES EN LISTA DE CLIENTES */
  OPT_VIEW_CUSTOMER: 1,
  OPT_EDIT_CUSTOMER: 2,
  OPT_WH_CUSTOMER: 3,
  OPT_CALL_CUSTOMER: 4,


  /* ESTADOS  DE SUSCRIPCION  */
   NO_TIENE_PLAN_ASOCIADO:0,
  //  FINALIZACION_DE_SUSCRIPCION:0,
   TIENE_DIAS_RESTANTES:1,              //tiene dias restantes de plan
  /* OPCIONES DE TAB EN LA VISTA HOME  */
  TAB_QUOTE:0,
  TAB_CARPENTRY:1,


  /* ESTADOS PARA EL REGISTRO DE COTIZACIONES */
  MEDIDA:0, // se calcula con cant*prec* largo en metros 
  LINEAL:1,// se calcula con prec * largo -> en metros

  RIPA:0,
  LISTON:1,


   /* TIPOD DE PLANES */
   /* 
    [
              "name"=>"Free",
              "description"=>"Plan gratuito de disponibilidad de realizar 10 proformas.",
              "number_days"=>-1,
              "monthly_price" => 0
            ],
            [
              "name"=>"Mensual",
              "description"=>"Plan de 30 dias con proformas sin limite.",
              "number_days"=>30,
              "monthly_price" => 50
            ]
   */

};
