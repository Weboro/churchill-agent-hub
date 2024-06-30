import React from "react";
import { PoliciesDetails } from "@/components";
import { navItems } from "@/constDatas/navItems";

const Policies = ({ params }) => {
  const { slug } = params;
  return (
    <main className="min-h-[80vh]">
      <PoliciesDetails slug={slug} />
    </main>
  );
};

export default Policies;
