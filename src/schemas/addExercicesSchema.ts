import yup,{object,array,string,number, boolean} from 'yup';

const addExercicesSchema = object({
    
    genRandomData: boolean().required(),
    statement: string().required(),
    difficulty: number().required().min(0).max(5),
        
    code: string().when("genRandomData", {
        is: true,
        then: (schema) => schema.required()
    }).when("language", {
        is: "portugol",
        then: (schema) => schema.matches(/(programa|inicio)/)
    }),
    entries: array().of(string().matches(/inteiro|real|cadeia|caracter|logico/).required()).when("genRandomData", {
        is: true,
        then: (schema) => schema.required()
    }),
    language: string().matches(/portugol|c/).required(),
        
    ioData: array().of(object({
        inputs: array().of(string().required()).required(),
        output: string().required()
    }).required()).when("genRandomData", {
        is: false,
        then(schema) {
            return schema.required()
        }
    })
        
})


export default addExercicesSchema;