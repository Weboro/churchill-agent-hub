import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

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
      subject: "Your OTP Code",
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It is valid for 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP sent to email." },
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
