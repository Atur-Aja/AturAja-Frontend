const InputField = ({label, placeholder, type, onChange, value}) => {
  const handleChange= (e) => {
    onChange && onChange(e.target.value)
  }

  return(
    <div className={'py-2 mt-2 ' + (type==='' || type==='text' ? 'border-b border-black' : '')}>
      <p className='font-semibold'>{label}</p>
      <input 
        className={'appearance-none bg-transparent w-full text-gray-700 px-2 py-1leading-tight focus:outline-none ' + (type==='date' ? 'border rounded-lg' : 'border-none') }
        placeholder={placeholder} 
        type={type}
        value={value}
        onChange={handleChange}  
      />
    </div>
  )
}

const SelectField = ({label, options, value, onChange}) => {
  const handleChange= (e) => {
    onChange && onChange(e.target.value)
  }

  return(
    <div className='mt-2'>
      <p className='font-semibold'>{label}</p>
      <select className='border rounded-lg text-sm px-2 py-1 w-full' value={value} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

InputField.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  onChange: null,
  type: ''
}

SelectField.defaultProps = {
  label: '',
  options: [],
  value: '',
  onChange: null
}

export { InputField, SelectField };