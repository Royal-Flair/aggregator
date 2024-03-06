import announcements, { Announcement } from "../components/Content/Announcements";

// Get bookmarked announcements from local storage
export const getBookmarkedAnnouncements = (): Announcement[] => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    const bookmarkIndices: number[] = JSON.parse(storedBookmarks);
    // Assuming your announcements are stored in a constant named 'announcements'
    const bookmarkedAnnouncements: Announcement[] = bookmarkIndices.map(
      (index) => announcements[index]
    );
    return bookmarkedAnnouncements;
  } else {
    return [];
  }
};