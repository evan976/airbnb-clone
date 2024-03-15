'use strict'

import listingsData from './airbnb-listings.json'
import listingsGeoData from './airbnb-listings.geo.json'
/**
 * @type {import('../../types/index').Listing[]}
 */
export const listings = listingsData

/**
 * @type {import('../../types/index').FeatureCollection}
 */
export const listingsGeo = listingsGeoData