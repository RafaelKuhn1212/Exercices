import {object,string} from 'yup';

const getExerciceSchema = object().shape({
    language: string().required().matches(/portugol|c/),
})

export default getExerciceSchema;