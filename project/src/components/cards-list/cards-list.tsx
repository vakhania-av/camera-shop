import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type CardsListProps = {
  cameras: Camera[];
};

function CardsList({ cameras }: CardsListProps): JSX.Element {
  return (
    <div className='cards catalog__cards'>
      {cameras.length ? (
        cameras.map((camera) => <ProductCard key={camera.id} camera={camera} />)
      ) : (
        <p>По вашему запросу ничего не найдено</p>
      )}
    </div>
  );
}

export default CardsList;
