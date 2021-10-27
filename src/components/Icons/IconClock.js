const IconClock = ({ width, height }) => {
  return (
    <svg width={width} height={height} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

IconClock.defaultProps = {
  width: "1.5rem",
  height: "1.5rem",
};

export default IconClock;
