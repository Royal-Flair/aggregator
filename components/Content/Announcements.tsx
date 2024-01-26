export interface Announcement {
    date: string;
    text: string;
    author: string;
    tag: string;
    link: string;
  }
  
  const announcements: Announcement[] = [
    {
      date: "October 09 2023",
      text: "Mainnet launch of Lens V2 is scheduled for October 30 2023. The Lens V1 API will continue to work, but will go into read-only mode on October 30th and will only have old V1 data. Writes will not work on that API after we pause it but will still be readable for a month or so.",
      author: "Lens Protocol",
      tag: "Programming, Updates",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
    {
      date: "February 16 2024",
      text: "Scam alert: we've been made aware of a token called DeSci Labs Token `https://coinsniper.net/coin/60694` This listing on Binance Smart Chain **IS NOT US** and has nothing to do with DeSci Labs",
      author: "DeSci Labs",
      tag: "Scam alert",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
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
    {
      date: "February 17 2024",
      text: "MDP-129: DeSci Community Validations Community Validations (CVs) offer a DAO-native way to earn reputation by validating science openly. This project outlines MoonDAO's role as an early adopter and collaborator in the decentralized science community, particularly in lunar research. Total Cost: 1 ETH",
      author: "MoonDAO",
      tag: "Proposal, New NFT, Community",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
    {
      date: "July 19 2023",
      text: "Please head over to Swanky Harpy's Kingdom, open a ticket and indicate you're from TokenTag, to claim your OG spots and WL spots NFT.",
      author: "TokenTag",
      tag: "Community, New NFT",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
    {
      date: "February 15 2023",
      text: "As a token of our appreciation, each tester will receive $100 in thirdweb credits after completion and signup. These can be applied to any of our usage, paid plans or the Engine cloud-hosted add-on.",
      author: "Thirdweb",
      tag: "Airdrop, Software test",
      link: "https://discord.com/channels/834227967404146718/920652490372943902/1207481379588284487",
    },
  ];
  
  export default announcements;  