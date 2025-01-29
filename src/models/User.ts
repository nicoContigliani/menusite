import mongoose, { Schema, Model } from 'mongoose';

// Define the interface for your User document
interface IUser {
  email?: string;
  rol?: string;
  visit?: any[]; // Use any[] if the structure is not strictly defined
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const userSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  rol: String,
  visit: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model already exists
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;