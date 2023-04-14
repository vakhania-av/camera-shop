import { CAMERAS_PER_PAGE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasPerPageAction } from '../../store/api-actions';
import { CamerasParams } from '../../types/camera';

import styles from './error-screen.module.css';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleReplayBtnClick = () => {
    const camerasParams: CamerasParams = {
      start: 0,
      limit: CAMERAS_PER_PAGE
    };

    dispatch(fetchCamerasPerPageAction(camerasParams));
  };

  return (
    <div className={styles.container}>
      <p className={styles.errorText}> Что-то пошло не так:( Попробуйте обновить страницу </p>
      <button
        className={styles.replay}
        onClick={handleReplayBtnClick}
      >
        <span className={styles.btnText}> Обновить страницу </span>
      </button>
    </div>
  );
}
