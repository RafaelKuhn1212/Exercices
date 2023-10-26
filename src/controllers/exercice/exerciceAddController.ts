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
    if (await checkIfExerciceExists(req.body.statement)) {
        throw new AppErrorConstructor('Exercice already exists', 400)
    }

    const { genRandomData, ioData, entries, code } = req.body;
    let testCases: testCasesDTO = {
        testCases: []
    }
    //GENERATE RANDOM tests
    if (genRandomData) {

        if (entries?.length == 0) {
            const compiler = new compilerService();
            const programResult = await compiler.runCode(code as string, entries)
            // Todos dados ja foram validados pelo schema e pelo validador lexico e sintatico do compilador
            testCases.testCases.push({ output: programResult })

        } else {
            const compiler = new compilerService();
            const dataGen = new randomDataGenerator();
            await Promise.all(
                Array.from({ length: 10 }, () => {

                    return new Promise(async (resolve, reject) => {
                        try {
                            const randomData = dataGen.lazyGen(entries as Array<string>)
                            const programResult = compiler.runCode(code as string, randomData)
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

        }

    }

    //USE PROVIDED TESTS
    if (ioData) {
        testCases.testCases.push(...ioData)
    }

    try {

        const result = await addExerciceToDB({
            difficulty: req.body.difficulty,
            statement: req.body.statement,
        }, testCases)
        
        res.status(201).json(result)
    } catch (error) {
        throw new AppErrorConstructor("Internal server error", 500)
    }

}