import { Request,Response,NextFunction } from "express";
import AppError from "../interfaces/appError";
import AppErrorConstructor from "./errorConstructor";


export default function errorHandler(err:AppError,req:Request,res:Response,next:NextFunction){

    if(err instanceof AppErrorConstructor){
        res.status(err.code || 500).json({message:err.message})
    }
    else{
        
        res.status(500).json({message:"Internal server error"})
    }
    next()
}