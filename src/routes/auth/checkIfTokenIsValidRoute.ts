import express from "express";
import checkIfTokenIsValidController from "../../controllers/auth/checkIfTokenIsValidController";
import validateBody from "../../middleware/validateBody";
import checkTokenSchema from "../../schemas/checkTokenSchema";

const Router = express.Router()

Router.post("/",validateBody(checkTokenSchema),checkIfTokenIsValidController)

export default Router 