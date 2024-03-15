import * as React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import * as Haptics from 'expo-haptics'
import Colors from '@/constants/Colors'

const categories = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
]

interface Props {
  onCategoryChange: (category: string) => void
}

export default function ExploreHeader({ onCategoryChange }: Props) {
  const scrollRef = React.useRef<ScrollView>(null)
  const itemsRef = React.useRef<Array<TouchableOpacity>>([])
  const [activeIndex, setActiveIndex] = React.useState(0)

  function selectCategory(index: number) {
    const selected = itemsRef.current[index]
    setActiveIndex(index)

    selected.measure((x) => {
      scrollRef.current?.scrollTo({
        x: x - 16,
        y: 0,
        animated: true,
      })
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onCategoryChange(categories[index].name)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href="/(modals)/booking" asChild>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={24} />
              <View>
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Where to?</Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat',
                    color: Colors.grey,
                  }}
                >
                  Anywhere · Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 32,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => selectCategory(index)}
              ref={(element) => itemsRef.current[index] = element!}
              style={activeIndex === index ? styles.categoriesButtonActive : styles.categoriesButton}
            >
              <MaterialIcons
                name={category.icon as any}
                size={24}
                color={activeIndex === index ? Colors.black : Colors.grey}
              />
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: 130,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 12,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchButton: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    alignItems: 'center',
    width: 280,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.secondary,
    borderRadius: 99,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.black,
  },
  categoriesButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesButtonActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
    paddingBottom: 8,
  }
})