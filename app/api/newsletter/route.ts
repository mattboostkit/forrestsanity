import { Resend } from "resend";

export const POST = async (request: Request) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email } = await request.json();

  // Create contact
  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: "Error subscribing to updates" },
      { status: 400 }
    );
  }
};
