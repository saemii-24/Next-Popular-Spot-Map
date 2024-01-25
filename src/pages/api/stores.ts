import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db";
import { StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const { page = "", limit = "", q, district, id }: ResponseType = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    //데이터 생성 처리
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(
      ` https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );
    //prisma에 새로운 데이터를 넣기 위함
    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  } else if (req.method === "PUT") {
    //데이터 수정 처리
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(
      ` https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );
    const result = await prisma.store.update({
      where: { id: formData.id }, //어떤 데이터를 업데이트 할 것인지 조건문
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  } else if (req.method === "DELETE") {
    //데이터 삭제
    if (id) {
      const result = await prisma.store.delete({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(200).json(result);
    }
    return res.status(500).json(null);
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
        include: {
          likes: {
            where: session ? { userId: session.user.id } : {},
          },
        },
      });
      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
