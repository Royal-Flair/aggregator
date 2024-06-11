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

export default async function AdminPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);

    if (data?.status === "active") {
        return (
          <div className="grid items-start gap-8">
            <div className="flex items-center justify-between px-2">
              <div className="grid gap-1">
                <h1 className="text-3xl md:text-4xl ">Subscription</h1>
                <p className="text-lg text-muted-foreground">
                  Settings regarding your subscription
                </p>
              </div>
            </div>
    
            <Card className="w-full lg:w-2/3">
              <CardHeader>
                <CardTitle>Edit Subscription</CardTitle>
                <CardDescription>
                  Click on the button below, this will give you the opportunity to
                  change your payment details and view your statement at the same
                  time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hello</p>
              </CardContent>
            </Card>
          </div>
        );
    }
}