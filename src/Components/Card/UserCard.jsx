import React from 'react'

const UserCard = ({key,userinfo}) => {
console.log(userinfo);

  return (
    <div className='user-card p-2'>
        <div className='flx items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img className='size-12 rounded-full border-2 border-white' src={userinfo?.profileImage} alt="" />
                <div>
                    <p className='text-sm font-medium'>{userinfo?.name}</p>
                    <p className='text-xs text-gray-500'>{userinfo?.email}</p>
                </div>
            </div>
        </div>
        <div className='flex items-end gap-3 mt-5'>
            <StatCard
                label="Pending"
                count={userinfo.PendingTask || 0 }
                status = "Pending"
            />
            <StatCard
                label="In Progress"
                count={userinfo.inProgressTasks || 0 }
                status = "In Progress"
            />
            <StatCard
                label="Completed"
                count={userinfo.completedTasks || 0 }
                status = "Completed"
            />
            

        </div>
    </div>
  )
}



export default UserCard

const StatCard =({label,count,status})=>{
    const getStatusColor = ()=>{
        switch(status)
        {
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            
            case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";

            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10"
        }
    }

    const getPriority = ()=>{
        switch(priority)
        {
            case "Low":
                return "text-emerald-500 bg-emerald-500 border border-emerald-500/10";

            case "Medium":
            return "text-amber-500 bg-amber-500 border border-amber-500/10";

            default:
                return "text-rose-500 bg-rose-500 border border-rose-500/10";


        }
    }

    return (
        <div className={`flex text-[10px] font-medium ${getStatusColor()} px-4 py-0.5 rounded`}>
            <span className='text-[12px] font-semibold'>
                {count}
                <br />
                {
                    label
                }
            </span>
        </div>
    )
}