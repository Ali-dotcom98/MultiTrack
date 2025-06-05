import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/DashBoard/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axios, { all } from 'axios'
import { LuFileSpreadsheet } from 'react-icons/lu'
import TaskStatusTable from '../../Components/TaskStatusTable'
import TaskCard from '../../Components/Card/TaskCard'

const MyTask = () => {
  const [alltask, setalltask] = useState([])
  const [totalTask, settotalTask] = useState(null)
  const [tabs, settabs] = useState([])
  const [filterstatus, setfilterstatus] = useState("All")
  const [activetab, setactivetab] = useState(filterstatus)

  
  const navigate = useNavigate()
  const getAllTasks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/task/GetTask", {
      params: {
        status: filterstatus === "All" ? "" : filterstatus
      },
      withCredentials: true
    });

    setalltask(response.data?.tasks?.length > 0 ? response.data.tasks : []);

    const statusSummary = response.data?.statusSummary || {};
    

    const statusArray = [
      { label: "All", count: statusSummary.all || 0 },
      { label: "Pending", count: statusSummary.pendingTask || 0 },
      { label: "In Progess Tasks", count: statusSummary.inProgressTasks || 0 },
      { label: "Completed", count: statusSummary.CompletedTask || 0 }
    ];
    settotalTask(statusSummary.all)

    settabs(statusArray);
  } catch (error) {
    console.log(error);
  }
};




  const handleClick = (taskId)=>{
    navigate(`/user/task-detail/${taskId}`);

  }


  useEffect(()=>{
    getAllTasks(filterstatus)
    return ()=>{}
  },[filterstatus])

  console.log("All taks" , alltask);
  
  return (
    <DashboardLayout activeMenu={"Manage Tasks"}>
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between '>
  
         
            <h2 className='text-xl md:text-xl font-medium'>
              My Tasks
            </h2>
            

          </div>
          {
            alltask?.length >= 0 && (
              <div className='flex items-center gap-3'>
                <TaskStatusTable
                  tabs={tabs}
                  activetab= {filterstatus}
                  setactivetab={setfilterstatus}
                />
              


              </div>
              
            )
          }
        </div>


        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {
            alltask?.map((item, index)=>(
              <TaskCard
                key={item._id}
                title = {item.title}
                description = {item.description}
                priority= {item.priority}s
                status= {item.status}
                progress= {item.progress}
                createdAt={item.createdAt}
                dueDate = {item.dueDate}
                assignedTo = {item.assignedTo?.map((item)=>item.profileImage)}
                attachmentCount = {item.attachmentCount?.length || 0}
                completedTodoCount ={item.completedTodoCount || 0} 
                totalTasks = {totalTask}
                onClick={()=>{handleClick(item._id)}}
        
              
              />
            ))
          }
        
      </div>
    </DashboardLayout>
  )
}

export default MyTask