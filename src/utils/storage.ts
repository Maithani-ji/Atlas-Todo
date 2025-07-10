import AsyncStorage from '@react-native-async-storage/async-storage'
import { Project } from '../types'

const STORAGE_KEY = 'projects'

export const getProjects = async (): Promise<Project[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveProjects = async (projects: Project[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}
