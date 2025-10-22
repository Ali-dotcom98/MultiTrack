import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../Components/DashBoard/DashboardLayout";
import axios from "axios";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/task/GetTask/${id}`, {
      withCredentials: true
    });
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateTodoChecklist = async (index) => {};
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  return (
    <>
      <DashboardLayout activeMenu={"Manage Tasks"}>
          <div>ViewTaskDetails</div>
          <div>{JSON.stringify(task)}</div>
      </DashboardLayout>
    </>
  )

};

export default ViewTaskDetails;
  