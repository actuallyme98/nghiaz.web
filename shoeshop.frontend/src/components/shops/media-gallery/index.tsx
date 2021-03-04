import React, { useMemo, useState, useCallback, useRef } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Modal from 'antd/lib/modal';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import Slider from 'react-slick';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface IProps {
  mediaFiles: Array<{
    url: string;
    type: string;
    thumbnail: string;
  }>;
}

const MediaGallery: React.FC<IProps> = (props) => {
  const { mediaFiles } = props;
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const galleryRef = useRef<ImageGallery>(null);
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const handleSelectMedia = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setSelectedMedia(Number(event.currentTarget.dataset.index));
  }, []);

  const handleShowAll = useCallback(() => {
    setShowAll(true);
  }, []);

  const handleCloseShowAll = useCallback(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
      }
    });
    setShowAll(false);
  }, []);

  const renderListMedia = useMemo(
    () =>
      mediaFiles.slice(0, 4).map((media, index) =>
        mediaFiles.length > 3 && index === 3 ? (
          <div
            key={index}
            className={clsx(css.item, css.seeMore)}
            style={{ backgroundImage: `url("${media.thumbnail}"` }}
            onClick={handleShowAll}
            data-index={index}
          />
        ) : (
          <div
            key={index}
            className={clsx(css.item, {
              [css.active]: selectedMedia === index,
              [css.videoItem]: media.type === 'video',
            })}
            style={{ backgroundImage: `url("${media.thumbnail}"` }}
            onClick={handleSelectMedia}
            data-index={index}
          />
        ),
      ),
    [handleSelectMedia, handleShowAll, selectedMedia, mediaFiles],
  );

  const imageGalleryItems = useMemo(
    () =>
      mediaFiles.map<ReactImageGalleryItem>((i, index) => ({
        original: i.url,
        thumbnail: i.thumbnail,
        renderThumbInner: (props) => (
          <img draggable={false} src={props?.thumbnail} alt={props?.thumbnailAlt} />
        ),
        thumbnailClass: css.thumbnail,
        type: i.type,
        renderItem: (item: ReactImageGalleryItem & typeof i) => {
          if (item.type === 'video') {
            return (
              <video
                draggable={false}
                className={css.sliderItem}
                poster={item.thumbnail}
                src={item.original}
                controls
                playsInline
                disablePictureInPicture
                controlsList="nodownload"
              />
            );
          } else {
            return (
              <img
                draggable={false}
                alt={item.originalTitle}
                className={css.sliderItem}
                src={item.original}
              />
            );
          }
        },
      })),
    [mediaFiles],
  );

  const handleSlide = useCallback(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
      }
    });
  }, []);

  const handdleShowFullScreen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const element = event.currentTarget;
    if (galleryRef.current) {
      galleryRef.current.slideToIndex(Number(element.dataset.index));
      const child = element.firstChild;
      if (child instanceof HTMLVideoElement) {
        child.pause();
      }
      setShowAll(true);
    }
  }, []);

  if (isMobile) {
    return (
      <Slider
        dots
        className={css.slider}
        dotsClass={css.dots}
        afterChange={handleSlide}
        appendDots={(dots: React.ReactNode[]) => (
          <div className={css.dots}>
            {dots}/{dots.length}
          </div>
        )}
        customPaging={(i) => <div>{i + 1}</div>}
      >
        {mediaFiles.map((media, index) => (
          <div
            className={css.wrapMedia}
            key={index}
            data-index={index}
            onClick={handdleShowFullScreen}
          >
            {media.type === 'image' ? (
              <img className={css.sliderItem} src={media.url} alt="sliderItem" />
            ) : (
              <iframe
                width="560"
                height="315"
                src={mediaFiles[selectedMedia].url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              // <video
              //   poster={media.thumbnail}
              //   disablePictureInPicture
              //   className={css.sliderItem}
              //   src={media.url}
              //   playsInline
              //   controls
              //   controlsList="nodownload"
              // />
            )}
          </div>
        ))}
      </Slider>
    );
  }

  return (
    <div className={css.root}>
      <div className={css.list}>{renderListMedia}</div>
      {mediaFiles.length > 0 && (
        <div className={css.wrapMedia} onClick={handdleShowFullScreen} data-index={selectedMedia}>
          {mediaFiles[selectedMedia].type === 'image' ? (
            <img className={css.media} src={mediaFiles[selectedMedia].url} alt="media" />
          ) : (
            <iframe
              width="450"
              height="348"
              src={mediaFiles[selectedMedia].url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            // <video
            //   className={css.media}
            //   disablePictureInPicture
            //   poster={mediaFiles[selectedMedia].thumbnail}
            //   src={mediaFiles[selectedMedia].url}
            //   playsInline
            //   controls
            //   controlsList="nodownload"
            // />
          )}
        </div>
      )}
      <Modal
        visible={showAll}
        footer={null}
        className={css.modal}
        onCancel={handleCloseShowAll}
        forceRender
      >
        <ImageGallery
          ref={galleryRef}
          items={imageGalleryItems}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={false}
          onSlide={handleSlide}
        />
      </Modal>
    </div>
  );
};

export default MediaGallery;
