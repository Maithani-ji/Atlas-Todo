import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Task } from '../types'

type Props = {
  task: Task
  toggle: () => void
  onDelete: () => void
}

export default function TaskItem({ task, toggle, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={toggle} style={styles.taskContent}>
        <View style={[styles.circle,task.completed && styles.circleFilled]} />
        <Text style={[styles.text, task.completed && styles.completedText]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007aff',
    marginRight: 10,
  },
  circleFilled: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  delete: {
    color: '#ff3b30',
    fontSize: 18,
    paddingHorizontal: 8,
  },
})
