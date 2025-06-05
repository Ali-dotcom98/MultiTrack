import React from 'react'

const TaskStatusTable = ({tabs,activetab,setactivetab}) => {
    console.log("act",activetab);
    console.log("tabs",tabs);
    
    
  return (
    <div>
        <div>
            {
                tabs.map((tab)=>(
                    <button className={`relative cursor-pointer px-3 md:px-4 puy-2 text-sm font-medium' key={item.label} 
                        ${activetab == tab.label   ? "text-task_primary" : "text-gray-500 hover:text-gray-700"
                        } ` } onClick={()=>setactivetab(tab.label)}>
                    
                        <div className='flex items-center'>
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