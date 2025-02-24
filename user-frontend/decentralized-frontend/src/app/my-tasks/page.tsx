"use client";
// type UserTasks = {

import { useEffect, useState } from "react";
import ClientFetcher from "../components/ClientFetcher";
import GetUserToken from "./getTask";

   
//     title: string;
//     amount: number;
//     options: {
//         imageUrl: string;
//     }[];
// }

// export default  async function getUserTasks () {
//     const data = await fetch('http://localhost:8000/api/user/tasks', {
//         method: 'GET',
//         headers: {
//             'Authorization': localStorage.getItem('token') || ''
//         }

//     });
//     const userTasks: UserTasks[] = await data.json();
//     console.log(userTasks);
//     return userTasks;
// }
interface UserTasks {
  title: string;
  amount: number;
  options: {
    image_url: string;
  }[];
}

export default  function Home() {
  const [tasks, setTasks] = useState<UserTasks[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:8000/api/user/all/tasks/user', {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem('token') || ''
          }
        });
        const userTasks: UserTasks[] = await data.json();
        console.log(userTasks.tasks)
        setTasks(userTasks.tasks);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1>My Tasks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {tasks.map((task, index) => (
            <div key={index} className="task-card">
              <h2>{task.title}</h2>
              <p>Amount: {task.amount}</p>
              <div className="task-options">
               <div className="md:w-1/2">
  <div className="task-options flex flex-wrap justify-center">
    {task.options.map((option, optionIndex) => (
      <img key={optionIndex} src={option.image_url} alt={`Task Option ${optionIndex}`} className="w-1/2 md:w-1/4 lg:w-1/6" />
    ))}
  </div>
</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}  