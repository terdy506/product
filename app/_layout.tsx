import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/AuthContext';
import { CommunityProvider } from '@/context/CommunityContext';
import { ChatProvider } from '@/context/ChatContext';
import { ScheduleProvider } from '@/context/ScheduleContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <CommunityProvider>
        <ChatProvider>
          <ScheduleProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                
                {/* Auth Screens */}
                <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                <Stack.Screen name="auth/signup" options={{ title: 'Sign Up', headerBackTitle: 'Login' }} />
                <Stack.Screen name="auth/verify" options={{ title: 'Verify Email', headerBackTitle: 'Sign Up' }} />

                {/* Feature Screens */}
                <Stack.Screen name="community/[id]" options={{ title: 'Post' }} />
                <Stack.Screen name="community/new" options={{ presentation: 'modal', title: 'Write Post' }} />
                <Stack.Screen name="chat/[id]" options={{ title: 'Chat' }} />
                <Stack.Screen name="schedule/new" options={{ presentation: 'modal', title: 'Add Class' }} />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </ScheduleProvider>
        </ChatProvider>
      </CommunityProvider>
    </AuthProvider>
  );
}
