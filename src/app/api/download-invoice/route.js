// src/app/api/download-invoice/route.js
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import CommissionInvoice from "@/components/pdfs/CommissionInvoice";

export async function POST(req) {
  try {
    const { formData, result } = await req.json();

    const pdfBuffer = await renderToBuffer(
      <CommissionInvoice formData={formData} result={result} />
    );

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="commission-invoice-${formData.studentName
          .toLowerCase()
          .replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
