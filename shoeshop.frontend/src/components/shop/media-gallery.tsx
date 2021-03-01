import React, { useMemo, useState, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// components
import Modal from '@material-ui/core/Modal';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import Slider from 'react-slick';

// redux
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';

interface IProps {
  mediaFiles: Array<{
    url: string;
    type: string;
    thumbnail: string;
  }>;
}

const MediaGallery: React.FC<IProps> = (props) => {
  const { mediaFiles } = props;
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const galleryRef = useRef<ImageGallery>(null);
  const classes = useStyles();

  const handleSelectMedia = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setSelectedMedia(Number(event.currentTarget.dataset.index));
  }, []);

  const handleShowAll = useCallback(() => {
    setShowAll(true);
  }, []);

  const handleCloseShowAll = useCallback(() => {
    // const videos = document.querySelectorAll('video');
    // videos.forEach((video) => {
    //   if (!video.paused) {
    //     video.pause();
    //   }
    // });
    setShowAll(false);
  }, []);

  const renderListMedia = useMemo(
    () =>
      mediaFiles.slice(0, 4).map((media, index) =>
        mediaFiles.length > 3 && index === 3 ? (
          <div
            key={index}
            className={clsx(classes.item, classes.seeMore)}
            style={{ backgroundImage: `url("${media.thumbnail}"` }}
            onClick={handleShowAll}
            data-index={index}
          />
        ) : (
          <div
            key={index}
            className={clsx(classes.item, {
              [classes.active]: selectedMedia === index,
              [classes.videoItem]: media.type === 'video',
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
        thumbnailClass: classes.thumbnail,
        type: i.type,
        renderItem: (item: ReactImageGalleryItem & typeof i) => {
          if (item.type === 'video') {
            return (
              <iframe
                width="560"
                height="315"
                src={item.original}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              // <video
              //   draggable={false}
              //   className={classes.sliderItem}
              //   poster={item.thumbnail}
              //   src={item.original}
              //   controls
              //   playsInline
              //   disablePictureInPicture
              //   controlsList="nodownload"
              // />
            );
          }
          return (
            <img
              draggable={false}
              alt={item.originalTitle}
              className={classes.sliderItem}
              src={item.original}
            />
          );
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
        className={classes.slider}
        dotsClass={classes.dots}
        afterChange={handleSlide}
        appendDots={(dots: React.ReactNode[]) => (
          <div className={classes.dots}>
            {dots}/{dots.length}
          </div>
        )}
        customPaging={(i) => <div>{i + 1}</div>}
      >
        {mediaFiles.map((media, index) => (
          <div
            className={classes.wrapMedia}
            key={index}
            data-index={index}
            onClick={handdleShowFullScreen}
          >
            {media.type === 'image' ? (
              <img className={classes.sliderItem} src={media.url} alt="sliderItem" />
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
              //   className={classes.sliderItem}
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
    <div className={classes.root}>
      <div className={classes.list}>{renderListMedia}</div>
      {mediaFiles.length > 0 && (
        <div
          className={classes.wrapMedia}
          onClick={handdleShowFullScreen}
          data-index={selectedMedia}
        >
          {mediaFiles[selectedMedia].type === 'image' ? (
            <img className={classes.media} src={mediaFiles[selectedMedia].url} alt="media" />
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
            //   className={classes.media}
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
      <Modal open={showAll} className={classes.modal} onClose={handleCloseShowAll}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  list: {
    display: 'block',
    marginRight: 12,
  },
  item: {
    cursor: 'pointer',
    display: 'block',
    width: 80,
    height: 80,
    borderRadius: 6,
    border: 'solid 1px #e0e0e0',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  active: {
    borderColor: '#f16728',
  },
  seeMore: {
    position: 'relative',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '"Xem thêm"',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      color: '#fff',
      border: 'solid 1px #e0e0e0',
      backgroundColor: 'rgba($color: #000000, $alpha: 0.5)',
    },
  },
  videoItem: {
    position: 'relative',
    backgroundSize: 'cover',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '""',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      backgroundImage: 'url("/assets/icons/video-play.svg")',
      backgroundSize: '24px 24px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  wrapMedia: {
    width: 440,
    height: 440,
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    border: 'solid 1px #e0e0e0',
    backgroundColor: '#ffffff',
    outline: 'none',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  thumbnail: {
    outline: 0,
    '& img': {
      pointerEvents: 'all',
      width: 90,
      height: 90,
      objectFit: 'contain',
      backgroundColor: 'black',
    },
  },
  slider: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  dots: {
    backgroundColor: 'rgba($color: #fff, $alpha: 0.9)',
    borderRadius: 15.5,
    border: 'solid 1px #d7d7d7',
    width: 63,
    position: 'absolute',
    right: 10,
    bottom: 14,
    fontSize: 15,
    fontWeight: 600,
    color: '#848484',
    textAlign: 'center',
    '& li': {
      display: 'none',
    },
  },
  sliderItem: {
    width: '100%',
    height: 360,
    marginBottom: -4,
    objectFit: 'contain',
    outline: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoWrapper: {
    position: 'relative',
  },
  playBtn: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#f16728',
  },
}));

export default MediaGallery;
