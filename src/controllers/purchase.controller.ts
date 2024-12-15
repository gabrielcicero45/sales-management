import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createPurchase = async (req: Request, res: Response) => {
  const { saleId, products } = req.body;

  try {
    const saleProducts = await prisma.saleProduct.findMany({
      where: {
        saleId,
        productId: {
          in: products.map((p: { productId: number }) => p.productId),
        },
      },
    });

    const validProductIds = saleProducts.map(
      (sp: { productId: number }) => sp.productId
    );
    const invalidProducts = products.filter(
      (p: { productId: number }) => !validProductIds.includes(p.productId)
    );

    if (invalidProducts.length > 0) {
      return res.status(400).json({
        error: "Alguns produtos não estão associados à venda especificada.",
        invalidProducts: saleProducts,
      });
    }
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
