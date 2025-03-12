import TaskClient from "./TaskClient";

export default async function TaskPage({
  params,
}: {
  params: { taskId: string };
}) {
  const { taskId } = params; // No need to await params, it's already available

  console.log("Task ID:", taskId);

  return <TaskClient taskId={taskId} />;
}
