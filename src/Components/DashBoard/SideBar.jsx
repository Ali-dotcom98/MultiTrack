import React, { useContext, useEffect, useState } from 'react'
import {SIDE_MENU_DATA , SIDE_MENU_DATA_User} from "./data"
import { UserContext } from '../../ContextApi/User';
import { useNavigate } from 'react-router-dom';
const SideBar = ({activeMenu}) => {
    
    const [SelectData, setSelectData] = useState([])


    const {User , clearUser} = useContext(UserContext)
    
    useEffect(()=>{
        if(User.role == "member")
        {
            setSelectData(SIDE_MENU_DATA_User)
            return
        }
        setSelectData(SIDE_MENU_DATA)
        
        return ()=>{}
    },[])
    
    
    const navigate = useNavigate();
    const handleClick =(route)=>{
        if(route==="logout")
        {
            handleLogout();
            return
        }
        navigate(route)

    }

    const handleLogout = ()=>{
        localStorage.clear();
        clearUser();
        navigate("/login")

    }
    
  return (

    <>
<div className="w-64 h-[calc(100vh-61px)] sticky top-[75px] left-0 bg-white border border-gray-200/50 font-poppins z-20">            
            <div className='flex flex-col items-center justify-center mb-7 pt-10'>
                <img className='size-20 rounded-full' src={User.profileImage} alt="" />
                <h1 className='text-[10px] font-medium text-white bg-task_primary px-3 py-0.5 rounded mt-1'>{User.role}</h1>
                <p className='text-gray-950 font-medium leading-6 mt-3'>{User.name}</p>
                <p className='text-[12px] text-gray-500'>{User.email}</p>
            </div>
            <div className='space-y-2'>
                {
                    SelectData.map((item, index)=>(
                        <div
                            key={index}
                            onClick={()=>handleClick(item.path)}
                            className={`flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer
                                ${activeMenu === item.label 
                                ? "text-task_primary bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-task_primary" 
                                : ""}`}
                            >
                            <div className='text-xl '>{<item.icon />}</div>
                            <div>{item.label}</div>
                        </div>

                    ))
                }
            </div>
        </div>
    </>
  )
}

export default SideBar