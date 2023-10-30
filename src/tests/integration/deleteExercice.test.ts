import { afterEach, beforeEach, expect, it } from "vitest";
import getInfo from "../functions/getUserAndJWT";
import setPermToUser from "../functions/setPermToUser";
import supertest from "supertest";
import app from "../../config/expressConfig";
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

it("should delete an exercice", async () => {
    const user = await getInfo(request)
    await setPermToUser(user.user)

    

    const createExercice = await prisma.exercice.create({
        data: {
            language: getRandomSupportedLanguage(),
            statement: faker.lorem.sentence(),
            difficulty: faker.datatype.number({ min: 1, max: 5 }),
        }
    })
    expect(createExercice).toBeTruthy()
    
    const response = await request.delete(`/exercice/delete`).send({
        exerciceId: createExercice.id
    }).set({
        token: user.jwt
    })
    expect(response.status).toBe(204)

    expect(await prisma.exercice.findUnique({
        where: {
            id: createExercice.id
        }
    })).toBeFalsy()

    })