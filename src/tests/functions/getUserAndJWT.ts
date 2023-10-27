import request from 'supertest';
import { faker } from '@faker-js/faker';

export default async function getInfo(request: request.SuperTest<request.Test>) {

    const user = faker.internet.userName();
    const password = faker.internet.password();

    //Create user
    const create = await request.post("/auth/signUp").send({
        username: user,
        password: password
    })
    if(create.statusCode !== 201) throw new Error("Error creating user")
    const token = await request.post("/auth/login").send({
        username: user,  
        password: password
    })
    if(token.statusCode !== 200) throw new Error("Error getting token")
    const jwt = token.body.token
    return{
        user,
        password,
        jwt
    }
}