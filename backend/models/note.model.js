import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
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
            required: true,
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
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
    }
)


const Note = mongoose.model("Note", NoteSchema);
export default Note;