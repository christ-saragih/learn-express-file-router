import { main_db } from "@/lib/db";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const todoCategory = await main_db.mst_todo_category.findFirst({
    where: {
      id,
      deleted_at: null,
    },
  });

  if (!todoCategory) {
    return res.status(404).json({
      message: "Kategori todo tidak ditemukan",
    });
  }

  return res.status(200).json({
    message: "Kategori todo berhasil diambil",
    data: todoCategory,
  });
};

export const put = [
  authMiddleware,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const isExist = await main_db.mst_todo_category.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!isExist) {
      return res.status(404).json({
        message: "Kategori todo tidak ditemukan",
      });
    }

    const todoCategory = await main_db.mst_todo_category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(200).json({
      message: "Kategori todo berhasil diubah",
      data: todoCategory,
    });
  },
];

export const del = [
  authMiddleware,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    // Cek apakah kategori ada dan belum dihapus
    const isExist = await main_db.mst_todo_category.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!isExist) {
      return res.status(404).json({
        message: "Kategori todo tidak ditemukan",
      });
    }

    // Cek apakah ada todos yang terkait dengan kategori
    const relatedTodo = main_db.tr_todo.findMany({
      where: {
        category_id: id,
        deleted_at: null,
      },
    });

    if (relatedTodo) {
      return res.status(400).json({
        message:
          "Kategori ini tidak bisa dihapus karena masih digunakan oleh todo",
      });
    }

    const todoCategory = await main_db.mst_todo_category.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return res.status(200).json({
      message: "Kategori todo berhasil dihapus",
      data: todoCategory,
    });
  },
];
