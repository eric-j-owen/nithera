import { Resend } from "resend";
import type { EnvType, FormResponseType } from "../../src/types/types";

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: EnvType;
}): Promise<Response> {
  const createResponse = (
    message: string,
    status: number,
    errors?: string[]
  ): Response => {
    const res: FormResponseType = { message, errors };
    return Response.json(res, { status });
  };

  try {
    const errors: string[] = [];

    // check env variables
    if (!env.RESEND_API_KEY || !env.ALLOWED_ORIGINS) {
      errors.push("Missing env variable");
      return createResponse("Server error", 500, errors);
    }

    //csrf protection
    const allowedOrigins = env.ALLOWED_ORIGINS.split(",");
    const origin = request.headers.get("Origin");
    if (!origin || !allowedOrigins.includes(origin)) {
      errors.push("CSRF origin validation failed");
      return createResponse("Forbidden", 403, errors);
    }

    // get form data
    const input = await request.formData();
    const fullName = input.get("fullname");
    const email = input.get("email");
    const phoneNumber = input.get("phonenumber");
    const message = input.get("message");

    // validation
    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length < 1
    ) {
      errors.push("Invalid name");
    }

    if (!message || typeof message !== "string" || message.trim().length < 1) {
      errors.push("invalid message");
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      email.trim().length < 1
    ) {
      errors.push("Invalid email");
    }

    if (errors.length > 0) {
      return createResponse("Validation failed", 400, errors);
    }

    // send email
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
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

    return createResponse("Form submitted successfully!", 200);
  } catch (err) {
    console.error("Error:", err);
    return createResponse("Error parsing JSON content", 400);
  }
}
