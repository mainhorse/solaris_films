export class Pelicula{
    constructor(
        public _id : String,
        public titulo : String,
        public director : String,
        public linkTrailer : String,
        public linkPelicula : String,
        public cartelera : String,
        public sinopsis : String,
        public clasificacion : String,
        public fechaEstreno : String,
        public puntuacion : Number,
        public tiempo : String,
        public calidad : String,
        public tipo : String,
        public busqueda : String,
        public estado : Boolean  
    ){}
}