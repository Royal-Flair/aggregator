import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { SubmitButton } from "@/app/components/Submitbuttons";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
      id: true,
      stripeCustomerId: true,
      Adresse: true,
      Land: true,
      Fanclub: true,
      Ort: true,
      Plz: true,
      Telefon: true,
    },
  });

  return data;
}

export default async function SettingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;
    const Adresse = formData.get("Adresse") as string;
    const Land = formData.get("Land") as string;
    const Fanclub = formData.get("Fanclub") as string;
    const Ort = formData.get("Ort") as string;
    const Plz = formData.get("Plz") as string;
    const Telefon = formData.get("Telefon") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        colorScheme: colorScheme ?? undefined,
        Adresse: Adresse ?? undefined,
        Land: Land ?? undefined,
        Fanclub: Fanclub ?? undefined,
        Ort: Ort ?? undefined,
        Plz: Plz ?? undefined,
        Telefon: Telefon ?? undefined,
      },
    });

    revalidatePath("/", "layout");
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile settings</p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  disabled
                  defaultValue={data?.email as string}
                />
              </div>
              <div className="space-y-1">
  <Label>Your Address</Label>
  <Input
    name="Adresse"
    type="text"
    id="Adresse"
    placeholder="Your Address"
    defaultValue={data?.Adresse ?? undefined}
  />
</div>
<div className="space-y-1">
  <Label>Your Fanclub</Label>
  <Input
    name="Fanclub"
    type="text"
    id="Fanclub"
    placeholder="Your Fanclub"
    defaultValue={data?.Fanclub ?? undefined}
  />
</div>
<div className="space-y-1">
  <Label>Your Land</Label>
  <Input
    name="Land"
    type="text"
    id="Land"
    placeholder="Your Land"
    defaultValue={data?.Land ?? undefined}
  />
</div>
<div className="space-y-1">
  <Label>Your City</Label>
  <Input
    name="Ort"
    type="text"
    id="Ort"
    placeholder="Your City"
    defaultValue={data?.Ort ?? undefined}
  />
</div>
<div className="space-y-1">
  <Label>Your Postal Code</Label>
  <Input
    name="Plz"
    type="text"
    id="Plz"
    placeholder="Your Postal Code"
    defaultValue={data?.Plz ?? undefined}
  />
</div>
<div className="space-y-1">
  <Label>Your Phone Number</Label>
  <Input
    name="Telefon"
    type="text"
    id="Telefon"
    placeholder="Your Phone Number"
    defaultValue={data?.Telefon ?? undefined}
  />
</div>


              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
