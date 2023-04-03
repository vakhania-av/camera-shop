import { SpinnerDotted } from 'spinners-react';
import styles from './fullpage-spinner.module.css';

type FullpageSpinnerProps = {
  size: 'small' | 'big';
};

const sizes = {
  small: 15,
  big: 50,
};

function FullpageSpinner({ size }: FullpageSpinnerProps): JSX.Element {
  return (
    <div className={styles.container}>
      <SpinnerDotted color='#7575e2' size={sizes[size]} />
    </div>
  );
}

export default FullpageSpinner;
