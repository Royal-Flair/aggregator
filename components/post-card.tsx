import { Card } from "@/components/ui/card";
import announcements from "./Content/Announcements";

export function PostCard() {
  return (
    <>
      {announcements.map((announcement, index) => (
        <Card key={index} className="w-full max-w-sm border border-gray-200 rounded-lg">
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
            </div>
            <div className="mt-4 space-y-2">
              <p>{announcement.text}</p>
              <div className="flex flex-wrap -mx-1.5">
                {announcement.tag.split(", ").map((tag, index) => (
                  <span key={index} className="mx-1.5 text-sm text-gray-500 dark:text-gray-400">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};