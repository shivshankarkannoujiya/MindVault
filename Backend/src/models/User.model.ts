import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateToken(): string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            minLength: 3,
            maxLength: 20,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
        },

        password: {
            type: String,
            minLength: 6,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.isPasswordCorrect = async function (
    password: string
): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_EXPIRY as any }
    );
};

export const User = mongoose.model<IUser>("User", userSchema);
