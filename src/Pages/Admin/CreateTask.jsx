import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../Components/DashBoard/DashboardLayout"
import {PRIORITY_DATA} from "../../Components/DashBoard/data"
import toast from "react-hot-toast"
import {useNavigate , useLocation} from "react-router-dom"
import moment from "moment"
import { LuTrash2 } from 'react-icons/lu';
import SelectDropDown from '../../Components/Input/SelectDropDown'
import SelectUsers from '../../Components/Input/SelectUsers'
import TodoListInput from '../../Components/Input/TodoListInput'
import AddAttachmentsInput from '../../Components/Input/AddAttachmentsInput'
import axios from 'axios'
import DeleteAlert from '../../Components/DeleteAlert'

import Model from '../../Layouts/Model'



const CreateTask = () => {
  const location = useLocation();
  const {taskId}= location.state|| {}
  const navigate = useNavigate();
  const [taskData, settaskData] = useState({
    title:"",
    description:"",
    status:"Pending",
    priority:"Low",
    dueDate:null,
    assignedTo:[],
    todoCheckList:[],
    attachment:[]
  })
  const [CurrentTask, setCurrentTask] = useState(null)
  const [error, seterror] = useState("")
  const [loading, setloading] = useState(false)
  const [openDeleteAlert, setopenDeleteAlert] = useState(false)

  console.log(taskData ,"Taskdata");
  
  const HandleValueChange=(key, value)=>{
    
    
    settaskData((prev)=>({...prev , [key]:value}))
  }
  console.log(PRIORITY_DATA);
  

  const clearData = ()=>{
    settaskData({
      title:"",
      description:"",
      priority:"Low",
      dueDate:null,
      assignedTo:[],
      todoCheckList:[],
      attachment:[]
    })
  }

  const createTask =async()=>{
    setloading(true)
    try {
      const todolist = taskData.todoCheckList?.map((item)=>({
        text : item,
        completed : false ,
      }));

      const response = await axios.post("http://localhost:3000/api/task/CreateTask",{
        ...taskData,
        dueDate : new Date (taskData.dueDate).toISOString(),
        todoCheckList : todolist
      }, { withCredentials: true } )
      toast.success("Task Created Successfully");
      clearData()
    } catch (error) {
      console.log("Error Created Task ", error);
      setloading(false)
    }
    finally{
      setloading(false)
    }

  }

  const updateTask =async(taskId)=>{
    try {
      const todolist = taskData.todoCheckList?.map((item)=>{

        const prevTodoList = CurrentTask?.todoCheckList || [];
        const matchedtask = prevTodoList.find((task)=>task.text ===item);
        return{
          text : item,
          completed : matchedtask ? matchedtask.completed : false ,
        }      
    });
      const response = await axios.put(`http://localhost:3000/api/task/UpdateTaskStatus/${taskId}`,
        {
          ...taskData,
          dueDate : new Date(taskData.dueDate).toISOString(),
          todoCheckList: todolist
        },
         {withCredentials:true})
        toast.success("Task Updated Successfully")

    } catch (error) {
      console.log(error);
      setloading(false)
    }
    finally{
      setloading(false)
    }

  }
  const handleSubmit = async () => {
  if (!taskData.title.trim()) {
    seterror("Title is required");
    return;
  }

  if (!taskData.description.trim()) {
    seterror("Description is required");
    return;
  }

  if (!taskData.dueDate) {
    seterror("Due date is required");
    return;
  }

  if (!taskData.priority.trim()) {
    seterror("Priority is required");
    return;
  }

  if (taskData.assignedTo.length === 0) {
    seterror("At least one person must be assigned to the task");
    return;
  }

  if (taskData.todoCheckList.length === 0) {
    seterror("At least one task item is required in the checklist");
    return;
  }

  if (taskData.attachment.length === 0) {
    seterror("At least one attachment is required");
    return;
  }
  if(taskId)
  {
    updateTask(taskId);
    return
  }
  createTask()
};

  const getTaskDetailById = async (taskId) => {
    try {
      console.log("hee");
      
      const response = await axios.get(`http://localhost:3000/api/task/GetTask/${taskId}` , {withCredentials:true});
      console.log("Response Data:", response.data);
     
      

      if (response.data) {
        const taskinfo = response.data.task;
        console.log(taskinfo);
        
        setCurrentTask(taskinfo);

        settaskData({
          title: taskinfo.title,
          description: taskinfo.description,
          priority: taskinfo.priority,
          dueDate: taskinfo.dueDate ? moment(taskinfo.dueDate).format("YYYY-MM-DD") : null,
          assignedTo: taskinfo?.assignedTo?.map((item) => item?.id) || [],
          todoCheckList: taskinfo?.todoCheckList?.map((item) => item?.text) || [],
          attachment: taskinfo.attachment || [],
        });
      }
    } catch (error) {
      console.error("Error during fetch:", error?.response?.data || error.message);
    }
  };
  const deleteTask = async ()=>{
    try {
      await axios.delete(`http://localhost:3000/api/task/DeleteTask/${taskId}`)
      setopenDeleteAlert(false)
      toast.success("Task Deleted Successfully")
      navigate("/admin/tasks")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(taskId)
    {
      getTaskDetailById(taskId)

    }
  
    return () => {}
  }, [taskId])
  
  return (

    <DashboardLayout activeMenu={"Create Task"}>
        <div className='mt-5 '>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='form-card min-h-screen col-span-3'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl md:text-xl font-medium'>
                  {taskId ? "Update Task ":"Create Task"}

                </h2>
                {
                  taskId && (
                    <button className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer' onClick={()=> setopenDeleteAlert(true)}>
                      <LuTrash2 className='text-base'/> Delete
                    </button>
                  )
                }
              </div>
              <div className='mt-4 '>
                <label className='text-xs font-medium text-slate-600' htmlFor="">Task Title</label>
                <input type="text" value={taskData.title} placeholder='Creat App UI' className='form-input' onChange={({target})=>HandleValueChange("title", target.value )} name="" id="" />
              </div>
              <div className='mt-3'>
                <label htmlFor=""className='text-xs font-medium text-slate-600' >Description</label>
                <textarea name="" id=""
                 className='form-input resize-none'
                 rows={4}
                 value={taskData.description}
                 onChange={({target})=>HandleValueChange("description",target.value)}

                ></textarea>
              </div>
              <div className='grid grid-cols-12 gap-4 mt-2 '>
                <div className='col-span-6 md:col-span-4'>
                  <label htmlFor="" className='text-xs font-medium text-slate-600'>
                    Priority
                  </label>
                  <SelectDropDown 
                  options={PRIORITY_DATA} 
                  value={taskData.priority} 
                  onChange={(value)=> HandleValueChange("priority",value)}
                  placeholder="Select Priority"
                   />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <label htmlFor="" className='text-xs font-medium text-slate-600'>Due Date</label>
                  <input type="date" className='form-input' value={taskData.dueDate} onChange={({target} )=> HandleValueChange("dueDate", target.value)}
                   name="" id="" />

                </div>
                <div className='col-span-12 md:col-span-3'>
                  <label htmlFor="" className='text-xs font-medium text-slate-600'>Assign To</label>
                  <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setselectedUsers= {(value)=>{
                      HandleValueChange("assignedTo", value)
                    }}
                  />
                </div>
              </div>
              
              <div className='mt-4'>
                <label htmlFor="" className='text-xs font-medium text-slate-600 '>TODO CheckList</label>

                <TodoListInput
                  todolist={taskData?.todoCheckList}
                  setTodoList={(value)=>HandleValueChange("todoCheckList",value)}
                />
              </div>

              <div className='mt-3'>
                    <label className='text-xs font-medium text-slate-600' htmlFor="">Add Attachment</label>
                    <AddAttachmentsInput
                      attachment = {taskData?.attachment}
                      setAttachment = {(value)=>HandleValueChange("attachment",value)}
                    />

              </div>
              {
                error && (
                  <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
                )
              }
              <div className='flex justify-end mt-7'>
                <button className='add-btn' onClick={handleSubmit}>
                  <div className='text-center  w-full'>
                        {
                        taskId? "UPDATE TASK": "CREATE TASK"
                      }
                  </div>

                </button>
              </div>


            </div>
          </div>
        </div>
        {
          openDeleteAlert && (
            <Model
          isOpen ={openDeleteAlert}
          onClose = {()=>setopenDeleteAlert(false)}
          title= "Delete Task"
        >
          <DeleteAlert content="Are you Sure you want to delete this task?" 
            onDelete = {()=>deleteTask()}
          />
        </Model>
          )
        }
        

    </DashboardLayout>
    
  )
}

export default CreateTask