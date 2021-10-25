const InputField = ({ label, placeholder, type, onChange, value }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className={"py-2 mt-2 " + (type === "" || type === "text" ? "border-b border-black" : "")}>
      <p className="font-semibold">{label}</p>
      <input
        className={
          "appearance-none bg-transparent w-full text-gray-700 px-2 py-1leading-tight focus:outline-none " +
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

const SelectField = ({ label, options, value, onChange }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className="mt-2">
      <p className="font-semibold">{label}</p>
      <select className="border rounded-lg text-sm px-2 py-1 w-full" value={value} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

const AuthField = ({ type, placeholder, value, onChange, icon }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className="bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-4">
      <input
        className="w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <div className="flex flex-wrap content-center">{icon}</div>
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
