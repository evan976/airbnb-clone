import * as React from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Apple = 'oauth_apple',
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
}

export default function Login() {
  useWarmUpBrowser()

  const router = useRouter()

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple })
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google })
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Strategy.Facebook })

  async function onSelectAuth(strategy: Strategy) {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy]

    try {
      const { createdSessionId, setActive } = await selectedAuth()
      if (createdSessionId) {
        setActive?.({ session: createdSessionId })
        router.back()
      }
    } catch (error) {
      console.log('OAuth error', error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 24 }]}
      />
      <TouchableOpacity style={defaultStyles.button}>
        <Text style={defaultStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separator} />
      </View>
      <View style={{ gap: 16 }}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons name='logo-google' size={24} style={defaultStyles.buttonIcon} />
          <Text style={styles.buttonOutlineText}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name='logo-apple' size={24} style={defaultStyles.buttonIcon} />
          <Text style={styles.buttonOutlineText}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons name='logo-facebook' size={24} style={defaultStyles.buttonIcon} />
          <Text style={styles.buttonOutlineText}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  separatorView: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginVertical: 32,
  },
  separator: {
    flex: 1,
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorText: {
    color: Colors.grey,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: Colors.grey,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  buttonOutlineText: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  }
})
