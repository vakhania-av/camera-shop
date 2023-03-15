import { useState } from 'react';
import { SIMILARS_COUNT } from '../../const';
import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type SimilarProductsProps = {
  cameras: Camera[];
}

function SimilarProducts({ cameras }: SimilarProductsProps): JSX.Element {
  const [startIdx, setStartIdx] = useState(0);
  const [currentPage, setPage] = useState(1);

  const pagesCount = Math.ceil(cameras.length / 3);

  const handleNextBtnClick = () => {
    setPage(currentPage + 1);
    setStartIdx(startIdx + SIMILARS_COUNT);
  };

  const handlePrevBtnClick = () => {
    setPage(currentPage - 1);
    setStartIdx(startIdx - SIMILARS_COUNT);
  };

  return (
    <section className='product-similar'>
      <div className='container'>
        <h2 className='title title--h3'>Похожие товары</h2>
        <div className='product-similar__slider'>
          <div className='product-similar__slider-list'>
            { cameras.slice(startIdx, SIMILARS_COUNT + startIdx).map((camera) => (
              <ProductCard key={camera.id} camera={camera} isActive />
            )) }
          </div>
          <button
            className='slider-controls slider-controls--prev'
            type='button'
            aria-label='Предыдущий слайд'
            onClick={handlePrevBtnClick}
            disabled={currentPage === 1}
          >
            <svg width='7' height='12' aria-hidden='true'>
              <use xlinkHref='#icon-arrow' />
            </svg>
          </button>
          <button
            className='slider-controls slider-controls--next'
            type='button'
            aria-label='Следующий слайд'
            onClick={handleNextBtnClick}
            disabled={currentPage === pagesCount}
          >
            <svg width='7' height='12' aria-hidden='true'>
              <use xlinkHref='#icon-arrow' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
