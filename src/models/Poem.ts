import mongoose, { Document, Schema } from "mongoose";

// create an interface
interface IPoem extends Document {
  poem: string;
  vip: boolean;
  date: Date;
}

// new Schema for the document
let poemSchema: Schema = new Schema({
  poem: { type: String, required: true },
  vip: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

// create a model
const Poem: mongoose.Model<IPoem> = mongoose.model<IPoem>("Poem", poemSchema);

export { Poem, IPoem };
