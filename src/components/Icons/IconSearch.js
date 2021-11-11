const IconSearch = ({ width, height }) => {
    return (
        <svg 
            width="18" height="15" 
            viewBox="0 0 18 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
        <path 
            d="M15.677 14.7378L9.96198 9.85828C7.41965 11.4012 3.91642 11.0238 1.90285 8.99005C-0.110711 6.95628 0.0371394 3.94464 2.24298 2.06182C4.44824 0.178173 7.97651 0.0514132 10.3594 1.77022C12.7422 3.48903 13.1846 6.47988 11.377 8.65035L17.092 13.5299L15.678 14.7369L15.677 14.7378ZM6.48498 2.26839C4.58868 2.26803 2.95267 3.40434 2.56745 4.98938C2.18224 6.57442 3.15369 8.17254 4.89366 8.81617C6.63362 9.4598 8.66388 8.97204 9.75522 7.6482C10.8466 6.32437 10.699 4.52831 9.40198 3.34743L10.007 3.85962L9.32498 3.27913L9.31298 3.26889C8.56477 2.62624 7.54637 2.26595 6.48498 2.26839Z" 
            fill="#7B7B7B"
        />
        </svg>
    )
  }
  
IconSearch.defaultProps = {
    width: "1.5rem",
    height: "1.5rem",
}

export default IconSearch;
  