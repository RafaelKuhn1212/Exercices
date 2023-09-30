import prisma from "../libs/prisma/prisma";


export default async function getUserDifficult(name: string){

    let exercicesDifficultyOne = await prisma.exercice.findMany({
        where: {
            difficulty: 1
        },
        select: {
        doneBy: true
        }
    })

    exercicesDifficultyOne = exercicesDifficultyOne.filter(exercice => {
        
        for(let i = 0; i < exercice.doneBy.length; i++){
            if(exercice.doneBy[i].name == name){
                return false
            }
        }
        return true
    })

    let exercicesDifficultyTwo = await prisma.exercice.findMany({
        where: {
            difficulty: 2
        },
        select: {
            doneBy: true
        }
    })

    exercicesDifficultyTwo = exercicesDifficultyTwo.filter(exercice => {
        
        for(let i = 0; i < exercice.doneBy.length; i++){
            if(exercice.doneBy[i].name == name){
                return false
            }
        }
        return true
    })

    let exercicesDifficultyThree = await prisma.exercice.findMany({
        where: {
            difficulty: 3
        },
        select: {
            doneBy: true
        }
    })

    exercicesDifficultyThree = exercicesDifficultyThree.filter(exercice => {
        
        for(let i = 0; i < exercice.doneBy.length; i++){
            if(exercice.doneBy[i].name == name){
                return false
            }
        }
        return true
    })

    let exercicesDifficultyFour = await prisma.exercice.findMany({
        where: {
            difficulty: 4
        },
        select: {
            doneBy: true
        }
    })
    
    exercicesDifficultyFour = exercicesDifficultyFour.filter(exercice => {
        
        for(let i = 0; i < exercice.doneBy.length; i++){
            if(exercice.doneBy[i].name == name){
                return false
            }
        }
        return true
    })

    let exercicesDifficultyFive = await prisma.exercice.findMany({
        where: {
            difficulty: 5
        },
        select: {
            doneBy: true
        }
    })

    exercicesDifficultyFive = exercicesDifficultyFive.filter(exercice => {
        
        for(let i = 0; i < exercice.doneBy.length; i++){
            if(exercice.doneBy[i].name == name){
                return false
            }
        }
        return true
    })

    if(exercicesDifficultyOne.length != 0){
        return 1
    }else{
        if(exercicesDifficultyTwo.length != 0){
            return 2
        }else{
            if(exercicesDifficultyThree.length != 0){
                return 3
            }else{
                if(exercicesDifficultyFour.length != 0){
                    return 4
                }else{
                    if(exercicesDifficultyFive.length != 0){
                        return 5
                    }else{
                        return 6
                    }
                }
            }
        }
    }
    

}