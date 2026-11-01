import { Suspense } from "react";
import EventContent from "./EventContent";

const EventDetailsPage = ({ params }) => {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading event...</p>}>
      <EventContent params={params} />
    </Suspense>
  );
}
export default EventDetailsPage;