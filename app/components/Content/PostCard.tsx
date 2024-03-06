"use client"

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import announcements, { Announcement} from "./Announcements";
import { FaBookmark } from "react-icons/fa";

interface PostCardProps {
  announcements: Announcement[];
}

export function PostCard({ announcements }: PostCardProps) {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  // Load bookmarks from local storage on component mount
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  // Save bookmarks to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  const toggleBookmark = (index: number) => {
    if (bookmarks.includes(index)) {
      // Remove bookmark from bookmarks state
      const updatedBookmarks = bookmarks.filter((i) => i !== index);
      setBookmarks(updatedBookmarks);
      // Remove bookmark from local storage
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } else {
      // Add bookmark to bookmarks state
      setBookmarks([...bookmarks, index]);
      // Save bookmarks to local storage
      localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, index]));
    }
  };
  
  return (
    <div className="flex justify-center py-4">
      <div className="px-2 max-w-screen-lg w-full">
        {announcements.map((announcement, index) => (
          <div key={index} className="w-full mb-4">
            <Card className="w-full border border-gray-200 rounded-lg">
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="overflow-hidden rounded-full border border-gray-200">
                    <img
                      alt="Avatar"
                      height={40}
                      src="https://i.pravatar.cc/48?img=13"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width={40}
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{announcement.author}</p>
                    <p className="text-gray-500 dark:text-gray-400">Posted on {announcement.date}</p>
                  </div>
                  <div className="flex items-center">
                    <FaBookmark
                      className={`text-gray-500 dark:text-gray-400 ${bookmarks.includes(index) ? "text-blue-500" : ""}`}
                      onClick={() => toggleBookmark(index)}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-left">
                  <p>{announcement.text}</p>
                  <div className="flex flex-wrap -mx-1.5">
                    {announcement.tag && announcement.tag.split(", ").map((tag, index) => (
                      <span key={index} className="mx-1.5 text-sm text-gray-500 dark:text-gray-400">#{tag}</span>
                    ))}
                  </div>
                  {bookmarks.includes(index) && (
                    <p className="text-gray-500 dark:text-gray-400">You will be reminded of this message in 24 hours</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}