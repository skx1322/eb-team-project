import { Router } from "express";
import upload from "../middleware/multer.js";
import {
  createAdminAccount,
  createContributor,
  createGuide,
  createTutorialDetail,
  deleteContributorData,
  deleteGuideData,
  deleteTutorialDetail,
  getContributorData,
  getGuideData,
  getSpecificGuideData,
  getSpecificTutorialStep,
  getTutorialStep,
  loginAdminAccount,
  logoutAdminAccount,
  updateContributorData,
  updateGuideData,
  updateTutorialStep,
} from "../controllers/route.controller.js";
import auth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/createAdminAccount", auth, createAdminAccount);

userRouter.post("/loginAdmin", loginAdminAccount);

userRouter.post("/logoutAdmin", auth, logoutAdminAccount);

userRouter.post(
  "/createContributor",
  upload.single(`image`),
  auth,
  createContributor
);

userRouter.get("/receiveContributorData", getContributorData);

userRouter.put(
  "/updateContributorData/:id",
  auth,
  upload.single("image"),
  updateContributorData
);

userRouter.delete("/deleteContributorData/:id", deleteContributorData);

userRouter.post(
  "/createGuide",
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createGuide
);

userRouter.get("/getGuideData", getGuideData);

userRouter.get("/getSpecificGuideData/:id", getSpecificGuideData);

userRouter.put(
  "/updateGuideData/:id",
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateGuideData
);

userRouter.post(
  "/createTutorialDetail/:id",
  auth,
  upload.single("image"),
  createTutorialDetail
);

userRouter.get("/getTutorialStep", getTutorialStep);

userRouter.get("/getSpecificTutorialStep/:id", getSpecificTutorialStep);

userRouter.put(
  "/updateTutorialStep/:id",
  auth,
  upload.single("image"),
  updateTutorialStep
);

userRouter.delete("/deleteContributorData/:id",auth, deleteGuideData);

userRouter.delete("/deleteContributorData/:id",auth, deleteTutorialDetail);

export default userRouter;
