import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          nextmap
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/stores/likes" className="navbar__list--item">
            찜한 가게
          </Link>

          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        {/* mobile button */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
        {/* mobile navbar */}
        {isOpen && (
          <div className="navbar--mobile">
            <div className="navbar__list--mobile">
              <Link href="/stores" className="navbar__list--itemt--mobile">
                맛집 목록
              </Link>
              <Link href="/stores/new" className="navbar__list--itemt--mobile">
                맛집 등록
              </Link>
              <Link
                href="/stores/likes"
                className="navbar__list--itemt--mobile"
              >
                찜한 가게
              </Link>
              <Link
                href="/api/auth/signin"
                className="navbar__list--itemt--mobile"
              >
                로그인
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
