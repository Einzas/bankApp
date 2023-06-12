const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.createTransfer = catchAsync(async (req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;
  const senderUser = await User.findOne({
    where: { accountNumber: senderUserId, status: 'active' },
  });
  const receiverUser = await User.findOne({
    where: { accountNumber: receiverUserId, status: 'active' },
  });
  if (!receiverUser) {
    return res.status(404).json({
      status: 'error',
      message: 'Receiver user not found or is disabled! 😥',
    });
  }
  if (!senderUser) {
    return res.status(404).json({
      status: 'error',
      message: 'Sender user not found or is disabled! 😥',
    });
  }
  if (senderUser.amount < amount || amount <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Insufficient funds! 😥',
    });
  }
  senderUser.amount -= amount;
  receiverUser.amount += amount;
  await senderUser.save();
  await receiverUser.save();

  const transfer = await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });
  res.status(201).json({
    status: 'success',
    message: 'Transfer created successfully!🎉',
    transfer,
  });
});
