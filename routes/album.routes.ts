import express, { Router, Response } from "express";

import { IAlbum } from "../types/album.types";
import   Album  from "../models/Album";
import { addAlbum, deleteAlbum } from "../services/albumServices";

const router: Router = express.Router();

//create new album
router.post("/", async (req: { body: IAlbum }, res: Response) => {
  try {
    await addAlbum(req.body)

    res.status(200).send("created successfully");
  } catch (error) {
    return error;
  }
});

//update album(same as patch)
router.put("/:id",async (req: { params: { id: string }; body: IAlbum }, res: Response) => {
    const { id } = req.params;

    try {
      const isExist = await Album.findById({ _id: id });

      if (isExist) {
        await Album.updateOne({ _id: id }, { ...req.body });

        res.status(200).send("Album updated");
      } else {
        res.status(404).send("Album not found");
      }
    } catch (error) {
      return error;
    }
  }
);

router.delete("/:id",async (req: { params: { id: string } }, res: Response) => {
    const { id } = req.params;
    try {
      const response = await deleteAlbum(id)
      res.status(200).send(response)
    } catch (error) {
      return error;
    }
  }
);

// get album model
router.get("/:id", async (req: { params: { id: string } }, res: Response) => {
  const { id } = req.params;
  try {
    const albumComplaint = await Album.findById({ _id: id });

    if (albumComplaint) {
      res.status(200).send(albumComplaint);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (error) {
    return error;
  }
});


export default router;