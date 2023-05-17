const validatorConfig = {
  userTag: {
    isRequired: { message: 'Required to fill' },
  },
  email: {
    isRequired: { message: 'Required to fill' },
    isEmail: { message: 'Enter your email correctly' },
  },
  password: {
    isRequired: { message: 'Required to fill' },
    isLength: { message: 'Password must be between 4 and 12 characters' },
  },
};

export default validatorConfig;
