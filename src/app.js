//const express = require("express"); // para versiones de Node < 16
import express from "express";
import "./config.js";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// convertir a JSON el req.body antes de llegar a las rutas
app.use(express.json());
//app.get("/employees", (req, res) => res.send("Obteniendo empleados"));
app.use("/api", indexRoutes);
app.use("/api", employeesRoutes);
// rutas not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
