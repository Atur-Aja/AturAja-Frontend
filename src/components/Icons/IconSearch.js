const IconSearch = ({ width, height, onClick }) => {
  return (
    <svg
      className="cursor-pointer"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
};

IconSearch.defaultProps = {
  width: "1.5rem",
  height: "1.5rem",
};

export default IconSearch;
