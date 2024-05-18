const express = require("express");
const router = express.Router();
const { sendResponse, validateRequest } = require("../functions/common");
const { medicationSchema } = require("../functions/schema");
const {
  models: { Medication },
} = require("../models");
const { Op } = require("sequelize");
import { Request, Response } from "express";

const { create, getAll, update, deletebyId, checkExist } = require("../functions/modelFunctions");

router.get("/list/:offset/:limit", validateRequest("get-all", "medication"), async (req: Request, res: Response) => {
  try {
    const { offset, limit } = req.params;

    const list = await getAll(Medication, Number(offset), Number(limit));
    return sendResponse(res, 200, list, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
  }
});

interface TypedRequestBody<T> extends Request {
  user: { id: number };
  body: T;
}
router.post("/create/", validateRequest("post-create", "medication"), async (req: TypedRequestBody<{ name: string; description: string; quantity: number }>, res: Response) => {
  try {
    const { error } = medicationSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, true);
    } else {
      const data: any = req.body;
      const exist = await checkExist({ where: { name: data.name } }, Medication);
      if (!exist) {
        data.active = 1;
        data.addedBy = req.user.id;
        const created = await create(data, Medication);
        return sendResponse(res, 200, created, true);
      } else {
        return sendResponse(res, 400, `Name exist on Id:-${exist.id}`, true);
      }
    }
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
  }
});
router.put("/inactive/:id", validateRequest("put-innactive-id", "medication"), async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedRecord = await update(id, { active: 0 }, Medication);
    return sendResponse(res, 200, updatedRecord, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
  }
});
router.put("/update/:id", validateRequest("put-update-id", "medication"), async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { error } = medicationSchema.validate(req.body);
    const data = req.body;
    if (error) {
      return sendResponse(res, 400, error.details[0].message, true);
    } else {
      // check update name exist on anothre records
      const exist = await checkExist(
        {
          where: {
            [Op.and]: [
              { name: data.name },
              {
                id: {
                  [Op.ne]: id,
                },
              },
            ],
          },
        },
        Medication
      );

      if (!exist) {
        const updatedRecord = await update(id, data, Medication);
        return sendResponse(res, 200, updatedRecord, true);
      } else {
        return sendResponse(res, 400, `Name exist on Id:-${exist.id}`, true);
      }
    }
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
  }
});
router.delete("/delete/:id", validateRequest("delete-delete-id", "medication"), async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deletebyId(id, Medication);
    return sendResponse(res, 200, { status: "delete sucess" }, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
  }
});

module.exports = router;
