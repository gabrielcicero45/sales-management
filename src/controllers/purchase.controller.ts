import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createPurchase = async (req: Request, res: Response) => {
  const { saleId, products } = req.body;

  try {
    const purchase = await prisma.purchase.create({
      data: {
        saleId,
        products: {
          create: products.map((p: any) => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        },
      },
    });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar compra" });
  }
};

export const getPurchases = async (_: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        products: {
          include: { product: true },
        },
      },
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar compras" });
  }
};
