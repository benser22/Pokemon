export const validateForm = (formData) => {
    const { name, email, message } = formData;
  
    if (!name || !email || !message) {
      return false;
    }
  
    return true;
  };
  