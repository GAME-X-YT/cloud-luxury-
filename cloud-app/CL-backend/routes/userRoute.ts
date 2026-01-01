import  express from "express";
import { 
  registerUser, 
  loginUser, 
  deleteUser, 
  requestDeleteOTP, 
  getProfileController, 
  activateAccount, 
  loginOTPRequest,
  forgotPasswordRequest, 
  resetPassword   
} from "../control/userController";
import { authMiddleware } from "../middleware/authMiddleware";





const router = express.Router();

router.post("/register", registerUser);
router.post("/activate", activateAccount);
router.post("/delete-request", authMiddleware, requestDeleteOTP);
router.post("/login", loginUser);
router.post("/forgot-password-request", forgotPasswordRequest);
router.post("/reset-password", resetPassword);
router.post("/login-otp-request", loginOTPRequest);
router.get("/profile", authMiddleware, getProfileController);
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
