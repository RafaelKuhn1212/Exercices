import { PrismaClient } from '@prisma/client'
import AppErrorConstructor from '../Errors/errorConstructor'
const prisma = new PrismaClient()

export default async function getInfoFromExercice(id: string) {
    try {

        const exercice = await prisma.exercice.findUnique({
            where: {
                id
            },
            include: {
                tests: true
            }
        })

        if(!exercice) throw new AppErrorConstructor("Exercice not found", 404)
        return exercice

    } catch (error) {
        console.log(error)
        if(error instanceof AppErrorConstructor) throw error
        throw new AppErrorConstructor("Database error", 500)

    }
        
}