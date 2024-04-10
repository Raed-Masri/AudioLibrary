import mongoose from "mongoose";
import Album from "../models/Album";
import Category from "../models/Category";
import Songs from "../models/Songs";

const addSongToAlbum = async (body: any): Promise<void> => {
  const { albumId, categoryId } = body;
  const album = await Album.findById(albumId);
  const category = await Category.findById(categoryId);

  if (!album) {
    throw new Error("Album not found");
  }

  if (!category) {
    throw new Error("Category not found");
  }

  await Songs.create({ ...body, album: albumId, category: categoryId });

  const showNbTracks = album.showNbTracks ? album.showNbTracks + 1 : 1;
  const lastSongAddedAt = new Date();

  await Album.findByIdAndUpdate(albumId, { showNbTracks, lastSongAddedAt });
};

const deleteSong = async (albumId: string, songId: string): Promise<void> => {
  try {
    // Delete the song by ID
    const result = await Songs.findByIdAndDelete(songId);

    // If no document was deleted, throw an error
    if (!result) {
      throw new Error("Song not found");
    }

    const album = await Album.findById(albumId);

    if (album) {
      const showNbTracks = album.showNbTracks ? album.showNbTracks - 1 : 0;
      await Album.findByIdAndUpdate(albumId, { showNbTracks });
    }
  } catch (error) {
    throw new Error(`Failed to delete song`);
  }
};

const getSongsByParams = async (albumId: string, categoryId: string) => {
  const songs = await Songs.find().sort({createdAt: -1})
  const filteredSongs = songs.filter(
    (song) =>
      new mongoose.Types.ObjectId(albumId).equals(song?.album) &&
      new mongoose.Types.ObjectId(categoryId).equals(song?.category)
  )

  return filteredSongs
};

export { addSongToAlbum, deleteSong, getSongsByParams };
