import * as yup from 'yup';

const SignupSchema=yup.object({
    name:yup.string().required("Name is required")
            .min(3,'name should atleast 3 character')
            .max(20,'name should be less than 20 character')
            .strict()
})

export default SignupSchema;