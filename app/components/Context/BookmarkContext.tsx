"use client"

// bookmarksContext.tsx
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface Announcement {
  date: string;
  text: string;
  author: string;
  tag: string;
  link: string;
}

interface BookmarksContextType {
  bookmarks: Announcement[];
  addBookmark: (announcement: Announcement) => void;
  removeBookmark: (announcement: Announcement) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

interface BookmarksProviderProps {
  children?: ReactNode;
}

const BookmarksProvider: FC<BookmarksProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Announcement[]>([]);

  const addBookmark = (announcement: Announcement) => {
    setBookmarks([...bookmarks, announcement]);
  };

  const removeBookmark = (announcement: Announcement) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark !== announcement));
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksProvider;