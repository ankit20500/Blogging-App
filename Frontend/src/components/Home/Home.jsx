import { useNavigate } from 'react-router-dom';
import './Home.css'


function Home(){

    const navigate=useNavigate();

    return(
        <div className="home">
            <p>Upload Something and Share your best moments with us.</p>
            <button onClick={()=>navigate('/home')}>Explore More</button>
        </div>
    )
}

export default Home;