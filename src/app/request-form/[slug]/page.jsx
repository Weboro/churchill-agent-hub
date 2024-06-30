import { ReportFormSection } from "@/components";
import React from "react";
import { navItems } from "@/constDatas/navItems";

// export async function generateMetadata({ params }){
//   const { slug } = params; 
//   const info = navItems[3]?.Catagories?.find((item) => item?.slug === slug);

//   return {
//     title: info?.metaTitle,
//     description: info?.metaDescription,
    
//     metadataBase: new URL(info?.metaUrl),
//     keywords: info?.metaKeyword,
//     // openGraph: {
//     //   images: "/og-image.png",
//     // },
//   }; 
// }
const ReportForm = ({ params }) => {
  const { slug } = params;  

  return (
    <main className="min-h-[80vh]">
     <ReportFormSection slug={slug}/>
    </main>
  );
};

export default ReportForm;
