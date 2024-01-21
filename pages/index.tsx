import Image from 'next/image'
import Layout from '@/components/Core/Layout'
import BaseUserFeed from '@/components/Feed';
import { PostCard } from '@/components/post-card';

export default function Home() {
  return (      
    <>
    <BaseUserFeed />
    <PostCard />
    </>
  );
};