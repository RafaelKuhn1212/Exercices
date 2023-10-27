import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function checkIfTokenIsValidController(req:Request,res:Response){

    try {
        await jwt.verify(req.body.token, process.env.JWT_SECRET)
        res.status(200).json({message:"Token is valid",valid:true})
    } catch (error) {
        res.status(401).json({message:"Token is not valid",valid:false})
    }

}