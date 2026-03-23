import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCommunity, Comment } from '@/context/CommunityContext';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getPost } = useCommunity();
  const post = getPost(id as string);
  
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [commentText, setCommentText] = useState('');

  if (!post) return <View style={styles.container}><Text>Post not found</Text></View>;

  // Mock comments
  const comments: Comment[] = [
    { id: '1', postId: post.id, author: 'StudentA', content: 'Great post!', createdAt: '1 min ago' },
    { id: '2', postId: post.id, author: 'StudentB', content: 'Thanks for sharing.', createdAt: 'Just now' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.postHeader, { borderBottomColor: theme.border }]}>
          <Text style={[styles.category, { color: theme.primary }]}>{post.category}</Text>
          <Text style={[styles.title, { color: theme.text }]}>{post.title}</Text>
          <View style={styles.authorRow}>
            <View style={[styles.avatar, { backgroundColor: theme.primary + '20' }]}>
              <IconSymbol name="person.fill" size={16} color={theme.primary} />
            </View>
            <View>
              <Text style={[styles.author, { color: theme.text }]}>{post.author}</Text>
              <Text style={[styles.time, { color: theme.secondary }]}>{post.createdAt}</Text>
            </View>
          </View>
        </View>

        <View style={styles.postBody}>
          <Text style={[styles.content, { color: theme.text }]}>{post.content}</Text>
        </View>

        <View style={[styles.statsRow, { borderTopColor: theme.border, borderBottomColor: theme.border }]}>
          <View style={styles.statItem}>
            <IconSymbol name="message.fill" size={18} color={theme.secondary} />
            <Text style={[styles.statText, { color: theme.secondary }]}>{post.commentCount} Comments</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="house.fill" size={18} color={theme.secondary} />
            <Text style={[styles.statText, { color: theme.secondary }]}>{post.likes} Likes</Text>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Comments</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={[styles.commentCard, { borderBottomColor: theme.border }]}>
              <View style={styles.commentHeader}>
                <Text style={[styles.commentAuthor, { color: theme.text }]}>{comment.author}</Text>
                <Text style={[styles.commentTime, { color: theme.secondary }]}>{comment.createdAt}</Text>
              </View>
              <Text style={[styles.commentText, { color: theme.text }]}>{comment.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.inputContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
          placeholder="Write a comment..."
          placeholderTextColor={theme.secondary}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.primary }]}>
          <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  postHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
  },
  postBody: {
    marginBottom: 24,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 20,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
  },
  commentsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentCard: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    maxHeight: 100,
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
