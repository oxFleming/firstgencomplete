import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const projectTypes = [
  'Custom home construction',
  'Renovation or remodeling',
  'Real estate development',
  'Investment or partnership',
  'Planning and consultation',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: projectTypes[0], message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState('');

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof typeof errors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email format';
    if (!form.message.trim()) next.message = 'Project details are required';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('Sending your consultation request...');
    try {
      const enriched = [
        `Project type: ${form.projectType}`,
        form.phone ? `Phone: ${form.phone}` : '',
        '',
        form.message,
      ].filter(Boolean).join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: enriched }),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('Request received. We will review the details and follow up with a practical next step.');
        setForm({ name: '', email: '', phone: '', projectType: projectTypes[0], message: '' });
        setTimeout(() => setStatus(''), 6000);
      } else {
        setStatus(result.error || 'Failed to send message.');
      }
    } catch {
      setStatus('Failed to send message. Please try again.');
    }
  };

  const base = 'w-full px-5 py-4 rounded-xl border bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brass/40 transition';
  const ok = 'border-line-light';
  const bad = 'border-red-300 bg-red-50';

  return (
    <form onSubmit={submit} className="space-y-5 bg-bone border border-line-light rounded-2xl p-5 md:p-6">
      <div>
        <h3 className="font-heading text-2xl text-ink mb-2">Request a consultation</h3>
        <p className="text-sm text-ink/60">A short, useful brief helps us prepare a better first response.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={`${base} ${errors.name ? bad : ok}`} />
        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email address" className={`${base} ${errors.email ? bad : ok}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone or WhatsApp" className={`${base} ${ok}`} />
        <select value={form.projectType} onChange={(e) => update('projectType', e.target.value)} className={`${base} ${ok}`}>
          {projectTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <textarea rows={6} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Briefly describe the project, location, budget range, timeline, or investment interest." className={`${base} resize-none ${errors.message ? bad : ok}`} />

      <button type="submit" className="w-full bg-ink text-bone py-4 rounded-xl font-medium hover:bg-brass hover:text-ink transition-colors flex items-center justify-center gap-3 group text-base">
        Book My Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-xs text-ink/50 text-center leading-relaxed">Prefer to talk now? Use the phone, email, or WhatsApp options beside this form.</p>

      {status && (
        <p className={`text-center font-medium mt-4 text-sm ${status.includes('received') ? 'text-green-700' : 'text-brass'}`}>{status}</p>
      )}
    </form>
  );
}
