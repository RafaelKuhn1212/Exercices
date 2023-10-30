import portugolTypes from "./portugolTypes";

export default interface exerciceDTO{
    statement:string,
    difficulty:number,
    language: "c"| "portugol",
}