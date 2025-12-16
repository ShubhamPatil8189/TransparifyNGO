// Example middleware: validate donor payload for create/update
exports.validateDonorPayload = (req, res, next) => {
  const { userId, name, email } = req.body;
  if (!userId || !name || !email) {
    return res.status(400).json({ message: "userId, name, and email are required" });
  }
  next();
};
