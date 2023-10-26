import express from "express"
import validateBody from "../../middleware/validateBody"
import loginSchema from "../../schemas/loginSchema"
import loginController from "../../controllers/auth/loginController"
const Router = express.Router()

Router.post("/login",validateBody(loginSchema),loginController)

export default Router