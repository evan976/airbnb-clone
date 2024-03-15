import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import Listings from './Listings'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function ListingsBottomSheet({
  category
}: {
  category: string
}) {
  const [refresh, setRefresh] = React.useState(0)
  const bottomSheetRef = React.useRef<BottomSheet>(null)

  function showMap() {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['10%', '100%']}
      index={1}
      enablePanDownToClose={false}
      handleIndicatorStyle={{
        backgroundColor: Colors.grey,
      }}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings category={category} refresh={refresh} />
        <View style={styles.absoluteButton}>
          <TouchableOpacity style={styles.button} onPress={showMap}>
            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: Colors.white }}>Map</Text>
            <Ionicons name="map" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  absoluteButton: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.dark,
    borderRadius: 99,
    gap: 8,
  },
})