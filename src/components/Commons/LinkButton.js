
const SaveButton = ({onClick}) => {
  const handleClick = (e) => { onClick && onClick(e)}

  return(
    <button className='bg-biruTua hover:bg-biru text-white rounded-lg px-3 py-1 mx-2' onClick={handleClick}>
      Save
    </button>
  )
}

const CancelButton = ({onClick}) => {
  const handleClick = (e) => { onClick && onClick(e)}

  return(
    <button className='bg-white hover:bg-gray-300 shadow-xl text-biruTua rounded-lg px-3 py-1 mx-2' onClick={handleClick}>
      Cancel
    </button>
  )
}

export { SaveButton, CancelButton };