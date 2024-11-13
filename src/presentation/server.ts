import express from "express";

interface ServerProps {
  port: number;
}

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor({ port = 3000 }: ServerProps) {
    this.port = port;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server Running on Port ${this.port}`);
    });
  }
}
