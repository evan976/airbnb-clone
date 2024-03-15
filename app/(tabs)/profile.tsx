import * as React from 'react'
import { Link } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { View, Text, Button } from 'react-native'

export default function Profile() {
  const { isSignedIn, signOut } = useAuth()
  return (
    <View>
      <Button title='Log out' onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href="/(modals)/login">
          <Text>Login</Text>
        </Link>
      )
      }
    </View>
  )
}
