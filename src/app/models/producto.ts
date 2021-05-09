export class Producto {
  constructor(
    public producto: string,
    public categoria: string,
    public ubicacion: string,
    public precio: number,
    public _id?: string
  ) {}
}
