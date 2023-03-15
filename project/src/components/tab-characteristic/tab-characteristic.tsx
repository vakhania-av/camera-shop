import { TabType } from '../../const';
import { Camera } from '../../types/camera';

import classnames from 'classnames';

type TabCharacteristicProps = {
  camera: Camera;
  tabType: TabType;
};

function TabCharacteristic({ camera, tabType }: TabCharacteristicProps): JSX.Element {
  const className = classnames('tabs__element', { 'is-active': tabType === TabType.Characteristic });
  const { vendorCode, category, type, level } = camera;

  return (
    <div className={className} data-testid='tab-characteristic'>
      <ul className='product__tabs-list'>
        <li className='item-list'>
          <span className='item-list__title'>Артикул:</span>
          <p className='item-list__text'> {vendorCode}</p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Категория:</span>
          <p className='item-list__text'>{category}</p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Тип камеры:</span>
          <p className='item-list__text'>{type}</p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Уровень:</span>
          <p className='item-list__text'>{level}</p>
        </li>
      </ul>
    </div>
  );
}

export default TabCharacteristic;
