import  express from "express";
import multer from "multer"; 
import path from "path";
import { 
  registerUser, 
  loginUser, 
  deleteUser, 
  requestDeleteOTP, 
  getProfileController, 
  activateAccount, 
  loginOTPRequest,
  uploadProfilePicController,
  forgotPasswordRequest, 
  resendOTP,
  resetPassword   
} from "../control/userController";
import { authMiddleware } from "../middleware/authMiddleware";





const router = express.Router();



const storage = multer.diskStorage({
  destination: "uploads/", // Ensure this folder exists in your backend root
  filename: (req, file, cb) => {
    cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ 
  storage, 
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB Limit
});

router.post("/register", registerUser);
router.post("/activate", activateAccount);
router.post("/delete-request", authMiddleware, requestDeleteOTP);
router.post("/login", loginUser);
router.post("/forgot-password-request", forgotPasswordRequest);
router.post("/reset-password", resetPassword);
router.post("/login-otp-request", loginOTPRequest);
router.post(
  "/upload-profile-pic", 
  authMiddleware, 
  upload.single("image"), 
  uploadProfilePicController
);
router.get("/profile", authMiddleware, getProfileController);
router.post("/resend-otp", resendOTP);
// Delete user account
router.delete("/delete-confirm", authMiddleware, deleteUser);

export default router;


// import express from "express";
// import { registerUser, loginUser, getProfile } from "../control/userController";

// const router = express.Router();

// // Routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/:id", getProfile);

// export default router;
