import { Response } from "express";

export const errorHandler = (
  error: any,
  res: Response,
  statusCode?: number,
  errorName?: string
) => {
  const status = statusCode || 400;
  const name = errorName || "Error";
  if (error instanceof Error) {
    if (error.name === "Error") {
      error.name = name;
    }
    res.status(status).json({
      name: error.name,
      message: error.message,
      statusCode: res.statusCode,
    });
  }
};
