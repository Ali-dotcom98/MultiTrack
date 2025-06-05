import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { LuUser, LuUsers } from 'react-icons/lu'
import Model from '../../Layouts/Model'
import AvatarGroup from '../../Layouts/AvatarGroup'

const SelectUsers = ({selectedUsers,setselectedUsers}) => {
    const [allUsers, setallUsers] = useState([])
    const [isModalOpen, setisModalOpen] = useState(false)
    const [tempSelectedUsers, settempSelectedUsers] = useState([])

    const getAllUsers =async()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/user/GetUserId")
            if(response.data?.length > 0)
            {
                setallUsers(response.data)
            }
            
        } catch (error) {
            console.log("Error Fetching Users", error);
            
        }
    }

    const toggleUserSelection = (userId)=>{
        settempSelectedUsers((prev)=> prev.includes(userId) ? prev.filter((id)=>id!== userId) : [...prev , userId])
    }

    console.log(tempSelectedUsers);
    

    const handleAssign = () => {
        try {
          console.log("Assign clicked 1");
          setselectedUsers(tempSelectedUsers);
          console.log("Assign clicked 2");
          setisModalOpen(false);
          console.log("Assign clicked 3");
        } catch (err) {
          console.error("Error in handleAssign:", err);
        }
      };
      
    

    const SelectedAvatar = allUsers.
    filter((user)=>selectedUsers.includes(user._id))
    .map((user)=>user.profileImage)

    useEffect(()=>{
        getAllUsers();
    },[])

    useEffect(()=>{
        if(selectedUsers.length ===0)
        {
            settempSelectedUsers([])
        }
        return ()=>{};

    },[selectedUsers])
  return (
    <div className='spay-4 mt-2'>
        {
            SelectedAvatar.length === 0 && (
                <button className='card-btn' onClick={()=>setisModalOpen(true)}>
                    <LuUsers className=''/> Add Members
                </button>
            )
        }

        {
            SelectedAvatar.length>0 && (
                <div className='cursor-pointer' onClick={()=>setisModalOpen(true)}>
                    <AvatarGroup avatars={SelectedAvatar} max={3} />
                </div>
            )
        }
        <Model isOpen={isModalOpen} onClose={()=>setisModalOpen(false)} title={"Select Users"}>
            <div className='space-y-4 h-[60vh] overflow-y-auto'>
                {
                    allUsers.map((user)=>(
                        <div key={user._id} className='flex items-center gap-4 p-3 border-b border-gray-200'>
                            <img src={user.profileImage} alt="" className='size-10 rounded-full' />
                            <div className='flex-1'>
                                <p className='font-medium text-gray-800'>{user.name}</p>
                                <p className=''>{user.email}</p>
                            </div>
                            <input type="checkbox" name="" id="" 
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={()=>toggleUserSelection(user._id)}
                                className='size-4 text-task_primary bg-gray-100 border-gray-300 rounded-sm outline-none'
                            />
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-end gap-4 pt-4'>
                <button className='card-btn' onClick={()=>setisModalOpen(false)}>CANCEL</button>
                <button className='card-btn-fill' onClick={handleAssign}>DONE</button>
            </div>

        </Model>
    </div>
  )
}

export default SelectUsers