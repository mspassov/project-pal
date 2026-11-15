import mongoose, { mongo } from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
})

export default mongoose.model("Client", ClientSchema);