const IconMenu = ({width, height, onClick}) => {
  return(
    <svg 
      className="self-center"
      onClick={onClick}
      width={width} height={height} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 6h16M4 12h16M4 18h16" 
      />
    </svg>
  )
}

IconMenu.defaultProps = {
  width: '1.5rem',
  height: '1.5rem'
}

export default IconMenu;