"use client"

import { NextPage } from 'next';
import Head from 'next/head';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/app/components/Commerce/ProductCard';
import Stripe from 'stripe';
import Header from '@/app/components/Commerce/Header';

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
  apiVersion: '2024-04-10',
});

const fetchPrices = async () => {
  const res = await stripe.prices.list({
    limit: 10,
    expand: ['data.product'],
  });

  return res.data.filter(price => price.active);
};

const ShopPage: NextPage = async () => {
  const prices = await fetchPrices();

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <Header />
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
              Click on the button below, this will give you the opportunity to change your payment details and view your statement at the same time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-5xl mx-auto py-8">
              <div className="flex items-center justify-between border-b pb-3">
                <h1 className="font-semibold tracking-wide leading-10 text-xl lg:text-3xl">Shop Now</h1>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {prices.map((p) => (
                  <ProductCard key={p.id} price={p} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ShopPage;
