const passwordValidator = [
    {
      validator: function(value) {
        return value.length >= 6 && value.length <= 15;
      },
      message: 'Password should be between 6 and 15 characters'
    },
    {
      validator: function(value) {
        return /[A-Z]/.test(value);
      },
      message: 'Password should contain at least one uppercase letter'
    },
    {
      validator: function(value) {
        return /[a-z]/.test(value);
      },
      message: 'Password should contain at least one lowercase letter'
    },
    {
      validator: function(value) {
        return /\d/.test(value);
      },
      message: 'Password should contain at least one number'
    },
    {
      validator: function(value) {
        return /[@$!%*?&]/.test(value);
      },
      message: 'Password should contain at least one special character'
    }
  ];

  module.exports = passwordValidator;
