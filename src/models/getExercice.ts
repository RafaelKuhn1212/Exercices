import prisma from "../libs/prisma/prisma";
import AppErrorConstructor from '../Errors/errorConstructor'
import getUserDifficult from './getDifficultyFromUser'

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

        if(difficulty == 6){
            const randomExercice = await prisma.exercice.findMany()
            return randomExercice[Math.floor(Math.random() * randomExercice.length)]
        }

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
        
        return randomExercice
    }    

}