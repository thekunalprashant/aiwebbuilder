import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { domainRoutes } from "./routes/domain.routes";
import { requireTenant } from "./middleware/tenant";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, limit: 120 }));
app.use(requireTenant);
app.use("/api", domainRoutes);

app.listen(4001, () => {
  console.log("API server listening on :4001");
});
