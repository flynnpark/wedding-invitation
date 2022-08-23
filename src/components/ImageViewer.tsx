import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';

import classnames from 'utils/classnames';

interface IProps {
  images: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
    name: string;
  }[];
  currentIndex?: number;
  backgroundStyle?: CSSProperties;
  disableScroll?: boolean;
  closeOnClickOutside?: boolean;
  onClose?: () => void;
  closeComponent?: JSX.Element;
  leftArrowComponent?: JSX.Element;
  rightArrowComponent?: JSX.Element;
}

const navigationStyle =
  'h-[4/5] text-white cursor-pointer absolute text-6xl leading-[3.75em] font-bold flex items-center opacity-20 px-4 select-none hover:opacity-100';
const buttonTransition = 'transition-opacity';

const ImageViewer = ({
  images,
  backgroundStyle,
  disableScroll,
  closeOnClickOutside,
  onClose,
  closeComponent,
  leftArrowComponent,
  rightArrowComponent,
  ...rest
}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(rest.currentIndex ?? 0);

  const changeImage = useCallback(
    (delta: number) => {
      let nextIndex = (currentIndex + delta) % images.length;
      if (nextIndex < 0) nextIndex = images.length - 1;
      setCurrentIndex(nextIndex);
    },
    [currentIndex, images.length]
  );

  const handleClick = useCallback(
    (event: any) => {
      if (!event.target || !closeOnClickOutside) {
        return;
      }

      const checkId = event.target.id === 'ImageViewer';
      const checkClass = event.target.classList.contains(
        'react-simple-image-viewer__slide'
      );

      if (checkId || checkClass) {
        event.stopPropagation();
        onClose?.();
      }
    },
    [closeOnClickOutside, onClose]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === 'Escape') {
        onClose?.();
      }

      if (['ArrowLeft', 'h'].includes(event.key)) {
        changeImage(-1);
      }

      if (['ArrowRight', 'l'].includes(event.key)) {
        changeImage(1);
      }
    },
    [onClose, changeImage]
  );

  const handleWheel = useCallback(
    (event: any) => {
      if (event.wheelDeltaY > 0) {
        changeImage(-1);
      } else {
        changeImage(1);
      }
    },
    [changeImage]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if (!disableScroll) {
      document.addEventListener('wheel', handleWheel);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (!disableScroll) {
        document.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleKeyDown, handleWheel, disableScroll]);

  return (
    <div
      id="ImageViewer"
      className="react-simple-image-viewer__modal flex items-center fixed md:py-16 py-0 left-0 top-0 w-full h-full bg-black border box-border"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={backgroundStyle}
    >
      <span
        className={classnames(
          'react-simple-image-viewer__close text-white absolute top-4 right-4 text-4xl font-bold opacity-20 cursor-pointer hover:opacity-100',
          buttonTransition
        )}
        onClick={() => onClose?.()}
      >
        {closeComponent || '×'}
      </span>

      {images.length > 1 && (
        <span
          className={classnames(
            'react-simple-image-viewer__previous left-0',
            navigationStyle,
            buttonTransition
          )}
          onClick={() => changeImage(-1)}
        >
          {leftArrowComponent || '❮'}
        </span>
      )}

      {images.length > 1 && (
        <span
          className={classnames(
            'react-simple-image-viewer__next right-0',
            navigationStyle,
            buttonTransition
          )}
          onClick={() => changeImage(1)}
        >
          {rightArrowComponent || '❯'}
        </span>
      )}

      <div
        className="react-simple-image-viewer__modal-content m-auto p-0 w-[9/10] h-full max-h-full text-center"
        onClick={handleClick}
      >
        <div className="react-simple-image-viewer__slide h-full flex items-center justify-center select-none">
          <GatsbyImage
            image={images[currentIndex].childImageSharp.gatsbyImageData}
            alt={images[currentIndex].name}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;