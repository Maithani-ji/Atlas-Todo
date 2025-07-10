import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { getProjects, saveProjects } from '../utils/storage'
import { Project, Task } from '../types'
import uuid from 'react-native-uuid'
import TaskItem from '../components/TaskItem'

export default function ProjectDetailsScreen() {
  const route = useRoute<RouteProp<{ params: { projectId: string } }, 'params'>>()
  const navigation = useNavigation()
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
    const updatedProjects = allProjects.map(p => (p.id === project.id ? updatedProject : p))
    setProject(updatedProject)
    await saveProjects(updatedProjects)
  }

  const deleteTask = async (taskId: string) => {
    if (!project) return
    const updatedTasks = project.tasks.filter(t => t.id !== taskId)
    const updatedProject = { ...project, tasks: updatedTasks }
    const updatedProjects = allProjects.map(p => (p.id === project.id ? updatedProject : p))
    setProject(updatedProject)
    await saveProjects(updatedProjects)
  }

  const addTask = async () => {
    if (!project || !taskTitle.trim()) return

    const newTask: Task = {
      id: uuid.v4() as string,
      title: taskTitle.trim(),
      completed: false,
    }

    const updatedProject = { ...project, tasks: [...project.tasks, newTask] }
    const updatedProjects = allProjects.map(p => (p.id === project.id ? updatedProject : p))
    setProject(updatedProject)
    await saveProjects(updatedProjects)
    setTaskTitle('')
  }

  if (!project) return <Text style={styles.loading}>Loading...</Text>

  const completed = project.tasks.filter(t => t.completed).length

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: '10%', backgroundColor: '#f4f4f4' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={project.tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} toggle={() => toggleTask(item.id)} onDelete={() => deleteTask(item.id)} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.subText}>
              {`${completed} of ${project.tasks.length} tasks done`}
            </Text>

            <View style={styles.inputRow}>
              <TextInput
                placeholder="Enter new task"
                value={taskTitle}
                onChangeText={setTaskTitle}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Start by adding one!</Text>
        }
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#444',
  },
  header: {
    marginBottom: 16,
  },
  backBtn: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#007aff',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#222',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
    fontSize: 15,
  },
})
