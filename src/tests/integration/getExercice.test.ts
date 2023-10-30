import { afterEach, beforeEach, expect, it } from "vitest";
import getInfo from "../functions/getUserAndJWT";
import supertest from "supertest";

import app from "../../config/expressConfig"
import setPermToUser from "../functions/setPermToUser";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import getRandomSupportedLanguage from "../functions/getRandomSupportedLanguage";

const request = supertest(app())

const prisma = new PrismaClient()

beforeEach(async () => {

    await prisma.user.deleteMany()
    await prisma.tests.deleteMany()
    await prisma.$transaction([prisma.exercice.deleteMany(),prisma.role.deleteMany()])
    
})

afterEach(async () => {

await prisma.user.deleteMany()
await prisma.tests.deleteMany()
await prisma.$transaction([prisma.exercice.deleteMany(),prisma.role.deleteMany()])

})

it("should return a exercice if there is one", async () => {

    const info = await getInfo(request)
    await setPermToUser(info.user)

    const exerciceData = {
        statement:faker.lorem.word(),
        difficulty:faker.datatype.number({
            min:1,
            max:5
        }),
    }

    const exercice = await prisma.exercice.create({
        data:{
            language:getRandomSupportedLanguage(),
            statement:exerciceData.statement,
            difficulty:exerciceData.difficulty,
        }
    })
    expect(exercice).toBeDefined()

    const response = await request.post("/exercice").send({
        language:exercice.language,
    }).set({
        token:info.jwt
    })
    expect(response.body.exercice.statement).toBe(exerciceData.statement)

})