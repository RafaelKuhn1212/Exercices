import yup,{object,array,string,number} from 'yup';

const submitExercicesSchema = object({

    exerciceId: string().required(),
    code: string().required().matches(/(programa|inicio)/),

})

export default submitExercicesSchema;