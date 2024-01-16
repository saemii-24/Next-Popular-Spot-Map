import { StoreApiResponse } from "@/interface";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@/components/Pagination";

const StoreListPage = () => {
  const router = useRouter();
  const { page = "1" }: any = router.query; //기본값 0으로 줌

  console.log(page);
  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery(`stores-${page}`, async () => {
    //useQuery 안에 이름이 달라야 하므로 store-[page] 로 이름을 주었다.
    const { data } = await axios(`/api/stores?page=${page}`);
    //axios 요청시 파라미터로 page를 이용한다.
    return data as StoreApiResponse;
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.data.map((store, index) => (
            <li className="flex justify-between gap-x-6 py-4" key={index}>
              <div className="flex gap-x-4">
                <Image
                  className="h-12"
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : `/images/markers/default.png`
                  }
                  width={48}
                  height={48}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="text-sm font-semibold leading-9 text-gray-900">
                    {store?.name}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {store?.storeType}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="text-sm font-semibold leading-9 text-gray-900">
                  {store?.address}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  <>
                    {store?.phone ? (
                      <>{store?.phone} | </>
                    ) : (
                      <>{store?.phone}</>
                    )}
                  </>
                  <>
                    {store?.category ? (
                      <>{store?.foodCertifyName} | </>
                    ) : (
                      <>{store?.foodCertifyName}</>
                    )}
                  </>
                  <>{store?.category}</>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {stores?.totalPage && (
        <Pagination total={stores?.totalPage} page={page} />
      )}
    </div>
  );
};

export default StoreListPage;
