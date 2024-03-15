import * as React from 'react'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import Listings from '@/components/Listings'
import ExploreHeader from '@/components/ExploreHeader'
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'

export default function Home() {
  const [category, setCategory] = React.useState('')

  function onCategoryChange(category: string) {
    setCategory(category)
  }
  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onCategoryChange} />
        }}
      />
      <ListingsMap />
      <ListingsBottomSheet category={category} />
    </View>
  )
}
