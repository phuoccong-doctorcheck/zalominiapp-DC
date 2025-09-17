import React, { useEffect, useState, useRef, useMemo } from "react";
import { Box, Icon, Text } from "zmp-ui";
import "./styles.scss";
import { mapModifiers } from "../../../utils/functions";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
export interface ImageItem {
  src: string;
  thumbnail: string;
}

interface PreviewImagesProps {
  visible: boolean;
  activeIndex: number;
  onClose: () => void;
  images: ImageItem[];
}

const PreviewImages: React.FC<PreviewImagesProps> = ({
  visible,
  activeIndex,
  onClose,
  images,
}) => {
  const [dataIndex, setDataIndex] = useState<number>(activeIndex);
  const [isZoom, setIsZoom] = useState(false)
  const [thumbnailOffset, setThumbnailOffset] = useState<number>(0);
  const thumbnailRef = useRef<any>(null);
  const activeItemRef = useRef(null);
  useEffect(() => {
    setDataIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (activeItemRef.current) {
      (activeItemRef.current as any)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [dataIndex]);

  useEffect(() => {
    const container: any = document.getElementById('thumbnail-container');

    const handleScroll = () => {
      const thumbnails = document.getElementsByClassName('p-image_preview_thumbnail_item');
      const containerRect = container.getBoundingClientRect();

      // Kiểm tra nếu ở đầu hoặc cuối container
      if (container.scrollLeft === 0) {
        thumbnails[0]?.classList.add('center-thumbnail');
        thumbnails[1]?.classList.remove('center-thumbnail');
      } else if (container.scrollLeft + containerRect.width >= container.scrollWidth) {
        thumbnails[thumbnails.length - 1]?.classList.add('center-thumbnail');
        thumbnails[thumbnails.length - 2]?.classList.remove('center-thumbnail');
      } else {
        // Nếu không ở đầu hoặc cuối, thực hiện logic trung tâm
        let middleIndex = -1;
        let minDistance = Infinity;

        for (let i = 0; i < thumbnails.length; i++) {
          const thumbnailRect = thumbnails[i].getBoundingClientRect();
          const distance = Math.abs(thumbnailRect.left - containerRect.left - containerRect.width / 2.2);

          if (distance < minDistance) {
            minDistance = distance;
            middleIndex = i;
          }
        }

        for (let i = 0; i < thumbnails.length; i++) {
          thumbnails[i]?.classList.toggle('center-thumbnail', i === middleIndex);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Gọi hàm một lần để xác định trạng thái ban đầu

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);



  useEffect(() => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollLeft = thumbnailOffset;
    }
  }, [thumbnailOffset]);

  const memoryImage = useMemo(() => {
    const selectedImage = images.find((item, index) => index + 1 === dataIndex);

    return (
      <TransformWrapper
        onTransformed={(ref: any, state: { scale: number }) => {
          if (state.scale > 1) { setIsZoom(true) } else {
            setIsZoom(false)
          }
        }}
        doubleClick={{ step: 1 }}
      >
        <TransformComponent contentClass={isZoom ? `react-transform-wrapper_scale` : ''}>
          {selectedImage && <img src={selectedImage.src} />}
        </TransformComponent>
      </TransformWrapper>
    )
  }, [dataIndex, isZoom])

  const memoryThumbnail = useMemo(() => {

    return (
      <Box className={mapModifiers("p-image_preview_thumbnail", images.length > 3 && 'flex')} id="thumbnail-container" ref={thumbnailRef}>
        {images.map((item, index) => (
          <div
            key={index}
            id={`p-image_preview_thumbnail_item${index + 1 === dataIndex ? "-active" : ''}`}
            className={mapModifiers("p-image_preview_thumbnail_item", index + 1 === dataIndex && "active", (dataIndex === 1 || dataIndex === images.length - 1) && 'active-1')}
            onClick={() => { setDataIndex(index + 1); }}
            ref={index + 1 === dataIndex ? activeItemRef : null}
          >
            <img src={item.src} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </Box>
    )
  }, [dataIndex])

  return (
    <div
      className={mapModifiers("p-image_preview", visible ? "active" : "hide")}
    >
      <Box className="p-image_preview_header relative">
        {visible && (
          <div
            onClick={onClose}
            className="p-image_preview_header_close cursor-pointer w-fit bg-[white] p-2 rounded-md text-[red] flex items-center justify-center shadow-md"
          >
            <Text>Đóng</Text>
          </div>
        )}
        <Text className="w-full text-center text-[white] text-[18px]">
          {`${dataIndex} / ${images.length}`}
        </Text>
      </Box>
      <Box className="p-image_preview_body">
        <Box className="p-image_preview_main" onWheel={() => { }}>
          {memoryImage}
          <Box className="p-image_preview_main_button">
            <div
              onClick={() => {
                if (dataIndex > 1) {
                  setDataIndex((prev) => prev - 1);
                }
              }}
            >
              <Icon icon="zi-chevron-left" />
            </div>
            <div
              onClick={() => {
                if (dataIndex < images.length) {
                  setDataIndex((prev) => prev + 1);
                }
              }}
            >
              <Icon icon="zi-chevron-right" />
            </div>
          </Box>
        </Box>
        {memoryThumbnail}
      </Box>
    </div>
  );
};

export default PreviewImages;
