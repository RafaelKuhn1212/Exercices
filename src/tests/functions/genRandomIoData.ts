import { faker } from "@faker-js/faker";
import genRandomTypedPortugolData from "./genRandomTypedPortugolData";

export default function genRandomIoData() {
    return faker.helpers.multiple(()=>{
        return {
            inputs: faker.helpers.multiple(genRandomTypedPortugolData, { count: 5 }),
            output: faker.helpers.multiple(genRandomTypedPortugolData, { count: 5 }).toString()
        }
    },{
        count:{
            min:1,
            max:8
        }
    })
}