export const firstname_validation = {
  name: "firstName",
  label: "First Name",
  type: "firstName",
  id: "firstName",
  placeholder: "First Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

export const lastname_validation = {
  name: "lastName",
  label: "Last Name",
  type: "lastName",
  id: "lastName",
  placeholder: "Last Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

export const desc_validation = {
  name: "description",
  label: "Description",
  multiline: true,
  id: "description",
  placeholder: "write description ...",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};

export const password_validation = {
  name: "password",
  label: "Password",
  type: "password",
  id: "password",
  placeholder: "Password",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    minLength: {
      value: 6,
      message: "min 6 characters",
    },
  },
};

export const confirmPassword_validation = {
  name: "confirmPassword",
  label: "Confirm Password",
  type: "password",
  id: "confirmPassword",
  placeholder: "Confirm Password",
  validation: {
    required: "Required",
    validate: (value, { password }) =>
      value === password || "Passwords do not match",
  },
};

export const contactNumber_validation = {
  name: "contactNumber",
  label: "Contact Number",
  type: "tel",
  id: "contactNumber",
  placeholder: "Contact Number",
  validation: {
    required: "Required",
    pattern: {
      value: /^09\d{9}$/,
      message: "Invalid contact number",
    },
    minLength: {
      value: 11,
      message: "Contact number should be 11 digits",
    },
    maxLength: {
      value: 11,
      message: "Contact number should be 11 digits",
    },
  },
};

export const email_validation = {
  name: "email",
  label: "Email Address",
  type: "email",
  id: "email",
  placeholder: "Email Address",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};

export const zip_validation = {
  name: "zip",
  label: "Zip Code",
  type: "text",
  id: "zip",
  placeholder: "Zip Code",
  validation: {
    required: "Required",
    pattern: {
      value: /^[0-9]{4}$/,
      message: "Invalid zip code",
    },
  },
};

export const streetAddress_validation = {
  name: "streetAddress",
  label: "Street Address",
  type: "text",
  id: "streetAddress",
  placeholder: "Street Address",
  validation: {
    required: "Required",
    minLength: {
      value: 3,
      message: "at least 3 characters",
    },
    maxLength: {
      value: 100,
      message: "less than 100 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9\s,'-]*$/,
      message: "Invalid characters in street address",
    },
  },
};

export const city_validation = {
  name: "city",
  validation: {
    required: "Required",
  },
};
