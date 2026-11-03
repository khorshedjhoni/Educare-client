import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import JoinedEventsClient from "./JoinedEventsClient";

const JoinedEventsContent = async () => {
    await connection();
  let joinedEvents = [];

  try {
    
    

    const requestHeaders = await headers();

    const tokenData = await auth.api.getToken({
      headers: requestHeaders,
    });

    const token = tokenData?.token;

    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (response.ok) {
        joinedEvents = await response.json();
      } else {
        console.error("Failed to fetch joined events:", response.status);
      }
    }
  } catch (error) {
    console.error("Failed to fetch joined events:", error);
  }

  return <JoinedEventsClient initialEvents={joinedEvents} />;
};

const JoinedEventsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
          Loading joined events...
        </div>
      }
    >
      <JoinedEventsContent />
    </Suspense>
  );
};

export default JoinedEventsPage;