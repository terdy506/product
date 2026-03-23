import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signup, sendVerificationCode, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleSignup = async () => {
    if (!name || !studentId || !department || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.endsWith('@school.ac.jp')) {
      Alert.alert('Invalid Email', 'Please use your school email (@school.ac.jp)');
      return;
    }

    await signup({ name, studentId, department, email, password });
    await sendVerificationCode(email);
    router.push('/auth/verify');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.secondary }]}>Join your school community</Text>
        </View>

        <View style={styles.form}>
          <Input label="Full Name" placeholder="John Doe" value={name} onChangeText={setName} />
          <Input label="Student ID" placeholder="20240001" value={studentId} onChangeText={setStudentId} keyboardType="numeric" />
          <Input label="Department" placeholder="Computer Science" value={department} onChangeText={setDepartment} />
          <Input 
            label="School Email" 
            placeholder="student@school.ac.jp" 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
          />
          <Input label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
          
          <Button 
            title="Next" 
            onPress={handleSignup} 
            isLoading={isLoading} 
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 0,
  },
  button: {
    marginTop: 16,
  },
});
