// API client for backend integration (http://localhost:8000)
import { Post } from './components/PostList';
import { Comment } from './components/CommentList';

const API_BASE = 'http://localhost:8000/api';

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

export async function fetchPost(postId: string): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${postId}`);
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

export async function createPost(data: { username: string; content: string }): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

export async function updatePost(postId: string, data: { username: string; content: string }): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

export async function deletePost(postId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${postId}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 404) throw new Error('API unavailable');
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`);
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

export async function createComment(postId: string, data: { username: string; content: string }): Promise<Comment> {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

export async function likePost(postId: string, data: { username: string }): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${postId}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API unavailable');
}

export async function unlikePost(postId: string, data: { username: string }): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${postId}/likes`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API unavailable');
}
