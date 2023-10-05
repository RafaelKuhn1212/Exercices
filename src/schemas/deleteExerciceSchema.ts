import {object,string} from 'yup';

const deleteExerciceSchema = object().shape({
    exerciceId: string().required(),
})

export default deleteExerciceSchema;