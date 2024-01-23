import React, { useEffect } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  // console.log(status);
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-blue-800 text-center text-2xl font-semibold italic">
          Nextmap
        </div>
        <div className="text-center mt-6 text-2xl font-bold text-gray-600">
          SNS 게정으로 로그인 해주세요
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          계정이 없다면 자동으로 회원가입이 진행됩니다.
        </p>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-white flex gap-3 bg-[#4285f4] hover:bg-[#4285f4]/90 font-medium rounded-lg w-full px-5 py-3 text-center items-center justify-center"
          >
            <AiOutlineGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            className="text-white flex gap-4 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-3 text-center items-center justify-center"
          >
            <SiNaver className="w-4 h-4" />
            Sign in with Naver
          </button>
          <button
            type="button"
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
            className="text-black flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            <RiKakaoTalkFill className="w-6 h-6" />
            Sign in with Kakao
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
