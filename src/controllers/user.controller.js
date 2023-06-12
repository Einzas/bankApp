const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  if (!users || users.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No users found! 😥',
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'Users fetched successfully!🎉',
    users,
  });
});

exports.getTransfers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transfers = await Transfer.findAll({
    where: { senderUserId: id },
  });
  if (!transfers || transfers.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No transfers found! 😥',
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'Transfers fetched successfully!🎉',
    transfers,
  });
});
