import yup,{object,array,string,number} from 'yup';

const addExercicesSchema = object({

    statement: string().required(),
    difficulty: number().required().min(0).max(5),
    code: string().required().matches(/(programa|inicio)/),
    entries: array().of(string().matches(/inteiro|real|cadeia|caracter|logico/).required()).test("Number of entries is different than the LEIA functions","Number of entries is different than the LEIA functions", function(value) {

        if(((value || []).length) == ((this.parent.code.match(/(?<!")leia\([^)]*\)(?!")/g) || []).length)){
            return true
        }

        return false

    }).min(1),
    edges: array().of(array(string().required())).test("edges dont match the entries",function(value){
        if(value !== undefined){
        if(((value || []).length) == ((this.parent.entries || []).length)){
            return true
        }

        return false
    }
    else return true
    }),
        
})

export default addExercicesSchema;