import Base from "./Base";

export default class Categoria extends Base {
    denominacion:string = "";
    subCategorias:Categoria[] = [];
}