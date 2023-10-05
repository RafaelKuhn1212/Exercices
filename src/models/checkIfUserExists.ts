import prisma from "../libs/prisma/prisma";


export const checkIfUserExists = async (name:string) => {
    const user = await prisma.user.findUnique({
        where: {
            name: name
        }
    })

    if(user) return true
    else return false
}
