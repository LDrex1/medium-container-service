import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB: Connected Succesfully"))
  .catch((err) => console.log(err.message));
