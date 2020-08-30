import React, { useState } from 'react';
import gallery1 from '../../images/gallery/gallery1.png';
import gallery2 from '../../images/gallery/gallery2.png';
import gallery3 from '../../images/gallery/gallery3.png';
import gallery4 from '../../images/gallery/gallery4.png';
import gallery5 from '../../images/gallery/gallery5.png';
import gallery6 from '../../images/gallery/gallery6.png';
import cross from '../../images/cross.svg';
import ImageGallery from 'react-image-gallery';

import './Gallery.scss';

const images = [
  {
    original: gallery1,
    className: 'gallery1'
  },
  {
    original: gallery2,
    className: 'gallery2'
  },
  {
    original: gallery3,
    className: 'gallery3'
  },
  {
    original: gallery4,
    className: 'gallery4'
  },
  {
    original: gallery5,
    className: 'gallery5'
  },
  {
    original: gallery6,
    className: 'gallery6'
  },
]

const Gallery = () => {
  const [isOpen, setFullScreen] = useState(false);
  const [startImage, setStartImage] = useState(0);

  const toggleImagePress = (index) => {
    setFullScreen(true);
    setStartImage(index);
  }

  return (
    <div className="gallery" id="gallery">
      <h2>gallery</h2>
      <div className="gallery-photos">
        {window.innerWidth > 500 && images.map((image, index) => {
          return (
            <div key={index} className={`gallery-item ${image.className}`} onClick={() => toggleImagePress(index)}>
              <img src={image.original} alt="image" />
            </div>
          )
        })}
      </div>
      {(isOpen || window.innerWidth < 500) && (
        <div className="image-gallery-wrapper">
          <div className="close-button" onClick={() => setFullScreen(false)}>
            <img src={cross} />
          </div>
          <ImageGallery 
            startIndex={startImage} 
            items={images} 
            useBrowserFullscreen={true} 
            showBullets={false} 
            showThumbnails={false} 
            showPlayButton={false}
            showFullscreenButton={false}
            renderRightNav={(onClick, disabled) => {
              return (
                <button 
                  disabled={disabled}
                  className="next"
                  onClick={(event) => {
                    onClick() 
                    event.stopPropagation()
                  }}>
                  <svg fill="#fff" stroke="none" width="15" height="27" viewBox="0 0 15 27"><g fill-rule="evenodd"><path fill-rule="nonzero" d="M.198 25.926l1.06 1.06 13.259-13.258L1.258.47.198 1.53l12.197 12.198z"></path></g></svg>
                </button>
              )
            }}
            renderLeftNav={(onClick, disabled) => {
              return (
                <button 
                  disabled={disabled} 
                  className="prev"
                  onClick={(event) => {
                    onClick() 
                    event.stopPropagation()
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="none" width="15" height="27" viewBox="0 0 15 27"><g fill-rule="evenodd"><path fill-rule="nonzero" d="M14.258 1.53L13.198.47-.061 13.728l13.259 13.258 1.06-1.06L2.061 13.728z"></path></g></svg>
                </button>
              )
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Gallery;
