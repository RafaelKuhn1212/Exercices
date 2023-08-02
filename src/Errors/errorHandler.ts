import { Request,Response,NextFunction } from "express";
import AppError from "../interfaces/appError";

export default function errorHandler(err:AppError,req:Request,res:Response,next:NextFunction){
    if(err){
        console.log(err)
        res.status(err.code || 500).json({message:err.message})
    }
    next()
}