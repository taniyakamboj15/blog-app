import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'author';
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'author'], default: 'author' }
}, { timestamps: true });

// Pre-save hook to hash password
UserSchema.pre('save', async function () {
    const user = this as unknown as IUser & Document;
    if (!user.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password as string, salt);
    } catch (err: any) {
        throw err;
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
