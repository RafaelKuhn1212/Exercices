import AppErrorConstructor from "../../Errors/errorConstructor";
import prisma from "../../libs/prisma/prisma";

export default async function getUserById(id: string) {

    try {

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: id
        }
    })
    return user;
    }catch(err){
        console.log(err)
        throw new AppErrorConstructor("User not found",404)
    }
}