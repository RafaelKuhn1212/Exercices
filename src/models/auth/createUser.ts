import { PrismaClient } from "@prisma/client";
import AppErrorConstructor from "../../Errors/errorConstructor";
import { checkIfUserExists } from "../checkIfUserExists";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";

export default async function createUser(name:string,pass:string){

    if(await checkIfUserExists(name)) throw new AppErrorConstructor("User already exists",409);
    
    const user = await prisma.user.create({
        data:{
            name,
            password:bcrypt.hashSync(pass,10),
            role:{
                connectOrCreate:{
                    where:{
                        name:process.env.DEFAULT_ROLE
                    },
                    create:{
                        name:process.env.DEFAULT_ROLE as string,
                        routesAllow:{
                            set:[
                                //Default permissions
                                "exercice",
                                "exercicesubmit"
                            ]
                        }
                    }
                }
            }
        }
    });
    if(user) return user;
    else throw new AppErrorConstructor("User not created",500)

}