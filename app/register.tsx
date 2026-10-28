
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleRegister() {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Password too short',
        'Your password must be at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please check your passwords.');
      return;
    }

    Alert.alert(
      'Registration form complete',
      'Account creation will be connected to authentication later.'
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.appTitle}>
              NMSU Studyroom Rating App
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join the NMSU studyroom community.
            </Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor="#777777"
              autoCapitalize="words"
              autoComplete="name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#777777"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              placeholderTextColor="#777777"
              secureTextEntry
              autoComplete="new-password"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              placeholderTextColor="#777777"
              secureTextEntry
              autoComplete="new-password"
            />

            <Pressable
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>
                Create Account
              </Text>
            </Pressable>

            <View style={styles.signInRow}>
              <Text style={styles.secondaryText}>
                Already have an account?
              </Text>
              <Pressable onPress={() => router.replace('/login')}>
                <Text style={styles.link}> Sign In</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => router.replace('/')}
              style={styles.backButton}
            >
              <Text style={styles.link}>← Back to Home</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F4',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 520,
    paddingVertical: 20,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B1E2D',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DDD8',
    borderRadius: 14,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#222222',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 7,
  },
  input: {
    minHeight: 46,
    backgroundColor: '#F8F7F4',
    borderWidth: 1,
    borderColor: '#D0C9C5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222222',
  },
  registerButton: {
    backgroundColor: '#8B1E2D',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 24,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 22,
  },
  secondaryText: {
    color: '#666666',
    fontSize: 14,
  },
  link: {
    color: '#8B1E2D',
    fontSize: 14,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
  },
});
