
import exerciceDTO from "../interfaces/exerciceDTO";
import testCasesDTO from "../interfaces/testCasesDTO";
import checkIfExerciceExists from './checkIfExerciceExists';
import AppErrorConstructor from '../Errors/errorConstructor';
import prisma from "../libs/prisma/prisma";

export default async function addExerciceToDB(exercice:exerciceDTO,testCases:testCasesDTO){

try {

    if(await checkIfExerciceExists(exercice.statement)){
        throw new AppErrorConstructor("Exercice with same statement already exists",400)
    }
    const result = await prisma.exercice.create({
        data:{
            statement:exercice.statement,
            difficulty:exercice.difficulty,
            tests:{
                
                create:testCases.testCases.map(testCase => {
                    return {
                        input:{
                            set:testCase.inputs || []
                        },
                        output:testCase.output
                    }
                })

            }
        },
        include:{
            tests:true
        }
    })

    if(!result){
        throw new AppErrorConstructor("Internal Server Error",500)
    }
    return result

} catch (error) {
    
    if(error instanceof AppErrorConstructor){
        throw error
    }
    throw new AppErrorConstructor("Internal Server Error",500)
}


}