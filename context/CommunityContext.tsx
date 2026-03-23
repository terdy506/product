import React, { createContext, useState, useContext } from 'react';

export type Post = {
  id: string;
  category: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  commentCount: number;
  likes: number;
};

export type Comment = {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
};

type CommunityContextType = {
  posts: Post[];
  categories: string[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'commentCount' | 'likes'>) => void;
  getPost: (id: string) => Post | undefined;
};

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    category: 'Free',
    title: 'Hello School!',
    content: 'This is the first post in our new community app.',
    author: 'Admin',
    createdAt: '2 mins ago',
    commentCount: 2,
    likes: 5,
  },
  {
    id: '2',
    category: 'Information',
    title: 'Exam Schedule Update',
    content: 'Midterm exams will be held next week. Check the schedule tab.',
    author: 'Academic Affairs',
    createdAt: '1 hour ago',
    commentCount: 0,
    likes: 12,
  },
  {
    id: '3',
    category: 'Market',
    title: 'Selling Calculus Textbook',
    content: 'Brand new, never used. $30. Meet at the library.',
    author: 'Student123',
    createdAt: '3 hours ago',
    commentCount: 5,
    likes: 1,
  },
];

const CATEGORIES = ['Free', 'Information', 'Market', 'Promotion', 'Q&A'];

export const CommunityProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const addPost = (newPostData: Omit<Post, 'id' | 'createdAt' | 'commentCount' | 'likes'>) => {
    const newPost: Post = {
      ...newPostData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: 'Just now',
      commentCount: 0,
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  };

  const getPost = (id: string) => posts.find((p) => p.id === id);

  return (
    <CommunityContext.Provider value={{ posts, categories: CATEGORIES, addPost, getPost }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
