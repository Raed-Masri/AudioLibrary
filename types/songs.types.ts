import { ObjectId } from 'mongodb';

interface ISong {
  _id: ObjectId;
  name: string;
  singer: string;
  category: ObjectId;
  album: ObjectId;
}

export default ISong;