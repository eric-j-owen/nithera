import { Resend } from "resend";

interface EnvType {
  RESEND_API_KEY: string;
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: EnvType;
}): Promise<Response> {
  try {
    if (!env.RESEND_API_KEY) {
      console.error("Missing env variable");
      return new Response("Server error", { status: 500 });
    }

    //csrf protection
    const allowedOrigins = ["http://localhost:8788"];
    const origin = request.headers.get("Origin");
    if (!origin || !allowedOrigins.includes(origin)) {
      console.error("CSRF origin validation failed");
      return new Response("Forbidden", { status: 403 });
    }

    // get form data
    const input = await request.formData();
    const fullName = input.get("fullname");
    const email = input.get("email");
    const phoneNumber = input.get("phonenumber");
    const message = input.get("message");

    // validation
    const errors: string[] = [];

    if (!fullName || typeof fullName !== "string" || fullName.length < 1) {
      errors.push("Invalid name");
    }

    if (!message || typeof message !== "string" || message.length < 1) {
      errors.push("invalid message");
    }

    if (!email || typeof email !== "string" || email.length < 1) {
      errors.push("Invalid email");
    }

    if (errors.length > 0) {
      return Response.json(
        {
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }
    return Response.json("success from submit.ts", { status: 200 });

    // send email
    const resend = new Resend(env.RESEND_API_KEY);
    const emailPayload = await resend.emails.send({
      cc: [],
      bcc: [],
      tags: [],
      to: ["ejowen+github@proton.me"],
      from: "onboarding@resend.dev",
      subject: "New contact form submission",
      html: `<p>Name: ${fullName}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phoneNumber}</p>
             <p>Message: ${message}</p>`,
    });

    return Response.json(emailPayload);
  } catch (err) {
    console.error("Error:", err);
    return new Response("Error parsing JSON content", { status: 400 });
  }
}
