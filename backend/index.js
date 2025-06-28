import express from 'express';
import mongoose from 'mongoose';
import Note from './models/note.model.js';
import cors from 'cors';
import dotenv from 'dotenv'


const app = express();
dotenv.config();

const uri = process.env.MONGODB_URI
const port = process.env.PORT

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (e) {
        console.error("Error in GET /api/notes:", e);
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/notes', async (req, res) => {
    try{
        const note = await Note.create(req.body)
        res.status(200).json(note)
    } catch (e){
        console.error("Error in POST /api/notes:", e);
        res.status(500).json({ error: error.message });
    }
})

app.put('/api/notes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true })

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        const updatedNote = await Note.findById(id);
        res.status(200).json(updatedNote);
    } catch (e) {
        console.error("Error in PUT /api/notes/:id:", e);
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (e) {
        console.error("Error in DELETE /api/notes/:id:", e);
    }
});

mongoose.connect(uri)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () =>{
        console.log(`Server is running on port ${port} - http://localhost:${port}/`);
        
    })
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});