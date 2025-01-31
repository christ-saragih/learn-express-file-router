import { main_db } from "@/lib/db";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { CustomRequest } from "@/types";
import { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
  const todoCategories = await main_db.mst_todo_category.findMany({
    where: {
      deleted_at: null,
    },
  });

  res.status(200).json({
    message: "Kategori todo berhasil diambil",
    data: todoCategories,
  });
};

export const post = [
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { name } = req.body;
    const created_by = req.user.name;

    const newTodoCategory = await main_db.mst_todo_category.create({
      data: {
        name,
        created_by,
      },
    });

    return res.status(201).json({
      message: "Kategori todo berhasil dibuat",
      data: newTodoCategory,
    });
  },
];
