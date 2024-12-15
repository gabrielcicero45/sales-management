import express from "express";
import cors from "cors";
import saleRoutes from "./routes/sale.routes";
import purchaseRoutes from "./routes/purchase.routes";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sales", saleRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/products", productRoutes);

export default app;
