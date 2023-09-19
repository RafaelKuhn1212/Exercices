import 'express-async-errors';

import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../swagger.json";

import cors from "cors";

import exerciceRoutes from "../routes/exercice/index";
import loginRoute from '../routes/auth/loginRoute';

import verifyPerm from "../middleware/verifyPerm"
import errorHandler from "../Errors/errorHandler";
import validateJWT from '../middleware/validateJWT';
import signUpRoute from '../routes/auth/signUpRoute';



export default function expressConfig(): Express {
    const app = express();
    //Configure to use JSON and URLENCODED
    app.use(cors(
        {
            origin: '*'
        }
    ));


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    
    //Configure routes

    app.get("/", (req, res) => {
        res.sendFile("R:\\AutomaticProjects\\Exercices\\frontend\\index.html")
    })
    
    app.use("/auth", signUpRoute)
    app.use("/auth", loginRoute)    

    app.use(validateJWT)
    app.use(verifyPerm)

    app.use("/exercice", exerciceRoutes.updateExerciceRoute)
    app.use("/exercice", exerciceRoutes.addExerciceRoute)
    app.use("/exercice", exerciceRoutes.submitExerciceRoute)
    app.use("/exercice", exerciceRoutes.getExerciceRoute)
    app.use("/exercice", exerciceRoutes.deleteExerciceRoute)
    app.use("/exercice", exerciceRoutes.listExerciceRoute)

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(errorHandler);

    return app
}