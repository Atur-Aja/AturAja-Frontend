const GreenButton = ({ onClick, loading, text, invited }) => {
  const handleClick = (e) => {
    onClick && onClick(e);
  };
  return (
    <button
      className={`text-white rounded-lg px-3 py-1 mx-2 ` + (invited ? "bg-gray-500 cursor-not-allowed" : "bg-biruTua hover:bg-biru")}
      onClick={handleClick}
      disabled={loading || invited}
    >
      {loading ? <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-400 h-4 w-4" /> : text}
    </button>
  );
};

const WhiteButton = ({ onClick, loading, text }) => {
  const handleClick = (e) => {
    onClick && onClick(e);
  };

  return (
    <button className="bg-white hover:bg-gray-300 shadow-xl text-biruTua rounded-lg px-3 py-1 mx-2" onClick={handleClick} disabled={loading}>
      {loading ? <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-400 h-4 w-4" /> : text}
    </button>
  );
};

const DeleteButton = ({ onClick, loading }) => {
  const handleClick = (e) => {
    onClick && onClick(e);
  };

  return (
    <button className="bg-white hover:bg-gray-300 shadow-xl text-biruTua rounded-lg px-3 py-1 mx-2" onClick={handleClick} disabled={loading}>
      {loading ? (
        <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-400 h-4 w-4" />
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      )}
    </button>
  );
};

const AuthButton = ({ text, loading, onClick }) => {
  const handleClick = (e) => {
    onClick && onClick(e);
  };

  return (
    <button
      className={
        "bg-biru hover:bg-biruTua rounded-lg shadow-xl text-white font-bold px-16 md:px-20 py-2 place-self-center " +
        (text === "Reset" ? "mt-24" : "")
      }
      onClick={handleClick}
      type="submit"
      disabled={loading}
    >
      {loading ? <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-400 h-6 w-6"></div> : text}
    </button>
  );
};

export { GreenButton, WhiteButton, DeleteButton, AuthButton };
