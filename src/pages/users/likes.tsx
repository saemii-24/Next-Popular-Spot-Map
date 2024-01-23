import { useSession } from "next-auth/react";

const LikesPage = () => {
  const { data: session } = useSession();

  console.log(session);
  return <div>LikesPage</div>;
};

export default LikesPage;
