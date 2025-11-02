  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import DashboardLayout from "../../Components/DashBoard/DashboardLayout";
  import axios from "axios";
  import moment from "moment"
  import AvatarGroup from "../../Layouts/AvatarGroup";
  import { LuSquareArrowOutUpRight  } from "react-icons/lu";

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
          console.log("taskInfo",taskInfo);
          
          setTask(taskInfo.task);

        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    console.log("task",task);
    

const updateTodoChecklist = async (index) => {
  const updatedChecklist = [...(task?.todoCheckList || [])];
  const taskId = id;

  if (updatedChecklist && updatedChecklist[index]) {
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setTask({ ...task, todoCheckList: updatedChecklist }); 

    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/UpdateTask/${taskId}`,
        { updatedChecklist },
        { withCredentials: true }     
      );

      if (response.status === 200) {
        setTask(response.data?.task || task);
      } else {
        updatedChecklist[index].completed = !updatedChecklist[index].completed;
        setTask({ ...task, todoCheckList: updatedChecklist });
      }
    } catch (error) {
      updatedChecklist[index].completed = !updatedChecklist[index].completed;
      setTask({ ...task, todoCheckList: updatedChecklist });
      console.error("Error updating todo checklist:", error);
    }
  }
};



  const handleLinkClick = (link) => {

    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
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
            <div className="mt-5">
              {
                task  && (
                  <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
                <div className="form-card col-span-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base md:text-xl font-medium">
                      {task?.title}
                    </h2>
                    <div
                      className={`text-[13px] font-medium ${getStatusTagColor(
                        task?.status
                      )} px-4 py-0.5 rounded`}
                    >
                      {task?.status}
                    </div>
                  </div>
                  <div className="mt-4">
                    <InfoBox label="Description" value={task ?. description} />
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-4">

                    <div className="col-span-6 md:col-span-4">
                      <InfoBox label="Priority" value={task?.priority} />
                    </div>

                    <div className="col-span-6 md:col-span-4">
                      <InfoBox
                        label="Due Date"
                        value={
                          task?.dueDate
                            ? moment(task?.dueDate).format("Do MMM YYYY")
                            : "N/A"
                        }
                      />
                    </div>

                    <div className="col-span-6 md:col-span-4">
                      <label className="text-xs font-medium text-slate-500">
                        Assigned To
                      </label>
                      <AvatarGroup
                        avatars={task?.assignedTo?.map((item) => item?.profileImage) || []}
                        maxVisible={5}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                      <label className="text-xs font-medium text-slate-500">
                        Todo Checklist
                      </label>
                      {task?.todoCheckList?.map((item, index) => (
                        <TodoCheckList
                          key={`todo_${index}`}
                          text={item.text}
                          isChecked={item?.completed}
                          onChange={() => updateTodoChecklist(index)}
                        />
                      ))}
                  </div>
                  {task?.attachment?.length > 0 && (
    <div className="mt-2">
      <label className="text-xs font-medium text-slate-500">
        Attachments
      </label>
      {task?.attachment?.map((link, index) => (
        <Attachment
          key={`link_${index}`}
          link={link}
          index={index}
          onClick={() => handleLinkClick(link)}
        />
      ))}
    </div>
  )}



                </div>
              </div>
                )
              }
            </div>

        </DashboardLayout>
      </>
    )

  };

  export default ViewTaskDetails;
  const InfoBox = ({ label, value }) => {
    return (
      <>
        <label className="text-xs font-medium text-slate-500">{label}</label>
        <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">
          {value}
        </p>
      </>
    );
  };

  const TodoCheckList = ({ text, isChecked, onChange }) => {
    return (
      <div className="flex items-center gap-3 p-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
        />
        <p className="text-[13px] text-gray-800">{text}</p>
      </div>
    );
  };

  const Attachment = ({ link, index, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-2 rounded-md  mt-2 cursor-pointer"
      >
        <div className="flex-1 flex items-center gap-3">
          <span className="text-xs text-gray-400 font-semibold mr-2">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <p className="text-xs text-black truncate">{link}</p>
        </div>
        <LuSquareArrowOutUpRight className="text-gray-400 w-4 h-4" />
      </div>
    );
  };