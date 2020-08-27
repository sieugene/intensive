import React from "react";
import { Formik, Field, Form } from "formik";
import { validateEmail } from "../../utils/validators";
import { signInRequest } from "../../ducks/auth";
import { useDispatch } from 'react-redux';

const SignIn = () => {
const dispatch = useDispatch()
const signInFetch = (values) => { dispatch(signInRequest(values)) }
  return (
    <div>
      <div className="signup">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            signInFetch(values);
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
              />
              <button type="submit">Авторизация</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
