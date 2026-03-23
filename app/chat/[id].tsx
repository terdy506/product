import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useChat, Message } from '@/context/ChatContext';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const { getChatRoom, sendMessage } = useChat();
  const room = getChatRoom(id as string);
  
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  if (!room) return <View style={styles.container}><Text>Chat not found</Text></View>;

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(room.id, inputText);
    setInputText('');
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.senderId === 'me';
    return (
      <View style={[styles.messageRow, isMe ? styles.myMessageRow : styles.theirMessageRow]}>
        <View style={[
          styles.messageBubble,
          isMe ? 
            { backgroundColor: theme.primary } : 
            { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }
        ]}>
          <Text style={[styles.messageText, { color: isMe ? '#FFFFFF' : theme.text }]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        ref={flatListRef}
        data={room.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={[styles.inputContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
          placeholder="Type a message..."
          placeholderTextColor={theme.secondary}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.primary }]} onPress={handleSend}>
          <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 16,
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
