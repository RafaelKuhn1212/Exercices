import {object,string} from 'yup';

const signUpSchema = object().shape({

    username: string().required(),
    password: string().required(),

})

export default signUpSchema;