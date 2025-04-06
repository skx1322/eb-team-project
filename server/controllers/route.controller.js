import AdminModel from "../model/admin.model.js";
import ContributorModel from "../model/contributor.model.js";
import TutorialDetailModel from "../model/tutorial.detail.model.js";
import TutorialModel from "../model/tutorial.title.model.js";
import imageDeleteCall from "../utils/deleteImage.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import imageUploadCall from "../utils/uploadImage.js";
import videoUploadCall from "../utils/uploadVideo.js";
import bcryptjs from "bcryptjs";

export async function createAdminAccount(req, res) {
  try {
    const { name, password, email } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide data",
      });
    }
    const user = await AdminModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists in the database.",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payloadData = {
      admin_name: name,
      admin_password: hashPassword,
      admin_email: email,
    };

    const newUser = new AdminModel(payloadData);
    const save = await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Account successfully created.",
      output: save,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function loginAdminAccount(req, res) {
  try {
    const { name, password } = req.body;
    const user = await AdminModel.findOne({ admin_name: name });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Admin does not exist.",
      });
    }

    const passwordChecker = await bcryptjs.compare(
      password,
      user.admin_password
    );
    if (!passwordChecker) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie(`accessToken`, accessToken, cookieSetting);
    res.cookie(`refreshToken`, refreshToken, cookieSetting);

    return res.status(200).json({
      success: true,
      message: "Successfully login.",
      output: user.admin_name,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in processing the data within the server.",
      output: error,
    });
  }
}

export async function logoutAdminAccount(req, res) {
  try {
    const userid = req.userId;
    if (!userid) {
      return res.status(401).json({
        success: false,
        message: "Missing ID.",
        output: error,
      });
    }
    const cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieSetting);
    res.clearCookie("refreshToken", cookieSetting);

    const removeRefreshToken = await AdminModel.findByIdAndUpdate(userid, {
      admin_passExpire: "",
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logout.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server gone wrong.",
      output: error,
    });
  }
}

export async function createContributor(req, res) {
  try {
    const { name, role, email, description } = req.body;
    const image = req.file;

    try {
      const user = await ContributorModel.findOne({
        $or: [{ name }, { email }],
      });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Name or Email already exists in the database.",
        });
      }

      const upload = await imageUploadCall(image);

      const DataLoad = {
        cont_name: name,
        cont_role: role,
        cont_email: email,
        cont_avatar: upload.url,
        cont_description: description || "", // Ensure description is optional
      };

      const newContributor = new ContributorModel(DataLoad);
      const save = await newContributor.save();

      return res.status(200).json({
        success: true,
        message: "Contributor data successfully uploaded",
        output: save,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error occurred.",
        error: err.message, // Return actual error message
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function getContributorData(req, res) {
  try {
    const contributor = await ContributorModel.find();

    if (contributor.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contributors found",
        output: contributor,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contributors data successfully retrieved",
      output: contributor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function updateContributorData(req, res) {
  try {
    const { name, role, email, description } = req.body;
    const image = req.file;
    const { id } = req.params;

    const contributor = await ContributorModel.findById(id);

    if (!contributor) {
      return res.status(404).json({
        success: false,
        message: "Contributor not found",
        output: contributor,
      });
    }
    try {
      let updateAvatar = contributor.cont_avatar;
      if (image) {
        const upload = await imageUploadCall(image);
        updateAvatar = upload.url;
      }

      const updateData = {
        cont_name: name || contributor.cont_name,
        cont_role: role || contributor.cont_role,
        cont_email: email || contributor.cont_email,
        cont_avatar: updateAvatar,
        cont_description: description || contributor.cont_description,
      };

      const updatedContributor = await ContributorModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Contributor data updated",
        output: updatedContributor,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error occurred.",
        error: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function deleteContributorData(req, res) {
  try {
    const { id } = req.params;

    const contributor = await ContributorModel.findById(id);

    if (!contributor) {
      return res.status(404).json({
        success: false,
        message: "Contributor not found",
        output: contributor,
      });
    }
    try {
      if (contributor.cont_avatar) {
        await imageDeleteCall(contributor.cont_avatar);
      }

      await ContributorModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Contributor data deleted",
        output: contributor,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error occurred.",
        error: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function createGuide(req, res) {
  try {
    const { title, type } = req.body;
    const { image, video } = req.files;

    if (!image || !video) {
      return res.status(400).json({
        success: false,
        message: "Both image and video files are required.",
      });
    }

    const GuideTitle = await TutorialModel.findOne({
      tutorial_title: title,
    });

    if (GuideTitle) {
      return res.status(400).json({
        success: false,
        message:
          "Same title was found within the Database, try using a different title name",
        output: GuideTitle,
      });
    }

    const upload = await imageUploadCall(image[0]);
    const VideoUpload = await videoUploadCall(video[0]);

    const DataLoad = {
      tutorial_title: title,
      tutorial_image: upload.url,
      tutorial_type: type,
      tutorial_content: [],
      tutorial_video: VideoUpload.url || "",
    };

    const newGuide = new TutorialModel(DataLoad);
    const save = await newGuide.save();

    return res.status(200).json({
      success: true,
      message: "Guide title successfully created",
      output: save,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function getGuideData(req, res) {
  try {
    const tutorial = await TutorialModel.find();

    if (tutorial.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tutorial found",
        output: tutorial,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tutorial data successfully retrieved",
      output: tutorial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function getSpecificGuideData(req, res) {
  try {
    const { id } = req.params;
    const tutorial = await TutorialModel.findById(id);

    if (tutorial.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tutorial found",
        output: tutorial,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tutorial data successfully retrieved",
      output: tutorial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function updateGuideData(req, res) {
  try {
    const { id } = req.params;
    const { title, type } = req.body;
    const { image, video } = req.files;

    const currentTutorial = await TutorialModel.findById(id);

    let newUpload = currentTutorial.tutorial_image;
    let newVideoUpload = currentTutorial.tutorial_video;

    if (image) {
      const upload = await imageUploadCall(image[0]);
      newUpload = upload.url;
    }

    if (VideoUpload) {
      const VideoUpload = await videoUploadCall(video[0]);
      newVideoUpload = VideoUpload.url;
    }

    const DataLoad = {
      tutorial_title: title || currentTutorial.tutorial_title,
      tutorial_image: newUpload,
      tutorial_type: type || currentTutorial.tutorial_type,
      tutorial_content: currentTutorial.tutorial_content,
      tutorial_video: newVideoUpload,
    };

    const updatedGuide = await TutorialModel.findByIdAndUpdate(id, DataLoad, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Guide title successfully created",
      output: updatedGuide,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function deleteGuideData(req, res) {
  try {
    const { id } = req.params;

    const tutorialGuide = await TutorialModel.findById(id);

    if (!tutorialGuide) {
      return res.status(404).json({
        success: false,
        message: "Contributor not found",
        output: tutorialGuide,
      });
    }
    try {
      if (tutorialGuide.tutorial_image) {
        await imageDeleteCall(tutorialGuide.tutorial_image);
      }

      await TutorialModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Contributor data deleted",
        output: tutorialGuide,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error occurred.",
        error: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function createTutorialDetail(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file;

    const lastStep = await TutorialDetailModel.findOne({ tutorial_id: id })
      .sort({ tutorial_step: -1 })
      .select("tutorial_step");

    const nextStep = lastStep ? lastStep.tutorial_step + 1 : 1;

    const existingCheck = await TutorialDetailModel.findOne({
      tutorial_content: title,
      tutorial_id: id,
    });

    if (title === existingCheck.tutorial_content) {
      return res.status(400).json({
        success: false,
        message:
          "Same title was found within the Database, try using a different title name to avoid duplication.",
        output: existingCheck,
      });
    }

    const upload = image ? await imageUploadCall(image) : { url: null };

    const newStep = new TutorialDetailModel({
      tutorial_step: nextStep,
      tutorial_title: title,
      tutorial_content: content,
      tutorial_image: upload.url,
      tutorial_id: id,
    });

    const save = await newStep.save();

    await TutorialModel.findByIdAndUpdate(
      id,
      { $push: { tutorial_content: save._id } }, // Push ObjectId
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Guide title successfully created",
      output: save,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function deleteTutorialDetail(req, res) {
  try {
    const { id } = req.params;

    const tutorialStep = await TutorialDetailModel.findById(id);

    if (!tutorialStep) {
      return res.status(404).json({
        success: false,
        message: "Contributor not found",
        output: tutorialStep,
      });
    }
    try {
      if (tutorialStep.tutorial_image) {
        await imageDeleteCall(tutorialStep.tutorial_image);
      }

      await TutorialDetailModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Contributor data deleted",
        output: tutorialStep,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error occurred.",
        error: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function createMultipleTutorialDetail(req, res) {
  try {
    const { id } = req.params;
    const { steps } = req.body;
    const images = req.files;

    if (!Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data was received",
      });
    }

    const lastStep = await TutorialDetailModel.findOne({ tutorial_id: id })
      .sort({ tutorial_step: -1 })
      .select("tutorial_step");

    let nextStep = lastStep ? lastStep.tutorial_step + 1 : 1;

    const newSteps = [];

    for (let index = 0; index < steps.length; index++) {
      const { title, content } = steps[index];
      const image = images?.[i];

      const existingCheck = await TutorialDetailModel.findOne({
        tutorial_title: title,
        tutorial_id: id,
      });

      if (existingCheck) {
        return res.status(400).json({
          success: false,
          message: `Step ${
            i + 1
          }: The title "${title}" is already in use. Choose a different title.`,
        });
      }
      const upload = image ? await imageUploadCall(image) : { url: null };

      newSteps.push({
        tutorial_step: nextStep++,
        tutorial_title: title,
        tutorial_content: content,
        tutorial_image: upload.url,
        tutorial_id: id,
      });
    }
    const savedSteps = await TutorialDetailModel.insertMany(newSteps);
    await TutorialModel.findByIdAndUpdate(
      id,
      {
        $push: {
          tutorial_content: { $each: savedSteps.map((step) => step._id) },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `${savedSteps.length} tutorial steps successfully created`,
      output: savedSteps,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function getTutorialStep(req, res) {
  try {
    const tutorial = await TutorialDetailModel.find();

    if (tutorial.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contributors found",
        output: tutorial,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contributors data successfully retrieved",
      output: tutorial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function getSpecificTutorialStep(req, res) {
  try {
    const { id } = req.params;
    const tutorial = await TutorialDetailModel.find({ tutorial_id: id });

    if (tutorial.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contributors found",
        output: tutorial,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contributors data successfully retrieved",
      output: tutorial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function updateTutorialStep(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file;

    const tutorialDetail = await TutorialDetailModel.findById(id);

    if (!tutorialDetail) {
      return res.status(404).json({
        success: false,
        message: "Tutorial step not found.",
        output: tutorialDetail,
      });
    }

    let updateImage = tutorialDetail.tutorial_image;

    if (image) {
      const upload = await imageUploadCall(image);
      updateImage = upload.url;
    }

    const updateStep = {
      tutorial_title: title,
      tutorial_content: content,
      tutorial_image: updateImage,
    };

    const updatedTutorialStep = await TutorialDetailModel.findByIdAndUpdate(
      id,
      updateStep,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Tutorial Step ${tutorialDetail.tutorial_step}`,
      output: updatedTutorialStep,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong within the server",
      output: error,
    });
  }
}

export async function createComment(req, res) {}

export async function getComment(req, res) {}

// to do list: arrangeTutorialDetail, createComment, deleteComment
