import 'express-async-errors';

import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../swagger.json";

import path from "path";

import cors from "cors";

import exerciceRoutes from "../routes/exercice/index";
import authRoutes from "../routes/auth/index";

import verifyPerm from "../middleware/verifyPerm"
import errorHandler from "../Errors/errorHandler";
import validateJWT from '../middleware/validateJWT';

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

    app.get("/login", (req, res) => {
        res.sendFile("R:\\AutomaticProjects\\Exercices\\frontend\\auth\\login\\index.html")
    })
    app.get("/signup", (req, res) => {
        res.sendFile("R:\\AutomaticProjects\\Exercices\\frontend\\auth\\signup\\index.html")
    })
    
    app.use("/auth", authRoutes.signUpRoute)
    app.use("/auth", authRoutes.loginRoute)
    app.use("/auth", authRoutes.checkTokenRoute)    

    app.use(validateJWT)
    app.use(verifyPerm)

    app.use("/exercice", exerciceRoutes.updateExerciceRoute)
    app.use("/exercice", exerciceRoutes.addExerciceRoute)
    app.use("/exercice", exerciceRoutes.submitExerciceRoute)
    app.use("/exercice", exerciceRoutes.getExerciceRoute)
    app.use("/exercice", exerciceRoutes.deleteExerciceRoute)
    app.use("/exercice", exerciceRoutes.listExerciceRoute)

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(express.static(path.join(__dirname,'public')))

    app.use(errorHandler);

    return app
}