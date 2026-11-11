
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import bransonImage from '../../assets/images/Branson.png';
import corbettImage from '../../assets/images/Corbett.jpeg';
import garciaImage from '../../assets/images/Garcia.jpg';
import hardmanImage from '../../assets/images/Hardman.jpeg';
import laVistaImage from '../../assets/images/LaVista.jpeg';
import nativeAmericanImage from '../../assets/images/NA.png';
import zuhlImage from '../../assets/images/Zuhl.png';

const API_URL = 'http://172.24.253.142:3000';

const studyrooms = [
  {
    id: 'zuhl',
    name: 'Zuhl Library',
    description: 'A place to study, read, and work on assignments.',
    image: zuhlImage,
    printing: false,
  },
  {
    id: 'branson',
    name: 'Branson Library',
    description: 'A study space for individual and group work.',
    image: bransonImage,
    printing: true,
  },
  {
    id: 'corbett',
    name: 'Corbett Center',
    description: 'A convenient campus location to meet, relax, and study.',
    image: corbettImage,
    printing: false,
  },
  {
    id: 'native-american',
    name: 'Native American Center',
    description: 'A welcoming campus space for studying and student gatherings.',
    image: nativeAmericanImage,
    printing: true,
  },
  {
    id: 'la-vista',
    name: 'La Vista Learning Center',
    description: 'A learning center offering spaces for individual and group study.',
    image: laVistaImage,
    printing: false,
  },
  {
    id: 'hardman-jacobs',
    name: 'Hardman & Jacobs Undergraduate Learning Center',
    description: 'A campus learning center with computer labs and study areas.',
    image: hardmanImage,
    printing: false,
  },
  {
    id: 'garcia',
    name: 'Garcia Center',
    description: 'A student center offering lounge and study spaces.',
    image: garciaImage,
    printing: false,
  },
];

type Review = {
  overall_rating: number;
};

type RatingSummary = {
  average: number;
  count: number;
};

type RatingMap = Record<string, RatingSummary>;
type FilterType = 'all' | 'printing';

export default function HomeScreen() {
  const [ratings, setRatings] = useState<RatingMap>({});
  const [ratingsLoading, setRatingsLoading] = useState(true);
  const [ratingsError, setRatingsError] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>('all');

  useEffect(() => {
    let active = true;

    async function loadRatings() {
      try {
        setRatingsLoading(true);
        setRatingsError(false);

        const responses = await Promise.all(
          studyrooms.map((location) =>
            fetch(`${API_URL}/api/reviews/${location.id}`)
          )
        );

        const responseData = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              throw new Error('Unable to retrieve studyroom ratings.');
            }
            return response.json();
          })
        );

        const summaries: RatingMap = {};

        studyrooms.forEach((location, index) => {
          const reviews: Review[] = responseData[index].reviews || [];

          const total = reviews.reduce(
            (sum, review) => sum + Number(review.overall_rating),
            0
          );

          summaries[location.id] = {
            average:
              reviews.length > 0
                ? Math.round((total / reviews.length) * 10) / 10
                : 0,
            count: reviews.length,
          };
        });

        if (active) setRatings(summaries);
      } catch (error) {
        console.error('Homepage rating error:', error);
        if (active) setRatingsError(true);
      } finally {
        if (active) setRatingsLoading(false);
      }
    }

    loadRatings();

    return () => {
      active = false;
    };
  }, []);

  function renderRating(locationId: string) {
    if (ratingsLoading) return 'Loading ratings...';
    if (ratingsError) return 'Ratings unavailable';

    const summary = ratings[locationId];

    if (!summary || summary.count === 0) return 'Not rated yet';

    return `⭐ ${summary.average.toFixed(1)}/5 · ${summary.count} ${
      summary.count === 1 ? 'review' : 'reviews'
    }`;
  }

  const filteredLocations = studyrooms.filter((location) => {
    const search = searchQuery.trim().toLowerCase();

    const matchesSearch =
      location.name.toLowerCase().includes(search) ||
      location.description.toLowerCase().includes(search);

    const matchesFilter =
      selectedFilter === 'all' || location.printing;

    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>NMSU Studyrooms</Text>

        <Pressable
          onPress={() => router.push('/login')}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Studyrooms</Text>

        <Text style={styles.subtitle}>
          Discover and rate your favorite places to study
        </Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search study locations..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>×</Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          <Pressable
            onPress={() => setSelectedFilter('all')}
            style={[
              styles.filterChip,
              selectedFilter === 'all' && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'all' && styles.filterChipTextActive,
              ]}
            >
              All Locations
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedFilter('printing')}
            style={[
              styles.filterChip,
              selectedFilter === 'printing' && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'printing' && styles.filterChipTextActive,
              ]}
            >
              🖨 Free Printing
            </Text>
          </Pressable>
        </ScrollView>

        <Text style={styles.resultsCount}>
          Showing {filteredLocations.length} of {studyrooms.length} study locations
        </Text>

        <Pressable
          onPress={() => router.push('/create_post')}
          style={styles.createPostButton}
        >
          <Text style={styles.createPostText}>
            + Recommend a Study Location
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/campus_map')}
          style={styles.mapButton}
        >
          <Text style={styles.mapButtonText}>
            🗺 Explore NMSU Campus Map
          </Text>
        </Pressable>

        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <Pressable
              key={location.id}
              style={styles.locationCard}
              onPress={() => router.push(`/studyroom/${location.id}`)}
            >
              <Image
                source={location.image}
                style={styles.locationImage}
                resizeMode="cover"
              />

              <View style={styles.cardInfo}>
                <Text style={styles.locationName}>
                  {location.name}
                </Text>

                <Text style={styles.description}>
                  {location.description}
                </Text>

                {location.printing && (
                  <View style={styles.featureTag}>
                    <Text style={styles.featureText}>
                      🖨 Free Printing
                    </Text>
                  </View>
                )}

                <Text style={styles.rating}>
                  {renderRating(location.id)}
                </Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyResults}>
            <Text style={styles.emptyResultsTitle}>
              No study locations found
            </Text>

            <Text style={styles.emptyResultsText}>
              Try another search or change your filter.
            </Text>

            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>
                Clear Search and Filters
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E2DE',
  },
  appTitle: {
    flexShrink: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B1E2D',
  },
  signInButton: {
    borderWidth: 1,
    borderColor: '#8B1E2D',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  signInText: {
    color: '#8B1E2D',
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DDD8',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchIcon: {
    fontSize: 25,
    color: '#777777',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222222',
    paddingVertical: 14,
  },
  clearSearch: {
    fontSize: 25,
    color: '#777777',
    paddingHorizontal: 5,
  },
  filterRow: {
    gap: 10,
    paddingBottom: 12,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#D8D3CC',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  filterChipActive: {
    backgroundColor: '#8B1E2D',
    borderColor: '#8B1E2D',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  resultsCount: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 16,
  },
  createPostButton: {
    backgroundColor: '#8B1E2D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  createPostText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#8B1E2D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  mapButtonText: {
    color: '#8B1E2D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DDD8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  locationImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#E5E2DE',
  },
  cardInfo: {
    padding: 20,
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
  },
  featureTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1EEE7',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555044',
  },
  rating: {
    fontSize: 15,
    marginTop: 10,
    color: '#333333',
  },
  emptyResults: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DDD8',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },
  emptyResultsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#8B1E2D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
