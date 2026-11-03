import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import JoinedEventsClient from "./JoinedEventsClient";

export default async function JoinedEventsPage() {
  let joinedEvents = [];

  try {
    // Get the current request headers
    const requestHeaders = await headers();

    // Get JWT from Better Auth on the server
    const tokenData = await auth.api.getToken({
      headers: requestHeaders,
    });

    const token = tokenData?.token;

    if (token) {
      const response = await fetch("http://localhost:5000/joined-events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

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
}