type IconStarProps = {
  full?: boolean;
};

function IconStar({ full }: IconStarProps): JSX.Element {
  const xLink = full ? '#icon-full-star' : '#icon-star';

  return (
    <svg width='17' height='16' aria-hidden='true'>
      <use xlinkHref={xLink} />
    </svg>
  );
}

export default IconStar;
