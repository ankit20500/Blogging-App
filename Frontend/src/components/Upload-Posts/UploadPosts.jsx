import { useContext, useState } from 'react';
import './UploadPosts.css';
import { postContext } from '../../stores/postStore';
import { useNavigate } from 'react-router-dom';

function UploadPosts(){
    const navigate=useNavigate();
    const [imgFile,setImgFile]=useState(null);
    const [file,setFile]=useState(null);
    const [location,setLocation]=useState("");
    const [description,setDescription]=useState("");

    const {createPost}=useContext(postContext);

    function handleChange(e){
        const url=URL.createObjectURL(e.target.files[0]);
        setFile(url);
        setImgFile(e.target.files[0]);
    }

    async function handleSubmit(){
        const data=new FormData();
        data.append("image",imgFile);
        data.append("location",location);
        data.append("description",description);
        await createPost(data);
        navigate("/");
    }

    return(
        <div className='upload-posts'>
            {!file && <input type='file' className='post-file' onChange={handleChange}/>}
            {file && <img className='post-image' src={file}/>}
            <input type='text' 
                placeholder='Enter the location... (ooty, uttrakhand, India)'
                className='post-location'
                onChange={(e)=>setLocation(e.target.value)}
                />
            <textarea id="desc" 
                name="description" 
                rows="4" cols="41"
                placeholder='Enter some description about this place...'
                onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
            <button onClick={handleSubmit}>Upload Post</button>
        </div>
    )
}

export default UploadPosts;