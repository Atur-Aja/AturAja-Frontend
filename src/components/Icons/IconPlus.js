const IconPlus = ({ width, height, onClick }) => {
  return (
    <svg
      width={width}
      height={height}
      className="cursor-pointer"
      fill="none"
      stroke="#056676"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

IconPlus.defaultProps = {
  width: "1.5rem",
  height: "1.5rem",
};

export default IconPlus;
