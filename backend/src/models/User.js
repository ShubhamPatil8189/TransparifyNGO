// User.js
const User = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  roles: [String], // e.g. ['NGO_ADMIN','ACCOUNTANT','VOLUNTEER','DONOR']
  ngoId: { type: Schema.Types.ObjectId, ref: 'NGO', default: null },
  createdAt: { type: Date, default: Date.now },
  profile: { phone: String, address: String }
});
