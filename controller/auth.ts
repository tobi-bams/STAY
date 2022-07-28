import { User } from "../interfaces/user";
import { ResponseHandler } from "../util/response";
import joi from "joi";
const models = require("../models");
import bcrypt from "bcrypt";
import { JwtHandler } from "../util/jwt";

export const signUp = async (user: User) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    fullname: joi.string().required(),
  });

  const validation = schema.validate({
    email: user.email,
    password: user.password,
    fullname: user.fullname,
  });

  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  const t = await models.sequelize.transaction();
  try {
    const userExist = await models.user.findOne({
      where: { email: user.email },
    });
    if (userExist) {
      return ResponseHandler(
        409,
        "Unable to create an Account with this email address"
      );
    }
    const createdUser = await models.user.create(
      {
        email: user.email,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
        fullname: user.fullname,
        role: "user",
      },
      { transaction: t }
    );
    await models.wallet.create({ userId: createdUser.id }, { transaction: t });
    await t.commit();
    let token = JwtHandler({
      id: createdUser.id,
      fullname: createdUser.fullname,
      email: createdUser.email,
    });
    return ResponseHandler(200, "Account Created Successfully", {
      token,
      user: { fullname: createdUser.fullname, email: createdUser.email },
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
