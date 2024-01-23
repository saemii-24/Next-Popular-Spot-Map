import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db";
import { StoreApiResponse, StoreType } from "@/interface";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;
  if (req.method === "POST") {
    //데이터 생성 처리
    const data = req.body;
    //prisma에 새로운 데이터를 넣기 위함
    const result = await prisma.store.create({
      data: { ...data },
    });
    return res.status(200).json(result);
  } else {
    if (page) {
      const count = await prisma.store.count();
      const skipPage = parseInt(page) - 1;
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          name: q ? { contains: q } : {},
          address: district ? { contains: district } : {},
        },
        take: 10,
        skip: skipPage * 10,
      });

      //totalpage, data, page, totalCount
      res.status(200).json({
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      });
    } else {
      const { id }: { id?: string } = req.query;
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          id: id ? parseInt(id) : {},
        },
      });
      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
