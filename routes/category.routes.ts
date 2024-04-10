import express, { Router, Response } from "express";

import { ICategory } from "../types/category.types";
import Category from "../models/Category";

const router: Router = express.Router();

//create new category
router.post("/", async (req: { body: ICategory }, res: Response) => {
  try {
    await Category.create({ ...req.body });

    res.status(200).send("created successfully");
  } catch (error) {
    return error;
  }
});
//update category
router.patch(
  "/:id",
  async (req: { params: { id: string }; body: ICategory }, res: Response) => {
    const { id } = req.params;

    try {
      const isExist = await Category.findById({ _id: id });

      if (isExist) {
        await Category.updateOne({ _id: id }, { ...req.body });
        res.status(200).send("Category updated");
      } else {
        res.status(404).send("Category NOT found");
      }
    } catch (error) {
      return error;
    }
  }
);

router.delete(
  "/:id",
  async (req: { params: { id: string } }, res: Response) => {
    const { id } = req.params;
    try {
      const isExixt = await Category.findById({ _id: id });

      if (isExixt) {
        await Category.deleteOne({ _id: id });
        res.status(200).send("delete successfully");
      } else {
        res.status(404).send("Category not found !");
      }
    } catch (error) {
      return error;
    }
  }
);
// get category model
router.get("/:id", async (req: { params: { id: string } }, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findById({ _id: id });

    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send("category not found");
    }
  } catch (error) {
    return error;
  }
});

export default router;
