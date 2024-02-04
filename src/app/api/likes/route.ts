import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //session확인하기
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ status: 401 });
  }

  // //body 확인
  const { storeId }: { storeId: number } = await req.json();

  // //Like 데이터가 있는가?
  let like = await prisma.like.findFirst({
    where: {
      storeId,
      userId: session?.user?.id,
    },
  });

  // //만약 찜을 했다면 like 데이터 삭제 / 찜하지 않았다면 생성
  if (like) {
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return NextResponse.json({ status: 204 });
  } else {
    like = await prisma.like.create({
      data: {
        storeId,
        userId: session?.user?.id,
      },
    });
    return NextResponse.json(like, { status: 201 });
  }
}

export async function GET(req: Request) {
  //로그인 하지 않았다면 보여주지 않는다. => 로그인 화면으로 이동 됨
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ status: 401 });
  }
  // GET 요청 처리
  const count = await prisma.like.count({
    where: {
      userId: session.user.id,
    },
  });

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;

  const skipPage = parseInt(page) - 1;

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      userId: session.user.id,
    },
    include: {
      store: true,
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });
  return NextResponse.json(
    {
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    {
      status: 200,
    }
  );
}
