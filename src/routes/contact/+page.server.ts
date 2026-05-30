import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = (data.get('name') as string | null)?.trim() ?? '';
    const email = (data.get('email') as string | null)?.trim() ?? '';
    const services = data.getAll('services') as string[];
    const message = (data.get('message') as string | null)?.trim() ?? '';

    // Validation
    if (!name) {
      return fail(400, { error: 'Name is required.', name, email, services, message });
    }
    if (!email || !isValidEmail(email)) {
      return fail(400, { error: 'A valid email address is required.', name, email, services, message });
    }
    if (services.length === 0) {
      return fail(400, { error: 'Please select at least one service.', name, email, services, message });
    }

    // Send email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'noreply@pandami.net',
          to: 'hello@pandami.net',
          subject: `New inquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Services: ${services.join(', ')}`,
            `Message: ${message || '(none)'}`,
          ].join('\n'),
        });
      } catch (err) {
        console.error('Failed to send email via Resend:', err);
      }
    } else {
      console.log('Contact form submission (no RESEND_API_KEY):', { name, email, services, message });
    }

    return { success: true };
  },
};
