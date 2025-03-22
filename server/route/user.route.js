import { Router } from "express";
import upload from "../middleware/multer.js";
import {
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
  updateContributorData,
  updateGuideData,
  updateTutorialStep,
} from "../controllers/route.controller.js";

const userRouter = Router();

userRouter.post(
  "/createContributor",
  upload.single(`image`),
  createContributor
);

userRouter.get("/receiveContributorData", getContributorData);

userRouter.put(
  "/updateContributorData/:id",
  upload.single("image"),
  updateContributorData
);

userRouter.delete("/deleteContributorData/:id", deleteContributorData);

userRouter.post(
  "/createGuide",
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateGuideData
);

userRouter.post(
  "/createTutorialDetail/:id",
  upload.single("image"),
  createTutorialDetail
);

userRouter.get("/getTutorialStep", getTutorialStep);

userRouter.get("/getSpecificTutorialStep/:id", getSpecificTutorialStep);

userRouter.put(
  "/updateTutorialStep/:id",
  upload.single("image"),
  updateTutorialStep
);

userRouter.delete("/deleteContributorData/:id", deleteGuideData);

userRouter.delete("/deleteContributorData/:id", deleteTutorialDetail);

export default userRouter;
