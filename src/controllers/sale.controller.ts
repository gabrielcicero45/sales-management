import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createSale = async (req: Request, res: Response) => {
  const { products } = req.body;

  try {
    const sale = await prisma.sale.create({
      data: {
        products: {
          create: products.map((p: any) => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        },
      },
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar venda" });
  }
};

export const getSales = async (_: Request, res: Response) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        products: {
          include: { product: true },
        },
        purchases: true,
      },
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
};

export const getProductSalesDemand = async (_: Request, res: Response) => {
  try {
    const productSales = await prisma.saleProduct.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
      _count: {
        productId: true,
      },
    });

    const detailedSales = await Promise.all(
      productSales.map(async (sale) => {
        const product = await prisma.product.findUnique({
          where: { id: sale.productId },
        });
        return {
          product: product,
          totalQuantitySold: sale._sum.quantity || 0,
          totalSales: sale._count.productId || 0,
        };
      })
    );

    res.json(detailedSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao calcular vendas por produto" });
  }
};