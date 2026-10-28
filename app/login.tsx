
import { router } from 'expo-router';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const handleLogin = () => {
    Alert.alert(
      'Login',
      'Authentication will be connected in a future step.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.loginContent}>
          {/* Profile placeholder */}
          <View style={styles.avatar} />

          {/* Page title */}
          <Text style={styles.title}>LOGIN</Text>

          {/* Username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#555555"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Username"
          />

          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#555555"
            secureTextEntry
            autoCapitalize="none"
            accessibilityLabel="Password"
          />

          {/* Login button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
            accessibilityRole="button"
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>

          
          
{/* Registration prompt */}
<View style={styles.registerRow}>
  <Text style={styles.registerText}>New User? </Text>
  <Pressable onPress={() => router.push('/register')}>
    <Text style={styles.registerLink}>Register</Text>
  </Pressable>
</View>


          {/* Back to Home button */}
          <Pressable
            onPress={() => router.replace('/')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </Pressable>

          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },

  loginContent: {
    width: '70%',
    maxWidth: 360,
    alignSelf: 'center',
    alignItems: 'stretch',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#777777',
    alignSelf: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: '300',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 10,
  },

  input: {
    height: 34,
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    fontSize: 12,
    color: '#111111',
    marginBottom: 12,
    borderRadius: 1,
  },

  loginButton: {
    height: 36,
    backgroundColor: '#000000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  registerText: {
    color: '#111111',
    fontSize: 11,
  },

  registerLink: {
    color: '#1673E6',
    fontSize: 11,
  },

  backButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 12,
  },

  backButtonText: {
    color: '#8B1E2D',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

});
