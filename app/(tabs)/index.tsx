import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useCommunity, Post } from '@/context/CommunityContext';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { posts } = useCommunity();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, authLoading]);

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity 
      style={[styles.postCard, { backgroundColor: theme.card, borderBottomColor: theme.border }]}
      onPress={() => router.push(`/community/${item.id}`)}
    >
      <View style={styles.postHeader}>
        <Text style={[styles.category, { color: theme.primary }]}>{item.category}</Text>
        <Text style={[styles.time, { color: theme.secondary }]}>{item.createdAt}</Text>
      </View>
      <Text style={[styles.postTitle, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
      <Text style={[styles.postContent, { color: theme.secondary }]} numberOfLines={2}>{item.content}</Text>
      <View style={styles.postFooter}>
        <View style={styles.stat}>
          <IconSymbol name="message.fill" size={14} color={theme.secondary} />
          <Text style={[styles.statText, { color: theme.secondary }]}>{item.commentCount}</Text>
        </View>
        <Text style={[styles.author, { color: theme.secondary }]}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  if (authLoading || !isAuthenticated) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/community/new')}
      >
        <IconSymbol name="plus.circle.fill" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  postCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  author: {
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
