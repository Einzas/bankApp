const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.create({ name, password });
  res
    .status(201)
    .json({ status: 'success', message: 'User created successfully!🎉', user });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({ where: { accountNumber } });
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }
  if (!((await user.password) === password)) {
    return next(new AppError('Invalid credentials', 401));
  }

  res.status(200).json({ status: 'success', message: 'Login successful!🎉' });
});
