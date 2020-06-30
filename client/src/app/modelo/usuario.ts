export class Usuario{
    constructor(
        public _id : String,
        public imagen : String,
        public nombre : String,
        public apellido : String,
        public correo : String,
        public contrasena : String,
        public rol : String,
        public compras : [],
        public direccion : String,
        public celular : Number,
        public suscripcion : String,
        public estado : Boolean
    ){ }
}