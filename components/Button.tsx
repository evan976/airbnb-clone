import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'outline'
}

export default function Button({
  title,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
})