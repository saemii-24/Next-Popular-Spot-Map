import { mapState } from "@/atom";
import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import FullPageLoader from "./FullPageLoader";

const CurrentLocationButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    //현재 위치 가져오기
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }
          return currentPosition;
        },
        () => {
          setLoading(false);
          toast.success("현재 위치를 가져올 수 없습니다.");
        },
        options
      );
    }
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <MdOutlineMyLocation className="w-5 h-5" />
      </button>
    </>
  );
};

export default CurrentLocationButton;
