import { fail } from '@sveltejs/kit';
import { TURNSTILE_SECRET_KEY, DISCORD_WEBHOOK_URL } from '$env/static/private';
import type { Actions } from './$types';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token: string, remoteip: string): Promise<boolean> {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token, remoteip }),
    });
    const data = await res.json() as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const actions: Actions = {
  default: async ({ request, getClientAddress }) => {
    const data = await request.formData();
    const name = ((data.get('name') as string | null)?.trim() ?? '').slice(0, 200);
    const email = ((data.get('email') as string | null)?.trim() ?? '').slice(0, 200);
    const services = (data.getAll('services') as string[]).slice(0, 20);
    const message = ((data.get('message') as string | null)?.trim() ?? '').slice(0, 1024);
    const turnstileToken = (data.get('cf-turnstile-response') as string | null) ?? '';

    if (!name) {
      return fail(400, { error: 'Name is required.', name, email, services, message });
    }
    if (!email || !isValidEmail(email)) {
      return fail(400, { error: 'A valid email address is required.', name, email, services, message });
    }
    if (services.length === 0) {
      return fail(400, { error: 'Please select at least one service.', name, email, services, message });
    }
    if (!turnstileToken) {
      return fail(400, { error: 'Please complete the bot check before submitting.', name, email, services, message });
    }

    const remoteip = getClientAddress();
    const turnstileOk = await verifyTurnstile(turnstileToken, remoteip);
    if (!turnstileOk) {
      return fail(400, { error: 'Bot check failed. Please try again.', name, email, services, message });
    }

    const webhookBody = JSON.stringify({
      embeds: [
        {
          title: 'New contact inquiry',
          color: 14423100,
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Services', value: services.join(', ') || '(none)' },
            { name: 'Message', value: message || '(none)' },
          ],
          footer: { text: 'pandami.net contact form' },
        },
      ],
    });

    let webhookOk = false;
    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: webhookBody,
      });
      webhookOk = res.ok;
    } catch (err) {
      console.error('Discord webhook error:', err);
    }

    if (!webhookOk) {
      // Notify via the same webhook with minimal payload so the submission isn't lost
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⚠️ Contact form delivery failed — reach out manually: **${email}**`,
          }),
        });
      } catch {
        // best-effort only
      }
      return fail(500, {
        error: 'Something went wrong sending your message. Please email us directly.',
        name,
        email,
        services,
        message,
      });
    }

    return { success: true };
  },
};
