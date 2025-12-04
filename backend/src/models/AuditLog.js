// AuditLog.js
const AuditLog = new Schema({
  ngoId: { type: Schema.Types.ObjectId, ref: 'NGO' },
  actorId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: String,
  resource: String,
  resourceId: Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
  hash: String
});
