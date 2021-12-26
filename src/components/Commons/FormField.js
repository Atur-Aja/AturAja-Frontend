const InputField = ({ label, placeholder, type, onChange, value }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className={"py-2 mt-2 " + (type === "" || type === "text" ? "border-b border-black" : "")}>
      <p className="font-semibold">{label}</p>
      <input
        className={
          "appearance-none bg-transparent w-full text-gray-700 px-2 py-1 leading-tight focus:outline-none " +
          (type === "date" ? "border rounded-lg" : "border-none")
        }
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const SelectField = ({ placeholder, label, options, value, onChange }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className="mt-2">
      <p className="font-semibold">{label}</p>
      <select className="border rounded-lg text-sm px-2 py-1 w-full" value={value} onChange={handleChange}>
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

const AuthField = ({ type, placeholder, value, onChange, icon, onClick, onKeyPress, error }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };
  const handleClick = () => {
    onClick && onClick();
  };
  const handleKeyPress = (e) => {
    onKeyPress && onKeyPress(e);
  };

  return (
    <div
      className={
        `bg-white shadow-xl h-10 md:h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 mt-4 ` +
        (error ? "focus-within:border-red-500 focus-within:text-red-500" : "focus-within:border-biru focus-within:text-biru")
      }
    >
      <input
        className="w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className="flex flex-wrap content-center cursor-pointer" onClick={handleClick}>
        {icon}
      </div>
    </div>
  );
};

InputField.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  onChange: null,
  type: "",
};

SelectField.defaultProps = {
  label: "",
  options: [],
  value: "",
  onChange: null,
};

AuthField.defaultProps = {
  type: "",
  placeholder: "",
  value: "",
  onChange: null,
  icon: null,
};

export { InputField, SelectField, AuthField };
