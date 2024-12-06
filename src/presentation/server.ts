import express, { Router } from "express";

interface ServerProps {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor({ port = 3000, routes }: ServerProps) {
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Usar rutas
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server Running on Port ${this.port}`);
    });
  }
}
