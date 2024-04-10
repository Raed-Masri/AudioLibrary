import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { addCategory } from './services/categoryServices';
import { categoryRoutes, albumRoutes, userRoutes, songRoutes } from './routes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/audio-library', {
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Test Case
async function testCase() {
    try {
        // const popCategory = await addCategory('Pop', 'Pop Music');
        // console.log('Pop Category:', popCategory);

        // const jazzCategory = await addCategory('Jazz', 'Jazz Music');
        // console.log('Jazz Category:', jazzCategory);


        // Add more test cases here as per your requirements
    } catch (error) {
        console.error('Error in test case:', error);
    }
}

app.use("/category", categoryRoutes);
app.use("/album", albumRoutes);
app.use("/user",userRoutes);
app.use("/song",songRoutes);
// Run the test case
testCase();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});