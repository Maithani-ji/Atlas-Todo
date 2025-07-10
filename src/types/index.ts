export type Task = {
    id: string
    title: string
    completed: boolean
  }
  
  export type Project = {
    id: string
    title: string
    tasks: Task[]
  }
  