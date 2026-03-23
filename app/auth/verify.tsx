import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function VerifyScreen() {
  const [code, setCode] = useState('');
  const { verifyEmail, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit code');
      return;
    }

    const success = await verifyEmail(code);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Verification Failed', 'Incorrect code. Try 123456');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Check your email</Text>
        <Text style={[styles.subtitle, { color: theme.secondary }]}>
          We sent a verification code to your school email.
        </Text>

        <Input
          label="Verification Code"
          placeholder="123456"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={6}
          style={styles.input}
        />

        <Button 
          title="Verify" 
          onPress={handleVerify} 
          isLoading={isLoading} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  content: {
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
  },
});
