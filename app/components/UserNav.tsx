import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellElectric, BookmarkIcon, CreditCard, DoorClosed, Home, PenBoxIcon, PencilIcon, Settings, StoreIcon } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

const allowedEmails = [
  "wuppi@nk12.de",
  "poeschke@nk12.de",
  "liam@skinetics.tech",
  "kyuedupfavghdqxcnf@cazlg.com",
  "ahvlybvleaxjiymajb@cazlp.com",
];

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Profile", href: "/dashboard/settings", icon: Settings },
  { name: "Newsletter", href: "/dashboard/posts", icon: PenBoxIcon },
  { name: "Merch & Tours", href: "https://nk12shop.vercel.app", icon: CreditCard },
];

export function UserNav({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  // Determine if the user can create article based on email
  const userCanCreateArticle = allowedEmails.includes(email);

  // Add "Create article" to navItems if user is allowed
  if (userCanCreateArticle) {
    navItems.push({ name: "Create article", href: "/dashboard/posts/create", icon: PencilIcon });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} alt="" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className="w-full flex justify-between items-center"
              >
                {item.name}
                <span>
                  <item.icon className="w-4 h-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="w-full flex justify-between items-center"
          asChild
        >
          <LogoutLink>
            Logout{" "}
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
