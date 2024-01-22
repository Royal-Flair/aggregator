import React, { useState, FormEvent } from "react";

interface SearchBarProps {
  onAddToFeed: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddToFeed }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddToFeed(url);
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mr-2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add to Feed
      </button>
    </form>
  );
};

export default SearchBar;