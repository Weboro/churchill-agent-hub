import { NewsItemPage } from "@/components";
import React from "react";

const page = ({ params }) => {
  const { slug } = params;
  return (
    <>
      <NewsItemPage slug={slug} />
    </>
  );
};

export default page;
