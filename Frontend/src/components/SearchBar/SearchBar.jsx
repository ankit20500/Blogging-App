import './SearchBar.css';
import { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { postContext } from '../../stores/postStore';

function SearchBar(){
    const navigate=useNavigate();
    const [query,setQuery]=useState("");

    const {fetchSearchResult}=useContext(postContext);

    async function handleSearch(e){
        e.preventDefault();
        if(!query.trim()) return;
        try {
            await fetchSearchResult(query);
            navigate("/search-result");
            
        } catch (error) {
            console.log("Search error:", error);
        }
    }

    return(
        <div className='search-bar'>
            <form onSubmit={handleSearch}>
                <input
                    placeholder='Search district, state, country...'
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchBar;
