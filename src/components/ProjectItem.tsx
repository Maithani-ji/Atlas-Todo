import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Project } from '../types'

type Props = {
  project: Project
  onPress: () => void
}

export default function ProjectItem({ project, onPress }: Props) {
  const done = project.tasks.filter(t => t.completed).length
  const total = project.tasks.length
  const isCompleted = done === total && total > 0

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{project.title}</Text>
      <Text>{`${done} of ${total} tasks`}</Text>
      <Text>Status: {isCompleted ? 'Completed' : 'In Progress'}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 6,
  },
  title: { fontWeight: 'bold' },
})
