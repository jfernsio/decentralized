//Error: Route "/task/[taskId]" used `params.taskId`. `params` should be awaited before using its properties. Learn more:
// "use client"
// import { AppBar } from '@/app/components/AppBar';

// import { useEffect, useState } from 'react';


export default async function getTaskId({params}:{params : {taskId: string}}) {
    const taskId = await params.taskId;
    console.log(taskId)
    return <h4>taskId : {taskId}</h4>
}
async function getTaskDetails(taskId: string) {
const data = await fetch(`http://localhost:8000/user/tasks?taskId=${taskId}`, {
    headers: {
        "Authorization": localStorage.getItem('token')
    }
})
    console.log(data)

    return data.json();
}

// export default function Page({params: { 
//     taskId 
// }}: {params: { taskId: string }}) {
//     const [result, setResult] = useState<Record<string, {
//         count: number;
//         option: {
//             imageUrl: string
//         }
//     }>>({});
//     const [taskDetails, setTaskDetails] = useState<{
//         title?: string
//     }>({});

//     useEffect(() => {
//         getTaskDetails(taskId)
//             .then((data) => {
//                 setResult(data.result)
//                 setTaskDetails(data.taskDetails)
//             })
//     }, [taskId]);

//     return <div>
//         <AppBar />
//         <div className='text-2xl pt-20 flex justify-center'>
//             {taskDetails.title}
//         </div>
//         <div className='flex justify-center pt-8'>
//             {Object.keys(result || {}).map(taskId => <Task imageUrl={result[taskId].option.imageUrl} votes={result[taskId].count} />)}
//         </div>
//     </div>
// }

// function Task({imageUrl, votes}: {
//     imageUrl: string;
//     votes: number;
// }) {
//     return <div>
//         <img className={"p-2 w-96 rounded-md"} src={imageUrl} />
//         <div className='flex justify-center'>
//             {votes}
//         </div>
//     </div>
// }