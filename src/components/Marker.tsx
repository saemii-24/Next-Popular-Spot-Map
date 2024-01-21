import { mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";

interface MarkerProps {
  store: StoreType;
}

const Marker = ({ store }: MarkerProps) => {
  const map = useRecoilValue(mapState);

  const loadkakaoMarker = useCallback(() => {
    if (map && store) {
      //현재 선택한 식당 데이터 마커 하나 띄우기

      var imageSrc = store?.category
          ? `/images/markers/${store?.category}.png`
          : "/images/markers/default.png",
        imageSize = new window.kakao.maps.Size(40, 40),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      //마커 표시될 위치
      var markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lng);

      // 마커를 생성
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      //지도에 마커 표시
      marker.setMap(map);

      //마커에 커서가 오버되었을 때 마커 위 인포윈도우 생성
      var content = `<div class="infowindow">${store?.name}</div>`;

      //커스텀 오버레이 생성
      var customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      //마커에 마우스 오버 이벤트 등록
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        customOverlay.setMap(map);
      });
      //마커에 마우스 아웃 이벤트 등록
      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        customOverlay.setMap(null);
      });
    }
  }, [map, store]);

  useEffect(() => {
    loadkakaoMarker();
  }, [loadkakaoMarker, map]);

  return <></>;
};

export default Marker;
