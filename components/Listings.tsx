import * as React from 'react'
import { Link } from 'expo-router'
import { FlatList, View, Text, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { listings } from '@/assets/data/index.mjs'
import { type Listing } from '@/types'
import { Ionicons, Octicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { currency } from '@/lib/utils'

interface Props {
  category: string
  refresh: number
}

export default function Listings({ category, refresh }: Props) {
  const listRef = React.useRef<FlatList>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [refresh])

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  const renderItem: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image
              source={{ uri: item.xl_picture_url }}
              style={styles.image}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 32,
                top: 32,
              }}
            >
              <Ionicons name="heart-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Octicons name="star-fill" size={16} color={Colors.black} />
                <Text>{item.review_scores_rating / 20}</Text>
              </View>
            </View>
            <Text style={{ fontFamily: 'Montserrat', fontSize: 14, color: Colors.grey }}>
              {item.room_type}
            </Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{currency(item.price)}</Text>
              <Text style={{ fontFamily: 'Montserrat', color: Colors.grey }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <FlatList<Listing>
        ref={listRef}
        renderItem={renderItem}
        data={loading ? [] : listings}
        ListHeaderComponent={<Text style={styles.info}>{listings.length} Homes</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 8,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 323,
    borderRadius: 12,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginTop: 4,
  },
})
