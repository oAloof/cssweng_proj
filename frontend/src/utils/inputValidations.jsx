export const firstname_validation = {
  name: "firstName",
  label: "First Name",
  type: "text",
  id: "firstName",
  placeholder: "First Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    pattern: {
      value: /^[A-Za-z.]+$/,
      message: "Only letters allowed",
    },
  },
};

export const username_validation = {
  name: "username",
  label: "Username",
  type: "text",
  id: "username",
  placeholder: "Username",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: "No special characters allowed",
    },
  },
};

export const lastname_validation = {
  name: "lastName",
  label: "Last Name",
  type: "text",
  id: "lastName",
  placeholder: "Last Name",
  validation: {
    required: {
      value: true,
      message: "Required",
      pattern: {
        value: /^[A-Za-z.]+$/,
        message: "Only letters allowed",
      },
    },
  },
};

export const referenceNumber_validation = {
  name: "referenceNumber",
  label: "Reference Number",
  type: "text",
  id: "referenceNumber",
  placeholder: "Reference Number",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    pattern: {
      value: /^[0-9]+$/,
      message: "Only numbers allowed",
    },
  },
};

export const desc_validation = {
  name: "description",
  label: "Description",
  multiline: true,
  id: "description",
  placeholder: "Product description ...",
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

export const productName_validation = {
  name: "productName",
  label: "Product Name",
  type: "text",
  id: "productName",
  placeholder: "Product Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

export const saleName_validation = {
  name: "saleName",
  label: "Sale Name",
  type: "text",
  id: "saleName",
  placeholder: "Sale Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

export const productOriginalPrice_validation = {
  name: "originalPrice",
  label: "Original Price",
  type: "number",
  id: "originalPrice",
  placeholder: "Original Price",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    min: {
      value: 0,
      message: "Price cannot be less than 0",
    },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid price format",
    },
  },
};

export const discountPercentage_validation = {
  name: "discountPercentage",
  label: "Discount %",
  type: "number",
  id: "discountPercentage",
  placeholder: "Discount %",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    min: {
      value: 0,
      message: "Discount cannot be less than 0",
    },
    max: {
      value: 100,
      message: "Discount cannot exceed 100",
    },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid percentage",
    },
  },
};

export const availableQuantity_validation = {
  name: "availableQuantity",
  label: "Available Quantity",
  type: "number",
  id: "availableQuantity",
  placeholder: "Available Quantity",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    min: {
      value: 0,
      message: "Must not be less than 0",
    },
    pattern: {
      value: /^\d+$/,
      message: "Invalid quantity format",
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

export const quantity_validation = {
  name: "quantity",
  label: "Quantity",
  type: "number",
  id: "quantity",
  placeholder: "Enter quantity",
  validation: {
    required: {
      value: true,
      message: "Quantity is required",
    },
    min: {
      value: 1,
      message: "Quantity must be at least 1",
    },
    max: {
      value: 100,
      message: "Quantity must not exceed 100",
    },
    pattern: {
      value: /^\d+$/,
      message: "Quantity must be a positive integer",
    },
  },
};
