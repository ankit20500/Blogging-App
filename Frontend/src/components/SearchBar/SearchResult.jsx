import './SearchBar.css';
import { useContext } from "react";
import { postContext } from "../../stores/postStore";
import { Link } from 'react-router-dom';

function SearchResult() {

    const {searchResult}=useContext(postContext);

  return (
    <div className='search-result'>
            {searchResult && searchResult.map((data,idx)=>(
                <div className="search-result-box" key={data._id}>
                    <img className="search-result-img" src={data.image}/>
                    <p className="search-result-content">{data.location}<br/><Link to={`/post-details/${data._id}`}>view more</Link></p>
                </div>
            ))}
        </div>
  )
}

export default SearchResult;