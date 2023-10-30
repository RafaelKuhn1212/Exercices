import { Request, Response } from "express";
import getExercice from "../../models/getExercice";
import AppErrorConstructor from "../../Errors/errorConstructor";
import getUserById from "../../models/auth/getUserById";

export default async function getExerciceController(req:Request,res:Response){

    const user = await getUserById(req.user)
    
    if(user == undefined) throw new AppErrorConstructor("User not found",404)
    const response = await getExercice(user.name,req.body.language)

    if(response){
        res.status(200).json(response)
    }else{
        res.status(500).json("Internal server error")
    }

}

