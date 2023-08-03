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
    console.log(req.body)
    if (await checkIfExerciceExists(req.body.statement)) {
        throw new AppErrorConstructor('Exercice already exists', 400)
    }

    const { randomTestCases, genRandomData, ioData } = req.body;

    //GENERATE IO tests

    if (genRandomData) {

        if (randomTestCases.entries?.length == 0) {
            const compiler = new compilerService();
            const programResult = await compiler.runCode(randomTestCases.code, randomTestCases.entries)
            // Todos dados ja foram validados pelo schema e pelo validador lexico e sintatico do compilador

            const testCase: testCasesDTO = {
                testCases: [
                    { output: programResult }
                ]
            }

            if (ioData) {
    
                ioData.forEach(test => {
                    testCase.testCases.push({
                        inputs: test.inputs,
                        output: test.output
                    })
                })

            }

            const result = await addExerciceToDB({
                statement: req.body.statement,
                code: randomTestCases.code,
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

            if (ioData) {
    
                ioData.forEach(test => {
                    testCases.testCases.push({
                        inputs: test.inputs,
                        output: test.output
                    })
                })

            }

            await Promise.all(
                Array.from({ length: 10 }, () => {

                    return new Promise(async (resolve, reject) => {
                        try {
                            const randomData = dataGen.lazyGen(randomTestCases.entries as Array<string>)
                            const programResult = compiler.runCode(randomTestCases.code, randomData)
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
            const result = await addExerciceToDB({
                statement: req.body.statement,
                code: randomTestCases.code,
                difficulty: req.body.difficulty,
            }, testCases)
            res.send(result)
        }

    }


}