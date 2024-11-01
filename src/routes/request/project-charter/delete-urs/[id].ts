import { Response, Request } from "express";
import { db1 } from "@/utils/db1";

export const put = [async (req: Request, res: Response) => {
  if (req.method !== "PUT")
    return res.status(405).json({
      error: "Method Not Allowed",
    });

  try {
    await db1.tr_project_scope.update({ where: { id: parseInt(req.params.id) }, data: req.body })

    return res.json({ status: true, data: 'Succeed' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: "Internal Server Error" });
  }
}];