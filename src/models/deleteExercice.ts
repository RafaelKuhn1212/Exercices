import { PrismaClient } from '@prisma/client'
import AppErrorConstructor from '../Errors/errorConstructor'
const prisma = new PrismaClient()

export default async function deleteExercice(id: string) {
    
    const exercice = await prisma.exercice.findUnique({
        where:{
            id
        }
    })
    if(!exercice) throw new AppErrorConstructor("Exercice not found",404)

    const exerciceDelete = prisma.exercice.delete({
        where:{
            id
        }
    })

    const testsToDelete = prisma.tests.deleteMany({
        where:{
            exerciseId:id
        }
    })

    await prisma.$transaction([testsToDelete, exerciceDelete])
    
    return true

}