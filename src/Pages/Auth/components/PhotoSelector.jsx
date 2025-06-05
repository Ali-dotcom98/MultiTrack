import React, { useRef, useState } from 'react'
import {User , Trash , Upload} from "lucide-react"

const PhotoSelector = ({image , setimage}) => {
const  inputref = useRef(null);
const [previewUrl, setpreviewUrl] = useState(null);

const HandleImageChange= (e)=>{
    // console.log(e.target.files);
    
    const file = e.target.files[0];

    if(file)
    {
        
        setimage(file);
        const preview = URL.createObjectURL(file);
        console.log(preview);
        setpreviewUrl(preview);
    }
}

const HandleImageRemove = ()=>{
    setimage(null);
    setpreviewUrl(null);
}

const onChooseFile = ()=>{
    inputref.current.click();
}

  return (
    <>
        <div className='flex justify-center mb-6'>
        <input
        className='hidden'
        type="file"
        ref={inputref}
        onChange={(e) => HandleImageChange(e)} 
        accept='image/*'
    />


        {
            !image ? 
            (
                <div className='w-20 h-20 relative rounded-full  bg-blue-100/50 flex items-center justify-center'>
                    <User className='w-10 h-10 text-task_primary'/>
                    <button className='bg-task_primary rounded-full p-1 text-white -right-0 absolute bottom-0' type='button' onClick={onChooseFile}><Upload className='w-4 h-4'/></button>
                </div>
            )
            :
            (
                <div className='w-20 h-20 relative rounded-full  bg-blue-100/50 flex items-center justify-center'>
                    <img className='w-20 h-20 rounded-full' src={previewUrl} alt="" />
                    <button className='bg-red-600 rounded-full p-1 text-white -right-0 absolute bottom-0' type='button' onClick={HandleImageRemove}><Trash className='w-4 h-4'/></button>
                </div>
            )
        }
        </div>
    </>
  )
}

export default PhotoSelector