import { tiposPortugol } from "@prisma/client";
import portugolTypes from "./portugolTypes";

export default interface exerciceDTO{
    statement:string,
    difficulty:number,
    code:string,
    edgeCases?:Array<Array<number|string>>,
    entries?:tiposPortugol[],

}