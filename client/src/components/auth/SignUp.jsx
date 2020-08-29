import React from "react";
import { Formik, Field, Form } from "formik";
import { validateEmail } from "../../utils/validators";
import { validatePassword } from "./../../utils/validators";
import "./_signup.scss";
import { useDispatch } from "react-redux";
import { signUpRequest } from "../../ducks/auth";

const SignUp = () => {
const dispatch = useDispatch()
const signUpFetch = (values) => { dispatch(signUpRequest(values)) }
  return (
    <div className="signup">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
        signUpFetch(values)
          console.log(values);
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="youremail@acme.com"
              type="email"
              validate={validateEmail}
            />
            {errors.email && touched.email && (
              <div className={"error"}>{errors.email}</div>
            )}
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type={"password"}
              validate={validatePassword}
            />
            {errors.password && touched.password && (
              <div className={"error"}>{errors.password}</div>
            )}
            <button type="submit">Зарегистрироваться</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
