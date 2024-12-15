import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
    })
  ),
});

export const createPurchaseSchema = z.object({
  saleId: z.number(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
    })
  ),
});

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };
