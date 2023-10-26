import { Request, Response } from "express";
import updateExercice from "../../models/updateExercice";

import { InferType } from "yup";
import updateExerciceSchema from "../../schemas/updateExerciceSchema";

type updateExerciceType = InferType<typeof updateExerciceSchema>

export default async function updateExerciceController(req:Request<{},{},updateExerciceType>,res:Response) {

const exercice = await updateExercice({
    id: req.body.exerciceId,
    statement: req.body.statement,
    difficulty: req.body.difficulty,
    tests: req.body.tests
})
res.status(200).json(exercice)

}