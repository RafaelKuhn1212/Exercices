import { compare } from "bcrypt";
import AppErrorConstructor from "../../Errors/errorConstructor";

import prisma from "../../libs/prisma/prisma";

export default async function login(user:string,pass:string){

    const userData = await prisma.user.findUnique({
        where:{
            name:user
        }
    })
    if(!userData) throw new AppErrorConstructor("User not found",404)

    const passwordMatch = await compare(pass,userData.password)
    if(!passwordMatch) throw new AppErrorConstructor("Password does not match",401)
    return userData
}   