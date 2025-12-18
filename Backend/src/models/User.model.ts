import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
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

export const User = mongoose.model("User", userSchema);
