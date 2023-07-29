import { PrismaClient } from '@prisma/client'
import AppErrorConstructor from '../Errors/errorConstructor'
const prisma = new PrismaClient()

export default async function checkIfExerciceExists(statement:string):Promise<boolean> {

try {

    const result = await prisma.exercice.findUnique({
        where:{
            statement:statement
        }
    })
    if(result === null){
        return false
    }
    return true
} catch (error) {
    throw new AppErrorConstructor("Internal Server Error",500)
}

}