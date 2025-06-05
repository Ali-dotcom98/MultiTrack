import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../ContextApi/User'
import DashboardLayout from '../../Components/DashBoard/DashboardLayout';
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from '../../Components/DashBoard/data';
import Infocard from '../../Components/Card/Infocard';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../Components/TaskListTable';
import CustomPieChart from '../../Components/Charts/CustomPieChart';
import CustomBarChart from '../../Components/Charts/CustomBarChart';

const COLORS = ["#8D51FF" , "#00B8D8", "#7BCE00" ];

const Dashboard = () => {
  const {User} = useContext(UserContext)
  console.log("Admin" , User);
  const navigate = useNavigate();

  const [dashboardDate, setdashboardDate] = useState(null);
  const [pieChartData, setpieChartData] = useState([])
  const [barChartData, setbarChartData] = useState([])
  
  const prepareChartData = (data)=>{
    const taskDistribution = data?.taskDistribution || null
    const taskPriorityLevel = data?.taskPriorityLevel || null

    const taskDistributionData = [
      {status :"Pending" , count : data?.taskDistribution?.Pending || 0  },
    
      {status :"In Progress" , count : data?.taskDistribution?.InProgress || 0  },
      {status :"Completed" , count : data?.taskDistribution?.Completed || 0  },
    ]
    setpieChartData(taskDistributionData)
      const PriorityLevelData = [
        {status :"Low" , count : taskPriorityLevel?.Low|| 0  },
    
      {status :"Medium" , count : taskPriorityLevel?.Medium || 0  },
      {status :"High" , count : taskPriorityLevel?.High || 0  },

      ] 

      setbarChartData(PriorityLevelData)

  }
  console.log("barchart",barChartData);
  console.log("CustomBarChart",barChartData);
  
  
  const getDashboardData = async()=>{
      try {
        const result = await axios.get("http://localhost:3000/api/task/AdminDashboardData", {withCredentials: true})
        if(result.data)
        {
          setdashboardDate(result.data)  
          prepareChartData(result.data.charts || null)        
        }
        
      } catch (error) {
        console.log("Error while Fetching the Data ",error);
        
      }
  }
  useEffect(()=>{
    getDashboardData()
  },[])
  console.log(dashboardDate);
  
  const onSeeMore = ()=>{
    navigate("/admin/tasks")
  }

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className='card my-5'>
        <div>
          <div className='col-span-3'>
            <h2 className='text-xl md:text-2xl font-semibold'>Good Morning! {User?.name}</h2>
            <p className='textg-xs  md:text-[13px] text-gray-400 mt-1.5'>{moment().format("dddd Do MMM YYYY")}</p>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          <Infocard
            label ={"Total Task"}
            value = {addThousandsSeparator (dashboardDate?.charts?.taskDistribution?.All || 0)}
            color = "bg-task_primary"
          />
          <Infocard
            label ={"Pending Task"}
            value = {addThousandsSeparator (dashboardDate?.charts?.taskDistribution?.Pending || 0)}
            color = "bg-violet-500"
          />
           <Infocard
            label ={"Completed Task"}
            value = {addThousandsSeparator (dashboardDate?.charts?.taskDistribution?.Completed || 0)}
            color = "bg-lime-500"
          />
           <Infocard
            label ={"InProgress Task"}
            value = {addThousandsSeparator (dashboardDate?.charts?.taskDistribution?.InProgress || 0)}
            color = "bg-cyan-500"
          />
        </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my4 md:my-6'>


        <div>
            <div className='card'> 
              <div className='flex items-center justify-between'>
                <h5 className='font-medium'>Task Distribution</h5>

              </div>
              <CustomPieChart data={pieChartData} label="Total balance" color ={COLORS}/>
            </div>

        </div>
        <div>
            <div className='card'> 
              <div className='flex items-center justify-between'>
                <h5 className='font-medium'>Task Priority</h5>

              </div>
              <CustomBarChart data={barChartData} label="Total balance" color ={COLORS}/>
            </div>

        </div>



        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='text-lg'>Recent Tasks</h5>
              <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
              </button>

            </div>
            <TaskListTable tableData= {dashboardDate?.recentTasks || []}/>

          </div>

        </div>
       
      </div>
    
    
    
    </DashboardLayout>
  )
}

export default Dashboard