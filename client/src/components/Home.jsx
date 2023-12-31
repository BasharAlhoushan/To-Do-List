import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../redux/taskSlice";
import deletee from "../delete.png";
import edit from "../edit.png";

import Header from "./Header";

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    completed: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      dispatch(fetchTasks());
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateTask(updatedTask));
      dispatch(fetchTasks());
      setUpdateFormOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") {
      return true;
    }
    return task.completed === (filterStatus === "completed");
  });
  return (
    <>
      <Header />
      <div className="flex flex-col items-start mx-16 my-5">
        <div className="mb-4">
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center my-5 ">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="card flex flex-row w-96 h-56 py-5 px-5  gap-10 mr-6 bg-blue-600 shadow-xl mb-4"
          >
            <div className="card-body">
              <h2 className="card-title font-bold font-style: italic">
                {task.title}
              </h2>
              <p className="font-semibold ">{task.description}</p>
              <ul className="list-disc pl-4">
                <li className="mb-2"> {task.dueDate}</li>
                <li className="mb-2"> {task.priority}</li>
              </ul>
              <p> {task.completed ? "Completed" : "Pending"}</p>
              <div className=" card-actions flex flex-row justify-end ">
                <button
                  onClick={() => {
                    setUpdatedTask({
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      dueDate: task.dueDate,
                      priority: task.priority,
                      completed: task.completed,
                    });
                    setUpdateFormOpen(true);
                  }}
                  className="text-black mr-2 hover:text-black rounded-md text-white "
                >
                  <img className="  h-6 w-6 " src={edit} alt="" />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="  text-black hover:text-black rounded-md text-white "
                >
                  <img className=" h-6 w-6 " src={deletee} alt="" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isUpdateFormOpen && (
        <div className="update-form-popup">
          <form className="w-96 mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 font-style: italic">
              Update Task
            </h2>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title:
              </label>
              <input
                id="title"
                type="text"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, title: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter title"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                value={updatedTask.description}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Due Date:
              </label>
              <input
                id="dueDate"
                type="date"
                value={updatedTask.dueDate}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-gray-700 font-bold mb-2"
              >
                Priority:
              </label>
              <select
                id="priority"
                value={updatedTask.priority}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, priority: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              className=" mr-2 rounded-md bg-black hover:bg-black text-white w-20"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className=" mr-2 rounded-md bg-black hover:bg-black text-white w-20"
              type="button"
              onClick={() => setUpdateFormOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Home;
