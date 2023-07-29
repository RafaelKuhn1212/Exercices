import 'express-async-errors';

import express,{ Express } from "express";

import addExerciceRoute from "../routes/addExerciceRoute";
import submitExerciceRoute from "../routes/submitExerciceRoute";

import verifyPerm from "../middleware/verifyPerm"

import errorHandler from "../Errors/errorHandler";

export default function expressConfig(): Express {
    const app = express();
    //Configure to use JSON and URLENCODED
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(verifyPerm)
    //Configure routes
    app.use("/exercice",addExerciceRoute)
    app.use("/exercice",submitExerciceRoute)
    //Configure error handler
    app.use(errorHandler);

return app
}