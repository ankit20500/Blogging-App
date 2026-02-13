import { useContext, useEffect, useState } from 'react';
import './UpdatePost.css';
import { postContext } from '../../stores/postStore';
import { useNavigate, useParams } from 'react-router-dom';

function UpdatePost(){

    const navigate = useNavigate();
    const {id}=useParams();

    const { getPostDetails, postDetails, updatePost } = useContext(postContext);

    const [imgFile,setImgFile] = useState(null);
    const [file,setFile] = useState(null);
    const [location,setLocation] = useState("");
    const [description,setDescription] = useState("");

    // fetch the post details if anyone refresh the page
    useEffect(()=>{
        getPostDetails(id);
    },[id]);

    useEffect(()=>{
        if(postDetails){
            setLocation(postDetails.location);
            setDescription(postDetails.description);
            setFile(postDetails.image); // existing image preview
        }
    },[postDetails]);

    function handleChange(e){
        const selectedFile = e.target.files[0];
        if(!selectedFile) return;

        const url = URL.createObjectURL(selectedFile);
        setFile(url);
        setImgFile(selectedFile);
    }

    async function handleSubmit(){
        const data = new FormData();
        if(imgFile){
            data.append("image", imgFile);
        }
        data.append("location", location);
        data.append("description", description);
        await updatePost(id, data);
        navigate("/admin/all-posts");
    }

    return(
        <div className='update-posts'>

            <input
                type='file'
                className='post-file'
                onChange={handleChange}
            />

            {file && (
                <img
                    className='post-image'
                    src={file}
                />
            )}

            <input
                type='text'
                value={location}
                placeholder='Enter the location...'
                className='post-location'
                onChange={(e)=>setLocation(e.target.value)}
            />

            <textarea
                value={description}
                rows="8"
                cols="15"
                placeholder='Enter description...'
                onChange={(e)=>setDescription(e.target.value)}
            />

            <button onClick={handleSubmit}>
                Update Post
            </button>

        </div>
    )
}

export default UpdatePost;
