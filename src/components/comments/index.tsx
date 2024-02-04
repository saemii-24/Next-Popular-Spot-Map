/* eslint-disable @next/next/no-img-element */
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";
import { CommentApiResponse } from "@/interface";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentProps {
  storeId: number;
  page: string;
}

const Comments = ({ storeId, page = "1" }: CommentProps) => {
  const { status } = useSession();

  const fetchComments = async () => {
    const { data } = await axios.get(
      `/api/comments?storeId=${storeId}&limit=10&page=${page}`
    );
    console.log(data);
    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comments-${storeId}-${page}`,
    fetchComments
  );

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {/* comment form */}
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      {/* comment list */}
      <CommentList comments={comments} />

      <Pagination
        total={comments?.totalPage}
        page={page}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
};

export default Comments;
