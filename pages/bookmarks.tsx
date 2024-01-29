// pages/bookmarks.tsx
import React from "react";
import { PostCard } from "../components/book-card";
import SearchBar from "../components/Content/AddToFeed";
import { Announcement } from "../components/Content/Announcements";
import { getBookmarkedAnnouncements } from "../lib/bookmarks";

const Bookmarks: React.FC = () => {
  const handleAddToFeed = (url: string) => {
    console.log("Adding URL to feed:", url);
  };

  // Get the bookmarked announcements
  const bookmarkedAnnouncements: Announcement[] = getBookmarkedAnnouncements();

  return (
    <>
      <div className="flex flex-col items-center justify-center my-2">
        <SearchBar onAddToFeed={handleAddToFeed} />
        <PostCard announcements={bookmarkedAnnouncements} />
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium py-3">
          {/* Your navigation buttons */}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
