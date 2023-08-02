import { Request, Response } from "express";
import compilerService from "../../services/compiler";
import randomDataGenerator from "../../functions/generateRandomData";
import addExercicesSchema from "../../schemas/addExercicesSchema";
import { InferType, array } from "yup";
import addExerciceToDB from "../../models/addExerciceToDB";
import testCasesDTO from "../../interfaces/testCasesDTO";
import checkIfExerciceExists from "../../models/checkIfExerciceExists";
import AppErrorConstructor from "../../Errors/errorConstructor";
type body = InferType<typeof addExercicesSchema>;

//import
export async function addExercice(req: Request<{}, {}, body>, res: Response) {

    if(await checkIfExerciceExists(req.body.statement)){
        throw new AppErrorConstructor('Exercice already exists', 400)
    }

    if (req.body.entries?.length === 0 || req.body.entries === undefined) {
        const compiler = new compilerService();
        const programResult = await compiler.runCode(req.body.code, req.body.entries)
        // Todos dados ja foram validados pelo schema e pelo validador lexico e sintatico do compilador

        const testCase: testCasesDTO = {
            testCases: [
                { output: programResult }
            ]
        }

        const result = await addExerciceToDB({
            statement: req.body.statement,
            code: req.body.code,
            difficulty: req.body.difficulty,
        }, testCase)

        res.send(result)

    } else {
        const compiler = new compilerService();
        //RANDOM TEST CASES
        const dataGen = new randomDataGenerator();
        const testCases: testCasesDTO = {
            testCases: []
        }

        await Promise.all(
        Array.from({ length:10 }, () => {

            return new Promise(async (resolve, reject) => {
                try {
                    const randomData = dataGen.lazyGen(req.body.entries as Array<string>)
                    const programResult = compiler.runCode(req.body.code, randomData)
                    testCases.testCases.push({
                        inputs: randomData,
                        output: await programResult
                    })
                    return resolve(true) 
                } catch (error) {
                 return reject(error)   
                }
                
            })

        })
        )

        //EDGE TEST CASES
        if (req.body.edges !== undefined) {

            for (let i = 0; i < req.body.edges.length; i++) {

                testCases.testCases.push({
                    inputs: req.body.edges[i],
                    output: await compiler.runCode(req.body.code, req.body.edges[i])
                })

            }

        }
        if (req.body.edges !== undefined) {
            const edges: Array<Array<number | string>> = req.body.edges as Array<Array<number | string>>

            const result = await addExerciceToDB({
                statement: req.body.statement,
                code: req.body.code,
                difficulty: req.body.difficulty,
                edgeCases: edges
            }, testCases)
            res.send(result)
        } else {
            const result = await addExerciceToDB({
                statement: req.body.statement,
                code: req.body.code,
                difficulty: req.body.difficulty,
            }, testCases)
            res.send(result)
        }

    }


}