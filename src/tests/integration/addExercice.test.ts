import app from "../../config/expressConfig";
import supertest from "supertest";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {  it,expect, afterEach, beforeEach } from "vitest"
import { faker } from "@faker-js/faker";

import getInfo from "../functions/getUserAndJWT";
import genRandomIoData from "../functions/genRandomIoData";
import setPermToUser from "../functions/setPermToUser";
import mockCodeToReturnValuePORTUGOL from "../functions/mockCodeToReturnValuePortugol";
import mockCodeToReturnValueC from "../functions/mockCodeToReturnValueC";

import genRandomTypedPortugolData from "../functions/genRandomTypedPortugolData";
import getRandomSupportedLanguage from "../functions/getRandomSupportedLanguage";
import genRandomTypedC from "../functions/genRandomTypedC";

const request = supertest(app())

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

it("should add an exercice using IO data", async () => {
const info = await getInfo(request)
await setPermToUser(info.user)

const ioData = genRandomIoData()

const response = await request.post("/exercice/add").send({
    language: getRandomSupportedLanguage(),
    statement: faker.lorem.sentence(),
    difficulty: faker.datatype.number({ min: 1, max: 5 }),
    genRandomData: false,
    ioData,
}).set({
    token: info.jwt
})
console.log(response)
expect(response.statusCode).toBe(201)
const exercice = await prisma.exercice.findUnique({
    where:{
        id: response.body.id
    },
    include:{
        tests:{
            select:{
                input:true,
                output:true
            }
        }
    }

})
expect(exercice).toBeTruthy()
expect(exercice?.statement).toBe(response.body.statement)

expect(exercice?.tests).toStrictEqual(ioData.map((data:any) => {
    return{
        input: data.inputs.map((input:any) => input.toString()),
        output: data.output
    }
}))


})

it("should add an exercice using random data", async () => {

const info = await getInfo(request)
await setPermToUser(info.user)

let expectedValue:string | number | undefined = undefined
let response

if(getRandomSupportedLanguage() === "c"){
    expectedValue = genRandomTypedC()

    response = await request.post("/exercice/add").send({
        language: "c",
        statement: faker.lorem.sentence(),
        difficulty: faker.datatype.number({ min: 1, max: 5 }),
        genRandomData: true,
        code: mockCodeToReturnValueC(expectedValue?.toString() || ""),
        entries: [],
    }).set({
        token: info.jwt
    })

}else if(getRandomSupportedLanguage() === "portugol"){
expectedValue = genRandomTypedPortugolData()

response = await request.post("/exercice/add").send({
    language: "portugol",
    statement: faker.lorem.sentence(),
    difficulty: faker.datatype.number({ min: 1, max: 5 }),
    genRandomData: true,
    code: mockCodeToReturnValuePORTUGOL(expectedValue?.toString() || ""),
    entries: [],
}).set({
    token: info.jwt
})
}
expect(response.statusCode).toBe(201)
const exercice = await prisma.exercice.findUnique({
    where:{
        id: response.body.id
    },
    include:{
        tests:{
            select:{
                input:true,
                output:true
            }
        }
    }
})
expect(exercice).toBeTruthy()
expect(exercice?.statement).toBe(response.body.statement)

expect(exercice?.tests).toStrictEqual([{
    input: [],
    output: expectedValue?.toString()
}])

})
