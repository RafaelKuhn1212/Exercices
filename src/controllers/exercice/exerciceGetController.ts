import { Request, Response } from "express";
import getExercice from "../../models/getExercice";
import { PrismaClient } from "@prisma/client";
import AppErrorConstructor from "../../Errors/errorConstructor";

const prisma = new PrismaClient()
export default async function getExerciceController(req:Request,res:Response){
    
    const user = await prisma.user.findUnique({
        where:{
            id: req.body.userId
        }
    })
    if(user == undefined) throw new AppErrorConstructor("User not found",404)
    const response = await getExercice(user.name)

    if(response){
        res.status(200).json(response)
    }else{
        res.status(500).json("Internal server error")
    }

}

