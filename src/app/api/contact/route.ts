import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, subject, message } = await req.json();

    if (!firstname || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER || "hetu.dev264@gmail.com";
    const smtpPass = process.env.SMTP_PASSWORD?.replace(/\s+/g, "") || "";
    const destination = process.env.CONTACT_EMAIL || smtpUser || "hetu.dev264@gmail.com";

    // Setup Gmail Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const fullName = `${firstname} ${lastname || ""}`.trim();
    const mailSubject = subject || `Portfolio Message from ${fullName}`;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: destination,
      replyTo: email,
      subject: `[Portfolio] ${mailSubject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0284c7; margin-top: 0; font-size: 20px;">🚀 New Portfolio Message</h2>
          <div style="margin: 16px 0; padding: 16px; background: #f8fafc; border-radius: 8px; font-size: 14px; line-height: 1.6;">
            <p style="margin: 0 0 6px;"><strong>Name:</strong> ${fullName}</p>
            <p style="margin: 0 0 6px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0284c7;">${email}</a></p>
            <p style="margin: 0 0 6px;"><strong>Subject:</strong> ${mailSubject}</p>
            <p style="margin: 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="margin-top: 16px;">
            <strong style="font-size: 13px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Message Content:</strong>
            <div style="margin-top: 8px; white-space: pre-wrap; line-height: 1.6; color: #1e293b; background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #0284c7;">
              ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; text-align: center;">
            Sent directly from Hetu Patel's portfolio contact form • Click reply to respond to ${fullName}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (err: any) {
    console.error("SMTP Mail Error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please check your 16-character Gmail App Password." },
      { status: 500 }
    );
  }
}
