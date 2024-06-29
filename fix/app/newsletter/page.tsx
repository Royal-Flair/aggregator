"use client"

import React from 'react';
import { Tables } from '@/types_db';
import { usePathname, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

export default function NewsletterPage() {
  const router = useRouter();
  const currentPath = usePathname();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setHasSubscription(false);
        return;
      }

      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'active'); 

      if (error || !subscriptions.length) {
        setHasSubscription(false);
        return;
      }

      setHasSubscription(true);
    };

    fetchSubscriptionStatus();
  }, []);

  if (hasSubscription === null) {
    return <p>Loading...</p>;
  }

  if (!hasSubscription) {
    return (
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
            <p>Sie müssen ein aktuelles Mitglied sein, um den Newsletter anzuzeigen</p>
        </div>
    );
  }

  return (
    <iframe src="https://nordkurve12.vercel.app" height="1500px" width="100%" />
  );
}
