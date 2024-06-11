import Head from "next/head";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Products } from "@/app/components/Commerce/Products";

// Define the page component with async function for data fetching
export default async function ShopPage() {
    // Fetch data from external API
    const res = await fetch(`${process.env.HOST}/api/products`);
    const products = await res.json();

    return (
        <>
            <Head>
                <title>Products</title>
                <meta name="description" content="Products" />
            </Head>
            <div className="grid items-start gap-8">
                <div className="flex items-center justify-between px-2">
                    <div className="grid gap-1">
                        <h1 className="text-3xl md:text-4xl">Subscription</h1>
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
                        <Products products={products.data} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
