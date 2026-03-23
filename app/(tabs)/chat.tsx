import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useChat, ChatRoom } from '@/context/ChatContext';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ChatListScreen() {
  const { chatRooms } = useChat();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity 
      style={[styles.chatItem, { borderBottomColor: theme.border }]}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <View style={[styles.avatar, { backgroundColor: theme.primary + '20' }]}>
        <IconSymbol name="person.fill" size={24} color={theme.primary} />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.participantName, { color: theme.text }]}>{item.participantName}</Text>
          <Text style={[styles.time, { color: theme.secondary }]}>{item.lastMessageTime}</Text>
        </View>
        <Text style={[styles.lastMessage, { color: theme.secondary }]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={chatRooms}
        renderItem={renderChatRoom}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
});
