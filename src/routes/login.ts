const express = require("express");
const router = express.Router();
const { sendResponse } = require("../functions/common");

const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  models: { User },
} = require("../models");

import { Request, Response } from "express";

interface TypedRequestBody<T> extends Request {
  body: T;
}
router.post("/", async (req: TypedRequestBody<{ username: string; password: string }>, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { [Op.and]: [{ userName: username }, { password: password }] } });
    if (user) {
      const time = Date.now();
      const token = jwt.sign({ id: user.id, time: time }, "my_key");
      return sendResponse(res, 200, { token }, true);
    } else {
      return sendResponse(res, 401, { message: "Invalid username or password" }, true);
    }
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
  }
});

module.exports = router;
