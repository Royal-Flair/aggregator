interface Announcement {
    date: string;
    text: string;
    author: string;
    tag: string;
    link: string;
  }
  
  const announcements: Announcement[] = [
    {
      date: "February 15 2024",
      text: "The Nothing Phone (2a) launch event is happening in Delhi, India on 5th March 2024! To find out more and book your ticket, head to the Launch Event thread on nothing.community",
      author: "Nothing",
      tag: "Hardware, Community event",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
    {
      date: "February 13 2024",
      text: "Introducing Quests on Codex: RAM Bundle Upgrading FAQ",
      author: "Wanderers",
      tag: "Game, Update, New NFTs",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
    {
      date: "February 17 2024",
      text: "Please Note: Wanderers is currently not available for public play as it is still in its alpha development phase. We are excited to announce that the first round of closed beta testing will begin at the end of Q1 2024. To participate in the closed beta, players must either be holding a RAM Bundle or have a beta code. Stay tuned on X and in Discord for updates.",
      author: "Wanderers",
      tag: "Game, Update",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
  ];
  
  export default announcements;  