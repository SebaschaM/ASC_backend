import { Request, Response, Router } from "express";

const router = Router();

router.get("/items", (_req: Request, res: Response) => {
  res.send({ message: "Hello from items!" });
});

export default router;
