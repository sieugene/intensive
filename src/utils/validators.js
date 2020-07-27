export const validatePassword = (value) => {
  let error;
  if (!value || value.length <= 8) {
    error = "Пароль должен быть больше 8 символов";
  }
  return error;
};
export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
