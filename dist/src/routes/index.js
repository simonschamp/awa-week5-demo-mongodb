"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Poem_1 = require("../models/Poem");
const poems_1 = __importDefault(require("../../data/poems"));
const router = (0, express_1.Router)();
router.get("/api/poems", async (req, res) => {
    try {
        const poems = await Poem_1.Poem.find();
        if (!poems) {
            res.status(404).json({ message: "No poems found" });
        }
        res.json(poems);
    }
    catch (error) {
        console.log(`Error while fetching poems: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/api/poems/:id", async (req, res) => {
    try {
        const poem = await Poem_1.Poem.findById(req.params.id);
        if (!poem) {
            res.status(404).json({ message: "No poem found" });
        }
        res.json(poem);
    }
    catch (error) {
        console.log(`Error while fetching poems: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/api/poem", async (req, res) => {
    try {
        const existingPoem = await Poem_1.Poem.findOne({
            poem: req.body.poem,
        });
        if (existingPoem) {
            res.status(403).json({ message: "Poem already existed" });
        }
        const poem = new Poem_1.Poem({
            poem: req.body.poem,
            vip: req.body.vip,
            date: new Date(),
        });
        await poem.save();
        console.log("Poem saved!");
        res.status(201).json({ message: "Poem saved successfully" });
    }
    catch (error) {
        console.error(`Error while saving poem: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/api/poems/populate", async (req, res) => {
    for (let i = 0; i < poems_1.default.length; i++) {
        const poem = new Poem_1.Poem({
            poem: poems_1.default[i].poem,
            vip: false,
            date: new Date(),
        });
        await poem.save();
    }
    console.log("Database populated");
    res.json({ message: "Database populated" });
});
exports.default = router;
