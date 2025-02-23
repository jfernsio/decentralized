import z from 'zod'

const createTasks = z.object({
    options: z.array(z.object({
        imageUrl: z.string()
    })).min(1, "At least one option is required"),
    title: z.string().optional(),
    signature: z.string(),
    // amount: z.number()
})

 const createSubmissionInput = z.object({
    taskId: z.string(),
    selection: z.string(),
})
export { createTasks ,createSubmissionInput }