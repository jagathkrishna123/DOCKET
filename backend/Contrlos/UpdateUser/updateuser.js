import User from "../../Models/User/UserSchema.js";
import AllowedAdmin from "../../Models/Admin/adminSchema.js";

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.mobile) updateData.mobile = req.body.mobile;
        if (req.body.department) updateData.department = req.body.department;
        if (req.body.gender) updateData.gender = req.body.gender;

        // Try updating User first
        let updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).select("-password").lean();

        // If not found in User, try AllowedAdmin
        if (!updatedUser) {
            updatedUser = await AllowedAdmin.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true }
            ).select("-password").lean();
            
            if (updatedUser) {
                updatedUser.registerNumber = updatedUser.adminId;
                updatedUser.role = "admin";
            }
        }

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            data: updatedUser,
        });

    } catch (error) {
        console.error("Update user error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const updateProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const profilePicture = req.files[0].filename;

        // Try updating User first
        let updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { profilePicture } },
            { new: true }
        ).select("-password").lean();

        // If not found in User, try AllowedAdmin
        if (!updatedUser) {
            updatedUser = await AllowedAdmin.findByIdAndUpdate(
                id,
                { $set: { profilePicture } },
                { new: true }
            ).select("-password").lean();

            if (updatedUser) {
                updatedUser.registerNumber = updatedUser.adminId;
                updatedUser.role = "admin";
            }
        }

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            message: "Profile image updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Update profile image error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};