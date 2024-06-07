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

// Function to get user data
async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      Adresse: true,
      colorScheme: true,
      Fanclub: true,
      memberId: true,
      Land: true,
      Ort: true,
      Plz: true,
    },
  });

  return data;
}

// Settings page component
export default async function SettingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  // Function to handle form submission
  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;
    const Adresse = formData.get("Adresse") as string;
    const Fanclub = formData.get("Fanclub") as string;
    const Land = formData.get("Land") as string;
    const Ort = formData.get("Ort") as string;
    const Plz = formData.get("Plz") as string;
    const memberId = formData.get("memberId") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        Adresse: Adresse ?? undefined,
        colorScheme: colorScheme ?? undefined,
        Fanclub: Fanclub ?? undefined,
        Land: Land ?? undefined,
        Ort: Ort ?? undefined,
        memberId: memberId ? parseInt(memberId) : undefined,
        Plz: Plz ?? undefined,
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
                <Label>Your membership id</Label>
                <Input
                  name="memberId"
                  type="text"
                  id="memberId"
                  placeholder="Your membership ID"
                  defaultValue={data?.memberId?.toString() ?? ""}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your email"
                  disabled
                  defaultValue={data?.email as string}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Adresse</Label>
                <Input
                  name="Adresse"
                  type="text"
                  id="Adresse"
                  placeholder="Your Adresse"
                  defaultValue={data?.Adresse as string}
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
                <Label>Your Ort</Label>
                <Input
                  name="Ort"
                  type="text"
                  id="Ort"
                  placeholder="Your Ort"
                  defaultValue={data?.Ort ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Plz</Label>
                <Input
                  name="Plz"
                  type="text"
                  id="Plz"
                  placeholder="Your Plz"
                  defaultValue={data?.Plz ?? undefined}
                />
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
