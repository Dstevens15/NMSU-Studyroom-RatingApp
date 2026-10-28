
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>
          NMSU Studyroom Rating App
        </Text>

        <Pressable
          onPress={() => router.push('/login')}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>
          Studyroom Ratings
        </Text>

        <Text style={styles.subtitle}>
          Discover and rate your favorite places to study at NMSU.
        </Text>

        <Pressable
          onPress={() => router.push('/create_post')}
          style={styles.createPostButton}
        >
          <Text style={styles.createPostText}>
            + Create Post
          </Text>
        </Pressable>

        {/* Zuhl Library */}
        <Pressable
          style={styles.locationCard}
          onPress={() => router.push('/studyroom/zuhl')}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.locationName}>Zuhl Library</Text>
            <Text style={styles.description}>
              A place to study, read, and work on assignments.
            </Text>
            <Text style={styles.rating}>⭐ 4/5</Text>
          </View>
        </Pressable>

        {/* Branson Library */}
        <Pressable
          style={styles.locationCard}
          onPress={() => router.push('/studyroom/branson')}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.locationName}>Branson Library</Text>
            <Text style={styles.description}>
              A study space for individual and group work.
            </Text>
            <Text style={styles.rating}>⭐ 4/5</Text>
          </View>
        </Pressable>

        {/* Corbett Center */}
        <Pressable
          style={styles.locationCard}
          onPress={() => router.push('/studyroom/corbett')}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.locationName}>Corbett Center</Text>
            <Text style={styles.description}>
              A convenient campus location to meet and study.
            </Text>
            <Text style={styles.rating}>⭐ 4/5</Text>
          </View>
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
    marginBottom: 24,
  },
  createPostButton: {
    backgroundColor: '#8B1E2D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  createPostText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DDD8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
  },
  rating: {
    fontSize: 15,
    marginTop: 10,
    color: '#333333',
  },
});
