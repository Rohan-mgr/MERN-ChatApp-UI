import * as yup from "yup";

let userSignupSchema = yup.object({
  fullName: yup.string().min(2).required("Please Enter your full Name"),
  email: yup.string().email().required("Please Enter your Email"),
  password: yup.string().min(4).required("Please Enter your Password"),
});
let userLoginSchema = yup.object({
  email: yup.string().email().required("Please Enter your Email"),
  password: yup.string().min(4).required("Please Enter your Password"),
});
let messageSchema = yup.object({
  message: yup.string().min(1).required(""),
});

export { userSignupSchema, userLoginSchema, messageSchema };
