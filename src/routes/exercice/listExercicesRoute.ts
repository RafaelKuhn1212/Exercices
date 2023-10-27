import express from "express";
import listExerciceController from "../../controllers/exercice/exerciceListAllController";

const Router = express.Router();

Router.get("/list",listExerciceController)

export default Router;