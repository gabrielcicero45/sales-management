import { Router } from "express";
import { createPurchase, getPurchases } from "../controllers/purchase.controller";
import { validate , createPurchaseSchema} from "../middlewares/validation.middleware";


const router = Router();

router.post("/", validate(createPurchaseSchema), createPurchase);
router.get("/", getPurchases);

export default router;
