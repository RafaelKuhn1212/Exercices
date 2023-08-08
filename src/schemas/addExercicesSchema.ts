import yup,{object,array,string,number, boolean} from 'yup';

const addExercicesSchema = object({
    
    genRandomData: boolean().required(),
    statement: string().required(),
    difficulty: number().required().min(0).max(5),
        
    code: string().matches(/(programa|inicio)/).when("genRandomData", {
        is: true,
        then: (schema) => schema.required()
    }),
    entries: array().of(string().matches(/inteiro|real|cadeia|caracter|logico/).required()).when("genRandomData", {
        is: true,
        then: (schema) => schema.required()
    }),
    
            
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