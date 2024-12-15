import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data:req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto"+ error });
  }
};

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};