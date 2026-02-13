import { Link } from 'react-router-dom';
import './Home.css'
import SearchBar from '../SearchBar/SearchBar';
import { useContext, useEffect } from 'react';
import { postContext } from '../../stores/postStore';


function HomeCart() {

    const {post,fetchAllPosts}=useContext(postContext);
    useEffect(()=>{
        const fetchdata=async()=>{
            await fetchAllPosts();
        }
        fetchdata();
    },[])


  return (
    <div className='home-cart'>
        <SearchBar/>
        <div className='home-content'>
            {post && post.map((data,idx)=>(
                <div className="home-cart-box" key={idx}>
                    <img className="home-data-img" src={data.image}/>
                    <p className="home-data-content">{data.location}<br/><Link to={`/post-details/${data._id}`}>view more</Link></p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default HomeCart;