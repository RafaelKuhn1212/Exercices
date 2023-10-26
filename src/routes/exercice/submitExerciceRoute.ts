import express from "express";
const Router = express.Router();

//Validate body
import validateBody from "../../middleware/validateBody";
import submitExercicesSchema from "../../schemas/submitExerciceSchema";
import submitExercice from "../../controllers/exercice/exerciceSubmitController";

Router.post("/submit",validateBody(submitExercicesSchema),submitExercice)

export default Router;