"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

const base64ToUint8Array = (base64: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  
    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

export default async function DashboardPage() {

    const sendNotification = async () => {
        try {
            const subscription: PushSubscription = {
                endpoint: 'https://fcm.googleapis.com/fcm/send/cMNkjFyPd6g:AP…VKh7hf67W2t1uHho70hslSjBiizGNnZ_Q2TUSoiPgFHXi8D59',
                expirationTime: null,
                options: {
                    applicationServerKey: base64ToUint8Array('BMZI5lp_xzirDKkNlkMsYxoQtS3MtrFw13GOkOh4UfcFt0Io8Keo8fI22XpZhs56CMbAnHvgINkOQ2WdFNNOalQ'),
                    userVisibleOnly: false
                } // Add appropriate options here
                ,
                getKey: function (name: PushEncryptionKeyName): ArrayBuffer | null {
                    throw new Error("Function not implemented.");
                },
                toJSON: function (): PushSubscriptionJSON {
                    throw new Error("Function not implemented.");
                },
                unsubscribe: function (): Promise<boolean> {
                    throw new Error("Function not implemented.");
                }
            };
          
          await fetch('https://keepuptodatetalon-gizmotronn.vercel.app/api/notification', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              subscription
            })
          });
      
          console.log('Notification sent successfully');
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      };      

    return (<>
        <iframe src="https://keepuptodatetalon-dfctrons6-gizmotronn.vercel.app/" height='100%' width='100%' />
        <button onClick={sendNotification}>Send Notification</button>
        </>
    );

//   return (
//     <div className="grid items-start gap-y-8">
//       <div className="flex items-center justify-between px-2">
//       <iframe src="https://keepuptodatetalon-27d7578yy-gizmotronn.vercel.app/" height='600px' width='100%' />
//         <div className="grid gap-1">
//           <h1 className="text-3xl md:text-4xl">Your Notes</h1>
//           <p className="text-lg text-muted-foreground">
//             Here you can see and create new notes
//           </p>
//         </div>
//         </div>
//     </div>
//   );
}
