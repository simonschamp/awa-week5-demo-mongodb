"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./src/routes/index"));
const morgan_1 = __importDefault(require("morgan")); // that helps us get logs and see how our app is working
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8000;
//Initial the database
const mongoDB = "mongodb://127.0.0.1:27017/poemdb";
// Connect the mongoose
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
//connect mongoose to database object
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", index_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
