export const loginValidation = (login: string): string | false => {
  const loginRegex = /^[a-zA-Z0-9]{4,}$/;
  if (!loginRegex.test(login)) {
    return "Логин должен содержать только латинские буквы и цифры, минимум 4 символа";
  }
  return false;
};

export const passwordValidation = (password: string): string | false => {
  const errors: string[] = [];

  if (password.length < 4) {
    errors.push("Пароль должен содержать минимум 4 символа");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Пароль должен содержать хотя бы один спецсимвол");
  }
  if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password)) {
    errors.push(
      "Пароль должен содержать только латинские буквы, цифры и спецсимволы"
    );
  }

  if (errors.length > 0) {
    return errors.join("; ");
  }
  return false;
};
