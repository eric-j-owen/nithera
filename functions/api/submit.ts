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
    // get data
    const input = await request.formData();
    const fullName = input.get("fullname");
    const email = input.get("email");
    const phoneNumber = input.get("phonenumber");
    const message = input.get("message");

    // validation
    if (!fullName) {
      return new Response("Missing name", { status: 400 });
    }

    if (!message) {
      return new Response("Missing name", { status: 400 });
    }
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
    return new Response("Error parsing JSON content", { status: 400 });
  }
}
