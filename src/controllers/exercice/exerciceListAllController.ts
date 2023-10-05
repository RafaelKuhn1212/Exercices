import { Request,Response } from "express";
import listAllExercices from "../../models/listAllExercices";

export default async function listExerciceController(req:Request,res:Response){

res.status(200).json(await listAllExercices())

}