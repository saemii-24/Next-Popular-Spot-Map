/* eslint-disable @next/next/no-img-element */
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { CommentApiResponse } from "@/interface";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentProps {
  storeId: number;
}

const Comments = ({ storeId }: CommentProps) => {
  const { status } = useSession();
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const fetchComments = async () => {
    const { data } = await axios.get(
      `/api/comments?storeId=${storeId}&limit=10&page=${page}`
    );
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
