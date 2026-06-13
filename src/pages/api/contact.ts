import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// On-demand (server) route — must not be prerendered.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return json({ error: 'Name, email, and message are required' }, 400);
    }

    const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Preview fallback when no key is configured.
      console.log(`[Preview Only] Email would be sent here:
        From: ${name} <${email}>
        Message: ${message}
        To: matthew.kalesanwo@fgipgroup.net, theflemingairunugba@gmail.com`);
      return json({ success: true, fake: true }, 200);
    }

    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: 'First Generation Homes <onboarding@resend.dev>',
      to: ['matthew.kalesanwo@fgipgroup.net', 'theflemingairunugba@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new contact form submission.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (data.error) throw new Error(data.error.message);

    return json({ success: true }, 200);
  } catch (error) {
    console.error('Error sending email:', error);
    return json({ error: 'Failed to send message.' }, 500);
  }
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
