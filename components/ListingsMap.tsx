import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from "react-native-map-clustering"
import { listingsGeo } from '@/assets/data/index.mjs'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { currency } from '@/lib/utils'
import Colors from '@/constants/Colors'

const INITIAL_REGION = {
  latitude: 52.499586830677025,
  longitude: 13.34589882667451,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

export default function ListingsMap() {
  const router = useRouter()

  function onMarkerSelected(listing: typeof listingsGeo.features[0]) {
    router.push(`/listing/${listing.properties.id}`)
  }

  function renderCluster(cluster: any) {
    const { id, geometry, onPress, properties } = cluster
    const points = properties.point_count
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
      >
        <View style={[styles.marker, { width: 40, height: 40 }]}>
          <Text style={styles.markerText}>
            {points}
          </Text>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor={Colors.white}
        clusterTextColor={Colors.black}
        clusterFontFamily='Montserrat-SemiBold'
        renderCluster={renderCluster}
      >
        {listingsGeo.features.map((listing) => (
          <Marker
            key={listing.properties.id}
            onPress={() => onMarkerSelected(listing)}
            coordinate={{
              latitude: +listing.properties.latitude,
              longitude: +listing.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                {currency(listing.properties.price)}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  marker: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 99,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
})