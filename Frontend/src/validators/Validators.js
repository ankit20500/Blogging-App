import * as yup from 'yup';

const nameMatch=/^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
const emailMatch=/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/

export const SignupSchema=yup.object({
        name:yup.string("Type is mismatch so please correct your name").required("Name is required")
            .min(3,'name should atleast 3 character')
            .max(20,'name should be less than 20 character')
            .matches(nameMatch,'name is invalid')
            .strict(),

        email:yup.string("Type is mismatching")
            .required('email is required')
            .email("invalid email")
            .matches(emailMatch,'invalid email'),

        password:yup.string('type is mismatching')
                .required('password is required')
                .min(6,'minimum 6 length of password is required')
                .max(15,'maximum 15 length of password is required')
})

export const LoginSchema=yup.object({
        email:yup.string("Type is mismatching")
            .required('email is required')
            .email("invalid email")
            .matches(emailMatch,'invalid email'),

        password:yup.string('type is mismatching')
                .required('password is required')
                .min(6,'minimum 6 length of password is required')
                .max(15,'maximum 15 length of password is required')
})


// validation for review
export const ReviewSchema=yup.object({
    ratings:yup.number('type is mismatching')
                .required('ratings is required')
                .min(1,'minimum ratings is 1')
                .max(5,'maximum ratings is 5'),
    
    comments:yup.string('type is mismatching')
                .required('comments is required')
                .min(50,'minimum comment size is 50')
                .max(200,'comment is not more than 200')
});

