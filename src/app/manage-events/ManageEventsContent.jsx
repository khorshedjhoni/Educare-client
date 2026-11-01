import ManageEventsClient from "./ManageEventsClient";

const ManageEventsContent = async ({ email }) => {
  let userEvents = [];

  try {
    if (email) {
      const res = await fetch(
        `http://localhost:5000/events/user?email=${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        userEvents = await res.json();
      } else {
        const errorText = await res.text();
        console.error("Failed to fetch events from server:", errorText);
      }
    } else {
      console.log("No email found in query parameters.");
    }
  } catch (error) {
    console.error("Error fetching user events:", error);
  }

  return <ManageEventsClient initialEvents={userEvents} />;
};

export default ManageEventsContent;