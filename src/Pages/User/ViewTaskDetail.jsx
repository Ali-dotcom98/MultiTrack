import React, { useState } from 'react'
import DashboardLayout from '../../Components/DashBoard/DashboardLayout'
import { useParams } from 'react-router-dom'

const ViewTaskDetail = () => {
  const {id} = useParams();
  const [task, settask] = useState(second)
  return (
    <DashboardLayout>
      
    </DashboardLayout>
  )
}

export default ViewTaskDetail