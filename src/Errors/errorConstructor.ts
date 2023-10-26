import AppError from "../interfaces/appError";
export default class AppErrorConstructor implements AppError {

    constructor(message:string,code:number){
        if(message) this.message = message;
        else this.message = "Internal server error";
        if(code) this.code = code;
        else this.code = 500;
    }
    message: string;
    code: number;
}