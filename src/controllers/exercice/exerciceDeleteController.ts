import { Request,Response } from "express";
import deleteExercice from "../../models/deleteExercice";

import { InferType } from "yup";
import deleteExerciceSchema from "../../schemas/deleteExerciceSchema";

type ReqBody = InferType<typeof deleteExerciceSchema>

export default async function deleteExerciceController(req:Request<{},{},ReqBody>,res:Response){

if(await deleteExercice(req.body.exerciceId)){
    res.status(204).send({
        message: "Exercice deleted"
    })
}

}