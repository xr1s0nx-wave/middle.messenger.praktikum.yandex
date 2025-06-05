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
  } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Пароль должен содержать хотя бы один спецсимвол");
  } else if (
    !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]+$/.test(password)
  ) {
    errors.push(
      "Пароль должен содержать только латинские буквы, цифры и спецсимволы",
    );
  }
  if (errors.length > 0) {
    return errors.join("; ");
  }
  return false;
};

export const nameValidation = (name: string): string | false => {
  if (!/^[A-ZА-ЯЁ][a-zа-яё-]+$/.test(name)) {
    return "Имя должно начинаться с заглавной буквы и содержать только буквы или дефис";
  }
  return false;
};

export const surnameValidation = (surname: string): string | false => {
  if (!/^[A-ZА-ЯЁ][a-zа-яё-]+$/.test(surname)) {
    return "Фамилия должна начинаться с заглавной буквы и содержать только буквы или дефис";
  }
  return false;
};

export const repeatPasswordValidation = (
  password: string,
  repeat: string,
): string | false => {
  if (password !== repeat) {
    return "Пароли не совпадают";
  }
  return false;
};

export const phoneValidation = (phone: string): string | false => {
  if (!/^\+?\d{10,15}$/.test(phone)) {
    return "Телефон должен содержать от 10 до 15 цифр и может начинаться с +";
  }
  return false;
};

export const emailValidation = (email: string): string | false => {
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Некорректный email";
  }
  return false;
};
