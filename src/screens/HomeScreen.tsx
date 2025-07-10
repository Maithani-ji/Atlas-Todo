import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { Project } from '../types'
import { getProjects, saveProjects } from '../utils/storage'
import uuid from 'react-native-uuid'
import ProjectItem from '../components/ProjectItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Projects'>

const HomeScreen = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [newTitle, setNewTitle] = useState('')
  const navigation = useNavigation<NavigationProp>()

  useFocusEffect(
    useCallback(() => {
      load()
    }, [])
  )

  const load = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const addProject = async () => {
    if (!newTitle.trim()) return
    const newProject: Project = {
      id: uuid.v4() as string,
      title: newTitle.trim(),
      tasks: [],
    }

    const updated = [...projects, newProject]
    setProjects(updated)
    await saveProjects(updated)
    setNewTitle('')
  }

  const confirmDelete = (projectId: string) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteProject(projectId),
        },
      ]
    )
  }

  const deleteProject = async (projectId: string) => {
    const updated = projects.filter(p => p.id !== projectId)
    setProjects(updated)
    await saveProjects(updated)
  }

  const renderHeader = useMemo(() => (
    <View style={styles.header}>
      <Text style={styles.heading}>My Projects</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter project title"
          value={newTitle}
          onChangeText={setNewTitle}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addProject}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [newTitle])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: '10%', backgroundColor: '#f4f4f4' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}
            onLongPress={() => confirmDelete(item.id)}
          >
            <ProjectItem project={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<Text style={styles.empty}>No projects yet.</Text>}
        contentContainerStyle={projects.length === 0 ? styles.centered : { padding: 16 }}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#666',
    marginTop: 32,
    fontSize: 16,
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
})

export default HomeScreen
