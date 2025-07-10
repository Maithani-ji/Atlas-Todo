import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Project } from '../types'

type Props = {
  project: Project
  
}

const ProjectItem = ({ project }: Props) => {
  const completed = project.tasks.filter(t => t.completed).length
  const total = project.tasks.length
  const isDone = completed === total && total > 0

  return (
    <View style={styles.card}  >
      <Text style={styles.title}>{project.title}</Text>
      <View style={styles.meta}>
        <Text style={styles.progress}>{`${completed} of ${total} done`}</Text>
        <Text style={[styles.status, isDone ? styles.done : styles.inProgress]}>
          {isDone ? 'Completed' : 'In Progress'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progress: {
    color: '#777',
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  done: {
    color: '#28a745',
  },
  inProgress: {
    color: '#ff9500',
  },
})

export default ProjectItem
