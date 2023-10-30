import express from "express";
import validateBody from "../../middleware/validateBody";
import getExerciceSchema from "../../schemas/getExercicesSchema";
import getExerciceController from "../../controllers/exercice/exerciceGetController";
const Router = express.Router();

Router.post("/",validateBody(getExerciceSchema),getExerciceController)

export default Router;