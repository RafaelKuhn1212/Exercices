import express from 'express';
import validateBody from '../../middleware/validateBody';

import deleteExerciceSchema from '../../schemas/deleteExerciceSchema';
import deleteExerciceController from '../../controllers/exercice/exerciceDeleteController';

const Router = express.Router();

Router.delete('/delete',validateBody(deleteExerciceSchema),deleteExerciceController)

export default Router;