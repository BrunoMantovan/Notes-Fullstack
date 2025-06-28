import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
        id:{
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
            required: true,
        },
        headerColor: {
            type: String,
            required: true,
        }
    },
    { _id: false }
)
const NoteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: false,
        },
        color: colorSchema,
        position: {
            type: {
                x: {
                    type: Number,
                    required: true,
                },
                y: {
                    type: Number,
                    required: true,
                }
            },
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        isArchived: {
            type: Boolean,
            default: false,
            required: true,
        },
        categories: {
            type: [String],
            default: [],
            required: true
        }
    }
)


const Note = mongoose.model("Note", NoteSchema);
export default Note;