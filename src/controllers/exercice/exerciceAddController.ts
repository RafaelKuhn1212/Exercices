import { Request, Response } from "express";
import compilerService from "../../services/compiler";

import addExercicesSchema from "../../schemas/addExercicesSchema";
import { InferType } from "yup";
import addExerciceToDB from "../../models/addExerciceToDB";
import testCasesDTO from "../../interfaces/testCasesDTO";
type body = InferType<typeof addExercicesSchema>;

//import
export async function addExercice(req: Request<{}, {}, body>, res: Response) {

    if (req.body.entries?.length === 0 || req.body.entries === undefined) {
        const compiler = new compilerService();
        const programResult = await compiler.runCode(req.body.code, req.body.entries)
        // Todos dados ja foram validados pelo schema e pelo validador lexico e sintatico do compilador

        const testCase: testCasesDTO = {
            testCases: [
                {output:programResult}
            ]
        }

        const result = await addExerciceToDB({
            statement: req.body.statement,
            code: req.body.code,
            difficulty: req.body.difficulty,
        },testCase)
        console.log(result)
        
        res.send(result)

    }else{
        
    }


}