import express, { Router, Response, Request } from "express";
import {
  addSongToAlbum,
  deleteSong,
  getSongsByParams,
} from "../services/songServices";
import { verifyToken } from "../middlewares/verifyToken";

const router: Router = express.Router();

//create new song in album
router.post("/:albumId/:categoryId", async (req: Request, res: Response) => {
  const { albumId, categoryId } = req.params;
  const { name, singer, category } = req.body;
  try {
    await addSongToAlbum({ albumId, categoryId, name, singer, category });
    res.status(200).send("Song added to album successfully");
  } catch (error) {
    return error;
  }
});

router.delete("/:albumId/:songId", async (req: Request, res: Response) => {
  try {
    const { albumId, songId } = req.params;

    await deleteSong(albumId, songId);

    res.status(200).send("Song deleted from album");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/:albumId/:categoryId",
  verifyToken,
  async (req: Request, res: Response) => {
    const { albumId, categoryId } = req.params;

    const response = await getSongsByParams(albumId, categoryId);
    res.status(200).send(response);
  }
);

export default router;
