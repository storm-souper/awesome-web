import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required:true},
  isAdmin: {type: Boolean, required: true, default: false},
  isMod: {type: Boolean, required: true, default: false},
}, {
  timestamps: true
});

const Group = mongoose.model('Group', groupSchema);
export default Group;