import express from "express"
const Router = express.Router()

import updateExerciceSchema from "../../schemas/updateExerciceSchema"
import validateBody from "../../middleware/validateBody"
import updateExerciceController from "../../controllers/exercice/exerciceUpdateController"

Router.put("/update",validateBody(updateExerciceSchema),updateExerciceController)

export default Router