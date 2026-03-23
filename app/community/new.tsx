import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useCommunity } from '@/context/CommunityContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NewPostScreen() {
  const { categories, addPost } = useCommunity();
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleCreate = () => {
    if (!title || !content || !user) return;
    addPost({
      title,
      content,
      category,
      author: user.name,
    });
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.label, { color: theme.text }]}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBadge,
                { 
                  backgroundColor: category === cat ? theme.primary : theme.card,
                  borderColor: theme.border 
                },
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={{ color: category === cat ? '#FFFFFF' : theme.text }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input
          label="Title"
          placeholder="Enter post title"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          label="Content"
          placeholder="Share your thoughts..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          style={styles.contentInput}
        />

        <Button title="Post" onPress={handleCreate} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  button: {
    marginTop: 24,
  },
});
