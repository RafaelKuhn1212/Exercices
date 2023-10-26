import {object,string} from 'yup';

const loginSchema = object().shape({

    username: string().required(),
    password: string().required(),

})

export default loginSchema;