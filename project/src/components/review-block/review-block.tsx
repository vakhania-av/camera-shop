import { useState } from 'react';
import { REVIEW_COUNT_PER_STEP } from '../../const';
import { Review } from '../../types/review';
import { sortReviewsByDate } from '../../utils';
import ReviewItem from '../review-item/review-item';

type ReviewBlockProps = {
  reviews: Review[];
};

function ReviewBlock({ reviews }: ReviewBlockProps): JSX.Element {
  const [showedReviews, setShowedReviews] = useState(REVIEW_COUNT_PER_STEP);

  const reviewsCount = reviews.length;
  const sortedReviews = reviews.slice().sort(sortReviewsByDate);

  const handleMoreBtnClick = () => {
    let reviewsToShow = showedReviews + REVIEW_COUNT_PER_STEP;

    if (reviewsToShow > reviewsCount) {
      reviewsToShow = reviewsCount;
    }

    setShowedReviews(reviewsToShow);
  };

  return (
    <section className='review-block'>
      <div className='container'>
        <div className='page-content__headed'>
          <h2 className='title title--h3'>Отзывы</h2>
          <button className='btn' type='button'>
            Оставить свой отзыв
          </button>
        </div>
        <ul className='review-block__list'>
          {sortedReviews.slice(0, showedReviews).map((review) => (
            <ReviewItem key={review.id} reviewItem={review} />
          ))}
        </ul>
        <div className='review-block__buttons'>
          {reviewsCount > showedReviews && (
            <button
              className='btn btn--purple'
              type='button'
              onClick={handleMoreBtnClick}
            >
              Показать больше отзывов
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReviewBlock;
