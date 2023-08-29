export default function validate(inputs) {
  // Expresiones regulares para validar el email, contraseña, firstName y lastName
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexPassword = /^(?=.*\d)[A-Za-z\d]{6,10}$/;
  const regexName = /^[\p{L}\s]{1,50}$/u;

  
  /* 
  \p{L} representa cualquier letra en cualquier idioma.
  \s representa espacios en blanco.
  ',.- permite algunos caracteres especiales comunes como comillas, comas, guiones y puntos.
  */
 let errors = {};
 
  // Validación del campo de email
  if (!inputs.email) {
    errors.email = "The email field cannot be empty";
  } else {
    if (inputs.email.length > 35) {
      errors.email = "Email cannot exceed 35 characters";
    } else {
      if (!regexEmail.test(inputs.email)) {
        errors.email = "You must enter a valid email";
      } else {
        errors.email = "";
      }
    }
  }

  // Validación del campo de contraseña
  if (!inputs.password) {
    errors.password = "The password field cannot be empty";
  } else if (inputs.password.toLowerCase() === "admin") {
    // Si el password es "admin", no se generará un mensaje de error.
    errors.password = "";
  } else if (!regexPassword.test(inputs.password)) {
    errors.password =
      "Password must be between 6 and 10 characters and at least one number";
  } else {
    errors.password = "";
  }

  // Validación del campo de firstName
  if (!inputs.firstName) {
    errors.firstName = "The first name field cannot be empty";
  } else {
    if (!regexName.test(inputs.firstName)) {
      errors.firstName = "You must enter a valid first name";
    } else {
      errors.firstName = "";
    }
  }

  // Validación del campo de lastName
  if (!inputs.lastName) {
    errors.lastName = "The last name field cannot be empty";
  } else {
    if (!regexName.test(inputs.lastName)) {
      errors.lastName = "You must enter a valid last name";
    } else {
      errors.lastName = "";
    }
  }

  return errors;
}
