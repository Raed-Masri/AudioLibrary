import Album from "../models/Album";

const addAlbum = async (body: any) => {
  try {
    await Album.create(body);
  } catch (error) {
    return error;
  }
};

const deleteAlbum = async (albumId: string) => {
  try {
    const albumFromDb = await Album.findById(albumId);
    // const allSongs = await Songs.find();
    // const songs = allSongs?.find((song) =>
    //   new mongoose.Types.ObjectId(albumId).equals(song?.album)
    // );

    if (albumFromDb?.showNbTracks && albumFromDb?.showNbTracks === 0) {
      await Album.findByIdAndDelete(albumId);
      return "Album Deleted";
    } else return "Album CANNOT be deleted";
  } catch (error) {
    return error;
  }
};

export { addAlbum, deleteAlbum };
