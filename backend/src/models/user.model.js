const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  roles: [String], // e.g. ['NGO_ADMIN','ACCOUNTANT','VOLUNTEER','DONOR']
  ngoId: { type: Schema.Types.ObjectId, ref: 'NGO', default: null },
  createdAt: { type: Date, default: Date.now },
  profile: { phone: String, address: String },
  isTemp: { type: Boolean, default: false },
  code: { type: String },
  codeExpiry: { type: Date }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
});

module.exports = mongoose.model('User', userSchema);
