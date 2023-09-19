import express from "express";
import getExercice from "../../controllers/exercice/exerciceGetController";
const Router = express.Router();

Router.get("/",getExercice)

export default Router;