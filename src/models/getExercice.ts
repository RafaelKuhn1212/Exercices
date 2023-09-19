import { PrismaClient } from '@prisma/client'
import AppErrorConstructor from '../Errors/errorConstructor'
import getUserDifficult from './getDifficultyFromUser'
const prisma = new PrismaClient()

export default async function getExercice(name: string) {

    const user = await prisma.user.findUnique({
        where: {
            name: name
        },
        include: {
            exercisesDone: true
        }
    })

    if(!user){
        const randomExercice = await prisma.exercice.findFirst({
            orderBy: {
                id: 'desc'
            }
        })
        return randomExercice
    }else{

        const difficulty = await getUserDifficult(name)
        
        const exerciceDone = user.exercisesDone.map(exercice => exercice.id)
        const randomExercice = await prisma.exercice.findFirst({
            where: {
                id: {
                    notIn: exerciceDone
                },
                difficulty: difficulty
            },
            orderBy: {
                id: 'desc'
            }
        })
        if(!randomExercice){
            throw new AppErrorConstructor(`Parabens ${name} você fez todos exercicios <3. Jaja eu coloco mais :)`, 500)
        }
        return randomExercice
    }    

}