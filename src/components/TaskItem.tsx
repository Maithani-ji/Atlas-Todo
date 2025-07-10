import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Task } from '../types'

type Props = {
  task: Task
  toggle: () => void
}

export default function TaskItem({ task, toggle }: Props) {
  return (
    <TouchableOpacity onPress={toggle} style={styles.item}>
      <Text style={task.completed ? styles.completed : undefined}>{task.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 6,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
})
