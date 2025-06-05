import { Target } from 'lucide-react';
import React, { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlus } from 'react-icons/hi2';

const TodoListInput = ({todolist,setTodoList}) => {
    console.log(todolist    );
    const [option, setoption] = useState("")

    
    
    const handleOption=()=>{
        console.log("Here");
        
        if(option.trim())
        {
            setTodoList([...todolist , option.trim()]);
            setoption("")
        }
        console.log(todolist);
        
    }

    const handledelete=(index)=>{
        const UpdateArr = todolist.filter((_,idx)=> idx!=index);
        setTodoList(UpdateArr)
    }
    
  return (
    <>
        <div>
            {
                todolist.map((item,index)=>(
                    <div key={item} className='flex justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2'>
                        <p className='text-sm text-black'>
                            <span className='text-xs text-gray-400 font-semibold mr-2'>{index<9 ? `0${index+1}`:index+1 }
                            </span>
                            {item}
                        </p>
                        <button className='cursor-pointer' onClick={()=>handledelete(index)}>
                            <HiOutlineTrash className='text-lg text-red-500'/>

                        </button>
                    </div>
                ))
            }

        </div>
        <div className='flex items-center gap-5 mt-4'>
            <input type="text" placeholder='Enter Task' value={option} onChange={({target})=>setoption(target.value)} 
            name="" className='w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md' id="" />
            <button className='card-btn text-nowrap' onClick={handleOption}>
                <HiMiniPlus className='text-lg'/> Add
            </button>

        </div>
    </>
  )
}

export default TodoListInput