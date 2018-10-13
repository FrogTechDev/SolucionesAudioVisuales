export class User {
    constructor(
        public UsuarioId: number,
        public Nombre: string,
        public Usuario: string,
        public Password: string,
        public Correo: string,
        public IsActivo: boolean
    ) {}
}
