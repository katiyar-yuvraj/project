const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      trim: true,
      lowercase: true, // Converts email to lowercase
      match: [/.+@.+\..+/, "Please enter a valid email"], // Email regex validation
    },
    password: {
      type: String,
      required: true,
      select: false, // Don't return password by default
    },
    role: {
        type: String,
        enum: ["student", "admin", "guest"], // Limit role options
        default: "guest", // Default to ' if no role is specified
      },
      profileImg:String
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip hashing if password is not modified
  }
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Handle any errors during hashing
  }
});

// Add a method to compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};



const User = mongoose.model("User", userSchema);

module.exports = User;
