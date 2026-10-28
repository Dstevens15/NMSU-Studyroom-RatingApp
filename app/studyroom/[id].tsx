
import { router, useLocalSearchParams } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StudyroomDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const studyrooms: Record<
    string,
    { name: string; rating: string; description: string; rooms: string }
  > = {
    zuhl: {
      name: 'Zuhl Library',
      rating: '4/5',
      description:
        'A place to study, read, and work on assignments at NMSU.',
      rooms: 'Study areas and seating throughout the library.',
    },
    branson: {
      name: 'Branson Library',
      rating: '4/5',
      description:
        'A study space for individual study and group work.',
      rooms: 'Quiet areas and spaces for focused studying.',
    },
    corbett: {
      name: 'Corbett Center',
      rating: '4/5',
      description:
        'A convenient campus location to meet, relax, and study.',
      rooms: 'Common seating and study spaces.',
    },
  };

  const room = studyrooms[String(id).toLowerCase()] ?? {
    name: 'Studyroom',
    rating: 'Not rated yet',
    description: 'Study location at NMSU.',
    rooms: 'Studyroom information will be added later.',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>NMSU Studyroom Ratings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => router.replace('/')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back to Home</Text>
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.locationName}>{room.name}</Text>

          <Text style={styles.rating}>⭐ {room.rating}</Text>

          <Text style={styles.sectionTitle}>About this location</Text>
          <Text style={styles.description}>{room.description}</Text>

          <Text style={styles.sectionTitle}>Study areas</Text>
          <Text style={styles.description}>{room.rooms}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Student Reviews</Text>
          <Text style={styles.description}>
            Student reviews will appear here once review storage is added.
          </Text>
        </View>

        <Pressable
          style={styles.createPostButton}
          onPress={() => router.push('/create_post')}
        >
          <Text style={styles.createPostText}>+ Write a Review</Text>
        </Pressable>
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
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E2DE',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B1E2D',
  },
  content: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginBottom: 12,
  },
  backText: {
    color: '#8B1E2D',
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DDD8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  locationName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#666666',
  },
  createPostButton: {
    backgroundColor: '#8B1E2D',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  createPostText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
