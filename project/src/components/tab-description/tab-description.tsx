import { TabType } from '../../const';
import classnames from 'classnames';

type TypeDescriptionProps = {
  description: string;
  tabType: TabType;
};

function TabDescription({ description, tabType }: TypeDescriptionProps): JSX.Element {
  const className = classnames('tabs__element', { 'is-active': tabType === TabType.Description });

  return (
    <div className={className}>
      <div className='product__tabs-text'>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TabDescription;
