import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderToBuffer } from "@react-pdf/renderer";
import Certificate from "@/components/certificate/Certificate";

export async function POST(req) {
  try {
    const { email, agentName } = await req.json();

    const completionDate = new Date().toLocaleString().split(",")[0];

    if (!email) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }

    const pdfBuffer = await renderToBuffer(
      <Certificate
        agentName={agentName}
        email={email}
        completionDate={completionDate}
      />
    );

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your Certificate from Churchill Institute",
      html: `<p>${agentName},</p><p>Congratulations! Please find your certificate attached.</p>`,
      attachments: [
        {
          filename: "certificate.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email with attachment sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
