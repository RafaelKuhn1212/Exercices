import AppErrorConstructor from '../Errors/errorConstructor'
import prisma from "../libs/prisma/prisma";

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
        
        if(error instanceof AppErrorConstructor) throw error
        throw new AppErrorConstructor("Database error", 500)

    }
        
}