import { Request, Response, Router } from "express";

import { compile } from "morgan";
import { Poem, IPoem } from "../models/Poem";
import populatePoems from "../../data/poems";

const router: Router = Router();

router.get("/api/poems", async (req: Request, res: Response) => {
  try {
    const poems: IPoem[] | null = await Poem.find();
    if (!poems) {
      res.status(404).json({ message: "No poems found" });
    }
    res.json(poems);
  } catch (error: any) {
    console.log(`Error while fetching poems: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/poems/:id", async (req: Request, res: Response) => {
  try {
    const poem: IPoem | null = await Poem.findById(req.params.id);
    if (!poem) {
      res.status(404).json({ message: "No poem found" });
    }
    res.json(poem);
  } catch (error: any) {
    console.log(`Error while fetching poems: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/poem", async (req: Request, res: Response) => {
  try {
    const existingPoem: IPoem | null = await Poem.findOne({
      poem: req.body.poem,
    });
    if (existingPoem) {
      res.status(403).json({ message: "Poem already existed" });
    }
    const poem: IPoem = new Poem({
      poem: req.body.poem,
      vip: req.body.vip,
      date: new Date(),
    });
    await poem.save();
    console.log("Poem saved!");
    res.status(201).json({ message: "Poem saved successfully" });
  } catch (error: any) {
    console.error(`Error while saving poem: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/api/poems/populate", async (req: Request, res: Response) => {
  for (let i = 0; i < populatePoems.length; i++) {
    const poem: IPoem = new Poem({
      poem: populatePoems[i].poem,
      vip: false,
      date: new Date(),
    });
    await poem.save();
  }
  console.log("Database populated");
  res.json({ message: "Database populated" });
});

export default router;
