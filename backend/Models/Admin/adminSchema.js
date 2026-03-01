import mongoose from "mongoose";

const allowedAdminSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
      unique: true, // PRIMARY KEY equivalent
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      default: "Admin"
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
    },
    department: {
      type: String,
    },
    gender: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const AllowedAdmin = mongoose.model(
  "AllowedAdmin",
  allowedAdminSchema
);

export default AllowedAdmin;