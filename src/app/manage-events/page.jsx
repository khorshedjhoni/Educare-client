import React, { Suspense } from "react";
import ManageEventsClient from "./ManageEventsClient";

const ManageEventsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
          Loading your managed events...
        </div>
      }
    >
      <ManageEventsClient />
    </Suspense>
  );
};

export default ManageEventsPage;