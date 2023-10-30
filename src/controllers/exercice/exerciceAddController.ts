import { Request, Response } from "express";
import compilerServicePORTUGOL from "../../services/compiler";
import CompilerServiceC from "../../services/c-compiler";

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
    let compiler: CompilerServiceC | compilerServicePORTUGOL

    if(req.body.language == "c"){
        compiler = new CompilerServiceC()
    }else{
        compiler = new compilerServicePORTUGOL()
    }

    //GENERATE RANDOM tests
    if (genRandomData) {

        if (entries?.length == 0) {
            const programResult = await compiler.runCode(code as string, entries)
            // Todos dados ja foram validados pelo schema e pelo validador lexico e sintatico do compilador
            testCases.testCases.push({ output: programResult })

        } else {
            const dataGen = new randomDataGenerator();
            await Promise.all(
                Array.from({ length: 10 }, () => {

                    return new Promise(async (resolve, reject) => {
                        try {
                            const randomData = dataGen.lazyGen(entries as Array<string>, req.body.language)
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
            language: req.body.language as "c" | "portugol",
        }, testCases)
        
        res.status(201).json(result)
    } catch (error) {
        throw new AppErrorConstructor("Internal server error", 500)
    }

}