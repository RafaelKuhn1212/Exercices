import { Request, Response } from "express";

import validateCode from "../../functions/validateCode";

import { InferType } from "yup";
import submitExercicesSchema from "../../schemas/submitExerciceSchema";
import AppErrorConstructor from "../../Errors/errorConstructor";
import { userPass } from "../../models/userPass";
type body = InferType<typeof submitExercicesSchema>;

export default async function submitExercice(req: Request<{}, {}, body>, res: Response) {

const validate = await validateCode(req.body.exerciceId, req.body.code)

if(validate.error instanceof AppErrorConstructor) return Promise.reject(new AppErrorConstructor(validate.error.message, 500))
else{

    if(validate.passed == false) return Promise.reject(new AppErrorConstructor(`Erro no teste ${validate.error?.errorOn} do seu programa da resolucao: Esperado ${validate.error?.expected} mas obteve ${validate.error?.got}`,500))
    if(validate.passed == true) {

        userPass(req.body.name, req.body.exerciceId)

        return res.status(200).json({message: 'Parabens, voce passou em todos os testes!'})

    }

}

}