import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { getProjects, saveProjects } from '../utils/storage'
import { Project, Task } from '../types'
import uuid from 'react-native-uuid'

import TaskItem from '../components/TaskItem'

export default function ProjectDetailsScreen() {
  const route = useRoute<RouteProp<{ params: { projectId: string } }, 'params'>>()
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [taskTitle, setTaskTitle] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const projects = await getProjects()
    const found = projects.find(p => p.id === route.params.projectId)
    if (found) setProject(found)
    setAllProjects(projects)
  }

  const toggleTask = async (taskId: string) => {
    if (!project) return
    const updatedTasks = project.tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    )
    const updatedProject = { ...project, tasks: updatedTasks }
    const updatedProjects = allProjects.map(p => p.id === project.id ? updatedProject : p)
    setProject(updatedProject)
    await saveProjects(updatedProjects)
  }

  const addTask = async () => {
    if (!project) return
    const newTask: Task = {
      id: uuid.v4() as string, // ✅ Expo-compatible UUID
      title: taskTitle,
      completed: false
    }
    const updatedProject = { ...project, tasks: [...project.tasks, newTask] }
    const updatedProjects = allProjects.map(p => p.id === project.id ? updatedProject : p)
    setProject(updatedProject)
    await saveProjects(updatedProjects)
    setTaskTitle('')
  }
  

  if (!project) return <Text>Loading...</Text>

  const completed = project.tasks.filter(t => t.completed).length

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text>{`${completed} of ${project.tasks.length} tasks done`}</Text>
      <TextInput
        placeholder="New Task"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={project.tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskItem task={item} toggle={() => toggleTask(item.id)} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
})
