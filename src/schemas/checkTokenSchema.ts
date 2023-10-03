import {object,string} from 'yup';

const checkTokenSchema = object().shape({
    token: string().required()
})

export default checkTokenSchema;