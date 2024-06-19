import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export function Nullvier() {
  return (
    <div className="flex flex-col min-h-[10dvh]">
      <main className="flex-1">
        <section id="about" className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
                <p className="text-muted-foreground">
                  We are the passionate ultras fan group of Bayer Leverkusen, dedicated to supporting our team through
                  thick and thin. Our group has been around for decades, creating an electric atmosphere at every home
                  game and traveling to away matches to show our unwavering support.
                </p>
                <p className="text-muted-foreground mt-4">
                  We are known for our creative choreographies, thunderous chants, and unwavering loyalty to the club.
                  Join us and be a part of the Bayer Leverkusen family!
                </p>
              </div>
              <img
                src="/placeholder.svg"
                width={600}
                height={400}
                alt="Bayer Leverkusen Ultras"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        <section id="terms" className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Membership</h3>
                <p className="text-muted-foreground">
                  To become a member of the Bayer Leverkusen Ultras, you must be a passionate supporter of the club and
                  agree to our code of conduct. Membership is free, but we ask that you contribute to the group's
                  activities and events.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Behavior</h3>
                <p className="text-muted-foreground">
                  As a member of the Bayer Leverkusen Ultras, you are expected to behave in a respectful and responsible
                  manner at all times. This includes refraining from violence, discrimination, and any other behavior
                  that could bring the group or the club into disrepute.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="updates" className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Recent Updates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>New Merchandise Drop</CardTitle>
                  <CardDescription>Check out our latest fan gear!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We've just released a new line of Bayer Leverkusen merchandise, including t-shirts, hoodies, and
                    scarves. Head over to our online store to check it out.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-red-500 hover:underline" prefetch={false}>
                    Shop Now
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Away Match</CardTitle>
                  <CardDescription>Join us for the away game against Bayern Munich!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We're organizing a bus trip to the away game against Bayern Munich on May 6th. Sign up now to secure
                    your spot and join us in supporting the team!
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-red-500 hover:underline" prefetch={false}>
                    Sign Up
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supporter's Meeting</CardTitle>
                  <CardDescription>Join us for our monthly meeting.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our next monthly supporter's meeting will be held on April 15th at 7 PM. Come and discuss the latest
                    news, events, and plans for the group.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-red-500 hover:underline" prefetch={false}>
                    RSVP
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm">&copy; 2024 Bayer Leverkusen Ultras</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm hover:text-red-500" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:text-red-500" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
