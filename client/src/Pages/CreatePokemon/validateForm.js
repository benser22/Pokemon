function validateForm(formData) {
  const errors = {};

  if (formData.name === "") {
    errors.name = "Name is required";
  } else if (Number(formData.hp) === 0) {
    errors.hp = "You must choose the Health Points value";
  } else if (Number(formData.attack) === 0) {
    errors.attack = "You must choose the Attack value";
  } else if (Number(formData.defense) === 0) {
    errors.defense = "You must choose the Defense value";
  } else if (Number(formData.speed) === 0) {
    errors.speed = "You must choose the Speed value";
  } else if (Number(formData.height) === 0) {
    errors.height = "You must choose the Height value";
  } else if (Number(formData.weight) === 0) {
    errors.weight = "You must choose the Weight value";
  } else if (formData.img === "") {
    errors.img = "The new pokemon must have an image";
  }
  return errors;
}

export default validateForm;
