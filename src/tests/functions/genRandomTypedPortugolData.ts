import { faker } from "@faker-js/faker"

export default function genRandomTypedPortugolData() {

switch (Math.floor(Math.random() * 5)) {
    //CADEIA
    case 0:
        return faker.lorem.sentence()
    //INTEIRO
    case 1:
        return faker.number.int({ min: 0, max: 1000 })
    //REAL
    case 2:
        return faker.number.float({ min: 0, max: 1000 })
    //LOGICO
    case 3:
        return faker.datatype.boolean() ? "verdadeiro" : "falso"
    //CARACTER
    case 4:
        return faker.word.sample()[0]

}

}