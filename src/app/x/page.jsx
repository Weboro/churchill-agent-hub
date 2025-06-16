"use client";
import Certificate from "../../components/certificate/Certificate";
import { PDFViewer } from "@react-pdf/renderer";

const Page = () => {
  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Certificate
          name={"sayuj"}
          email={"a.d@mail.com"}
          location="sydney"
          completionDate={""}
        />
      </PDFViewer>
    </>
  );
};

export default Page;
