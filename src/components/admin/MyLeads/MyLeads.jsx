import React from "react";
import LeadsData from "./LeadsData";
import AdminLeads from "./AdminLeads";

const MyLeads = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Main Content (dynamic via routing) */}
      {LeadsData.map((card, ind) => (
        <div key={ind}>
          <AdminLeads data={card} />
        </div>
      ))}
    </div>
  );
};

export default MyLeads;
