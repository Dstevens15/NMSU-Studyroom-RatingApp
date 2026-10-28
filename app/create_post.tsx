
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreatePostScreen() {
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [ratings, setRatings] = useState([0, 0, 0]);

  function updateRating(index: number, value: number) {
    setRatings((previous) =>
      previous.map((rating, i) => (i === index ? value : rating))
    );
  }

  function clearForm() {
    setLocation('');
    setStory('');
    setRoomNumber('');
    setRatings([0, 0, 0]);
  }

  function submitPost() {
    if (!location.trim() || !story.trim()) {
      Alert.alert(
        'Missing information',
        'Please enter a location and building story.'
      );
      return;
    }

    Alert.alert(
      'Post ready',
      'Your post is ready. Permanent storage will be added later.'
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Post</Text>

        <Pressable
          onPress={() => router.push('/login')}
          style={styles.signIn}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter building or studyroom"
            placeholderTextColor="#777777"
          />

          <Text style={styles.label}>Story of Building</Text>
          <TextInput
            style={[styles.input, styles.storyInput]}
            value={story}
            onChangeText={setStory}
            placeholder="Describe this study location"
            placeholderTextColor="#777777"
            multiline
          />

          <Text style={styles.label}>Room Number</Text>
          <TextInput
            style={styles.input}
            value={roomNumber}
            onChangeText={setRoomNumber}
            placeholder="Enter room number"
            placeholderTextColor="#777777"
          />

          {['Overall Rating', 'Study Environment', 'Comfort'].map(
            (category, index) => (
              <View style={styles.ratingSection} key={category}>
                <Text style={styles.label}>{category}</Text>

                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Pressable
                      key={value}
                      onPress={() => updateRating(index, value)}
                      accessibilityRole="button"
                      accessibilityLabel={`${category}: ${value} stars`}
                    >
                      <Text
                        style={[
                          styles.star,
                          value <= ratings[index] && styles.selectedStar,
                        ]}
                      >
                        ★
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )
          )}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.deleteButton} onPress={clearForm}>
            <Text style={styles.deleteText}>Clear</Text>
          </Pressable>

          <Pressable style={styles.postButton} onPress={submitPost}>
            <Text style={styles.postText}>Post</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.replace('/')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back to Home</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E2DE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B1E2D',
  },
  signIn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1E2D',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  signInText: {
    fontSize: 13,
    color: '#8B1E2D',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
    width: '100%',
    maxWidth: 650,
    alignSelf: 'center',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0DDD8',
  },
  label: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
  },
  input: {
    minHeight: 42,
    backgroundColor: '#F8F7F4',
    borderWidth: 1,
    borderColor: '#D0C9C5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222222',
  },
  storyInput: {
    minHeight: 85,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  ratingSection: {
    marginTop: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  star: {
    fontSize: 30,
    color: '#D0C9C5',
  },
  selectedStar: {
    color: '#8B1E2D',
  },
  actions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 18,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B1E2D',
    paddingVertical: 14,
    borderRadius: 10,
  },
  deleteText: {
    color: '#8B1E2D',
    fontSize: 16,
    fontWeight: '600',
  },
  postButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8B1E2D',
    paddingVertical: 14,
    borderRadius: 10,
  },
  postText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 12,
  },
  backText: {
    color: '#8B1E2D',
    fontSize: 15,
  },
});
