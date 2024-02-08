"use client"

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import announcements, { Announcement} from "./Announcements";

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
      // Remove from bookmarks
      setBookmarks(bookmarks.filter((i) => i !== index));
    } else {
      // Add to bookmarks
      setBookmarks([...bookmarks, index]);
    }
  };

  return (
    <div className="flex justify-center py-4">
      <div className="px-2 max-w-screen-lg w-full">
        {announcements.map((announcement, index) => (
          <div key={index} className="w-full mb-4">
            <Card className="w-full border border-gray-200 rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
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
                      <p className="text-gray-500 dark:text-gray-400">
                        Posted on {announcement.date}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`${
                      bookmarks.includes(index) ? "text-blue-500" : "text-gray-400"
                    } hover:text-blue-500`}
                    onClick={() => toggleBookmark(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {bookmarks.includes(index) ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      )}
                    </svg>
                  </button>
                </div>
                <div className="mt-4 space-y-2 text-left">
                  <p>{announcement.text}</p>
                  <div className="flex flex-wrap -mx-1.5">
                    {announcement.tag.split(", ").map((tag, index) => (
                      <span
                        key={index}
                        className="mx-1.5 text-sm text-gray-500 dark:text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};