import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.router";
import dashboardDiropsRouter from "./routes/dashboard-dirops.router";
import dashboardProcurementRouter from "./routes/dashboard-procurement.router";
import dashboardUserRouter from "./routes/dashboard-user.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/procurements", dashboardUserRouter);
app.use("/dirops", dashboardDiropsRouter);
app.use("/notes", dashboardProcurementRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
