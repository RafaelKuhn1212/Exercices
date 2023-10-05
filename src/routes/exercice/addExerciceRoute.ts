import express from "express";
const Router = express.Router();
import { addExercice } from "../../controllers/exercice/exerciceAddController";
//Validate body
import validateBody from "../../middleware/validateBody";
import addExerciceSchema from "../../schemas/addExercicesSchema";

Router.post("/add",validateBody(addExerciceSchema),addExercice)

export default Router;