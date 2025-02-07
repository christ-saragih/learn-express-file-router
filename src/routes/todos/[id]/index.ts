import { main_db } from "@/lib/db";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { CustomRequest } from "@/types";
import { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const todo = await main_db.tr_todo.findFirst({
    where: {
      id,
      deleted_at: null,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!todo) {
    return res.status(404).json({
      message: "Todo tidak ditemukan",
    });
  }

  return res.status(200).json({
    message: "Todo berhasil diambil",
    data: todo,
  });
};

export const put = [
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { category_id, title, description, progress } = req.body;
    const id = parseInt(req.params.id);

    console.log("Ini dari PUT: ", req.user);

    const isExist = await main_db.tr_todo.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });

    if (!isExist) {
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      });
    }

    const todo = await main_db.tr_todo.update({
      where: {
        id,
      },
      data: {
        category_id,
        title,
        description,
        progress,
      },
    });

    return res.status(203).json({
      message: "Todo berhasil diubah",
      data: todo,
    });
  },
];

export const del = [
  authMiddleware,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const isExist = await main_db.tr_todo.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!isExist) {
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      });
    }

    const todo = await main_db.tr_todo.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return res.status(200).json({
      message: "Todo berhasil dihapus",
      data: todo,
    });
  },
];
