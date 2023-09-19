import express from 'express';
import validateBody from '../../middleware/validateBody';
import signUpSchema from '../../schemas/signUpSchema';
import signUpController from '../../controllers/auth/signUpController';
const Router = express.Router();

Router.post('/signUp', validateBody(signUpSchema),signUpController)

export default Router;
