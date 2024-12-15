import { Router } from "express";
import { createSale, getProductSalesDemand, getSales } from "../controllers/sale.controller";
import { validate, createSaleSchema  } from "../middlewares/validation.middleware";

const router = Router();

router.post("/", validate(createSaleSchema), createSale);
router.get("/", getSales);
router.get("/product-sales", getProductSalesDemand);

export default router;
