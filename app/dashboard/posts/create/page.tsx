import { Button } from "../../../../UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession, stripe } from "@/app/lib/stripe";
import { redirect } from "next/navigation";
import {
  StripePortal,
  StripeSubscriptionCreationButton,
} from "@/app/components/Submitbuttons";
import { unstable_noStore as noStore } from "next/cache";

const allowedEmails = [
  "wuppi@nk12.de",
  "poeschke@nk12.de",
  "liam@skinetics.tech",
  "arbuckle.liam@gmail.com",
  "kyuedupfavghdqxcnf@cazlg.com",
  "ahvlybvleaxjiymajb@cazlp.com",
];

async function getData(userId: string) {
  noStore();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
};

export default async function BillingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userEmail = user?.email ?? '';

  // Check if the user is in the allowed email list
  if (!allowedEmails.includes(userEmail)) {
    return (
      <p>Only administrators can do this</p>
    );
  }

  const data = await getData(user?.id as string);

  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <iframe src="https://nordkurve12.vercel.app/create" height="1500px" width="95%" />
      </div>
    );
  }

  return (
    <p>You need to sign in with a subscribed account to view the newsletter</p>
  );
}
