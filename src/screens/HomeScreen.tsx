import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View, TextInput, Button, StyleSheet } from 'react-native'
import { Project } from '../types'
import { getProjects, saveProjects } from '../utils/storage'
import uuid from 'react-native-uuid' // ✅ Default import
import ProjectItem from '../components/ProjectItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Projects'>

const HomeScreen = ({}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [newTitle, setNewTitle] = useState('')
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    load()
  }, [])
useFocusEffect(useCallback(() => {
    load()
},[]))
  const load = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const addProject = async () => {
    const newProject: Project = {
      id: uuid.v4() as string, // ✅ Safe and TypeScript-compatible
      title: newTitle,
      tasks: [],
    }

    const updated = [...projects, newProject]
    setProjects(updated)
    await saveProjects(updated)
    setNewTitle('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New Project Title"
        value={newTitle}
        onChangeText={setNewTitle}
        style={styles.input}
      />
      <Button title="Add Project" onPress={addProject} />

      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProjectItem
            project={item}
            onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
})

export default HomeScreen
