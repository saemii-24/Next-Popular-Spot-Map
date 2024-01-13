import { useRouter } from "next/router";

const StoreEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>StoreEditPage : {id}</div>;
};

export default StoreEditPage;
