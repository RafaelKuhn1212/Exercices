import { Request, Response } from "express";
import getExercice from "../../models/getExercice";

export default async function getExerciceController(req:Request,res:Response){
    if(req.headers["name"] == null || req.headers["name"] == undefined) {

        return res.status(500).send({message: 'Voce nao esta logado'})

    }

    res.send(await getExercice(req.headers["name"] as string))
    

}

