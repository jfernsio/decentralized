
import TaskClient from './TaskClient';


export default async function getTaskId({params}:{params : {taskId: string}}) {
    const taskId = (await params).taskId;
    console.log(taskId)
    return <TaskClient taskId={taskId} />
}
