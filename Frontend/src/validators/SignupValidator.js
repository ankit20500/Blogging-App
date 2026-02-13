import * as yup from 'yup';

const nameMatch=/^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
const emailMatch=/^[a-zA-Z0-9]+@[a-z]+.[a-z]{2,}$/

const SignupSchema=yup.object({
    name:yup.string("Type is mismatch so please correct your name").required("Name is required")
            .min(3,'name should atleast 3 character')
            .max(20,'name should be less than 20 character')
            .matches(nameMatch,'name is invalid')
            .strict(),
    email:yup.string("Type is mismatching").email("invalid email")
            .matches(emailMatch,'invalid email')
})

export default SignupSchema;


