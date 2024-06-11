import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function GET(request: NextRequest) {
  try {
    const products = await stripe.products.list({
      limit: 100,
    });

    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
