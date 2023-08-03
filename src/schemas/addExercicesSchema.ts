import yup,{object,array,string,number, bool} from 'yup';

const addExercicesSchema = object({
    genRandomData: bool().required(),
    statement: string().required(),
    difficulty: number().required().min(0).max(5),
    randomTestCases: object({
        code: string().required().matches(/(programa|inicio)/),
        entries: array().of(string().matches(/inteiro|real|cadeia|caracter|logico/).required())
    }).test("Random test cases need to have a value if genRandomData is true","Random test cases need to have a value if genRandomData is true", function(value) {
        const {genRandomData} = this.parent
        return genRandomData ? value !== undefined : true
        }),
    ioData: array().of(object({
        inputs: array().of(string().required()).required(),
        output: string().required()
    }).required()).test("IO data need to have a value if genRandomData is false","IO data need to have a value if genRandomData is false", function(value) {
        const {genRandomData} = this.parent
        return genRandomData ? true : value !== undefined
        }
    )
        
})

export default addExercicesSchema;