import React from 'react'

const AvatarGroup = ({avatars , max}) => {
    console.log(avatars);
    
  return (
   <div className='flex items-center'>
    {
        avatars.slice(0,max).map((avatar,index)=>(
            <img key={index}  src={avatar} alt="" className='size-9 rounded-full border-2 border-white -ml-3 first:ml-0' />
        ))
    }
    {
        avatars.length> max && (
            <div className=''>
                +{avatars.length-max}
            </div>
        )
    }
   </div>
  )
}

export default AvatarGroup