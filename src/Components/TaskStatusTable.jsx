import React from 'react'

const TaskStatusTable = ({tabs,activetab,setactivetab}) => {
    console.log("act",activetab);
    console.log("tabs",tabs.label);
    
    
  return (
    <div className='flex items-center justify-center  w-full'>
        <div className='grid grid-cols-2 lg:grid-cols-4 items-center   gap-1'>
            {
                tabs.map((tab)=>(
                    <button className={`relative   cursor-pointer px-3  py-2 text-sm font-medium'
                        ${activetab == tab.label   ? "text-task_primary" : "text-gray-500 hover:text-gray-700"
                        } ` } onClick={()=>setactivetab(tab.label)}>
                    
                        <div className='flex flex-row items-center justify-center sm:min-w-[90px]  '>
                            <span className='text-sm'>{tab.label}</span>
                            <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${activetab == tab.label ? "bg-task_primary text-white" : "text-gray-500 hover:text-gray-700"}  `}>
                                {tab.count}
                            </span>
                        </div>
                        {
                            activetab ===tab.label && (
                                <div className='absolute -bottom-1.5 left-0 w-full h-0.5  bg-task_primary'></div>
                            )
                        }
                        

                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default TaskStatusTable