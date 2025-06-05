import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/DashBoard/DashboardLayout'
import { WatchIcon } from 'lucide-react'
import axios, { all } from 'axios'
import { LuFileSpreadsheet } from 'react-icons/lu'
import UserCard from '../../Components/Card/UserCard'

const ManagaUser = () => {
  const [allUsers, setallUsers] = useState([])
  const getalluser =async ()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/user/GetUserId", {withCredentials:true})
      if(response.data.length>0)
      { 
        setallUsers(response.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleDownloadReport = ()=>{

  }
  
  
  useEffect(() => {
    getalluser();  
    return () => {}
  }, [])
  
  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className='mt-5 mb-10'>
        <div className='flex md:flex-row md:items-center justify-between'>
          <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>

          <button className='flex md:flex download-btn' onClick={handleDownloadReport}>
            <LuFileSpreadsheet className='text-lg'/>
            Download Report</button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        {
          allUsers.map((user)=>(
            <UserCard key ={user._id} userinfo={user}/>
          ))
        }
      </div>
    </DashboardLayout>
  )
}

export default ManagaUser