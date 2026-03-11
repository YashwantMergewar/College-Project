import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../../utils/validation-schema/userValidationSchema.js";
import prisma from "../config/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/auth.middleware.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new ApiError(404, "User not found");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token using Prisma (no .save() on plain object)
    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.log(error.message);
    throw new ApiError(500, "Error while generating access and refresh token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const validateData = userRegistrationSchema.safeParse(req.body);

  if (!validateData.success) {
    throw new ApiError(400, "Validation error", validateData.error.errors);
  }

  const { fullname, username, email, password, confirmPassword } =
    validateData.data;

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirm password do not match");
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  const assignRole = existingAdmin ? "STAFF" : "ADMIN";

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      throw new ApiError(
        400,
        "User with this email or username already exists",
      );
    }

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        email,
        password: hashedPassword,
        role: assignRole,
      },
    });

    if (!newUser) {
      throw new ApiError(500, "Error while creating user");
    }

    const registeredUser = await prisma.user.findUnique({
      where: { id: newUser.id },
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        role: true,
        isMentor: true,
        createdAt: true,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, registeredUser, "User registered successfully"),
      );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.log(error);
    throw new ApiError(500, "Error while registering user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const validateData = userLoginSchema.safeParse(req.body);

  if (!validateData.success) {
    throw new ApiError(400, "Validation error", validateData.error.errors);
  }

  const { username, password } = validateData.data;

  // if (!username && !email) {
  //     throw new ApiError(400, "Username or email is required");
  // }

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id,
  );

  const loggedInUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      role: true,
      isMentor: true,
      createdAt: true,
    },
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: { refreshToken: null },
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };