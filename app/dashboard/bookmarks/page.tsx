"use client"

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import React, { useEffect, useState } from "react";
import { PostCard } from "@/app/components/Content/book-card";
// import SearchBar from "../components/Content/AddToFeed";
import { Announcement } from "@/app/components/Content/Announcements";
import { getBookmarkedAnnouncements } from "@/app/lib/bookmarks";

export default function DashboardPage() {

    const handleAddToFeed = (url: string) => {
        console.log("Adding URL to feed:", url);
      };
    
      // Get the bookmarked announcements
      const [bookmarkedAnnouncements, setBookmarkedAnnouncements] = useState<Announcement[]>([]);
    
      useEffect(() => {
        // Fetch bookmarked announcements
        const bookmarks = getBookmarkedAnnouncements();
        setBookmarkedAnnouncements(bookmarks);
      }, []);

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
        <div className="relative z-10 flex flex-col items-center justify-center py-10">
        <PostCard announcements={bookmarkedAnnouncements} />
      </div>
       </div>
       </div>
    </div>
  );
}
