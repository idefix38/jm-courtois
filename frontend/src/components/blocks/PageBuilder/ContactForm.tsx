'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import type { DynamicZoneSource } from '@/types/strapi';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const initialForm = { nom: '', email: '', sujet: '', message: '', prenom: '' };

export default function ContactForm({ blockId, source, siteKey }: { blockId: number; source: DynamicZoneSource; siteKey: string }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>(undefined);

  const renderTurnstile = () => {
    if (!window.turnstile || !widgetRef.current || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    });
  };

  const resetTurnstile = () => {
    window.turnstile?.reset(widgetIdRef.current);
    setTurnstileToken('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus('error');
      setErrorMessage("Merci de valider le captcha avant d'envoyer votre message.");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, blockId, source, turnstileToken }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data?.error ?? 'Une erreur est survenue. Veuillez réessayer.');
        resetTurnstile();
        return;
      }

      setStatus('success');
      setForm(initialForm);
      resetTurnstile();
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={renderTurnstile} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot : champ invisible destiné à tromper les robots, un humain ne le remplit jamais */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input
            type="text"
            name="prenom"
            tabIndex={-1}
            autoComplete="off"
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-anthracite mb-1" htmlFor="nom">NOM *</label>
            <input
              id="nom"
              type="text"
              required
              maxLength={200}
              value={form.nom}
              placeholder="Votre nom"
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="w-full border border-beige rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ocre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-anthracite mb-1" htmlFor="email">EMAIL *</label>
            <input
              id="email"
              type="email"
              required
              maxLength={200}
              value={form.email}
              placeholder='Votre email'
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-beige rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ocre"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-anthracite mb-1" htmlFor="sujet">Sujet *</label>
          <input
            id="sujet"
            type="text"
            required
            maxLength={200}
            value={form.sujet}
            placeholder="Sujet de votre message"
            onChange={(e) => setForm({ ...form, sujet: e.target.value })}
            className="w-full border border-beige rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ocre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-anthracite mb-1" htmlFor="message">Votre message *</label>
          <textarea
            id="message"
            required
            placeholder="Votre message ..."
            rows={6}
            maxLength={5000}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-beige rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ocre resize-none"
          />
        </div>

        <div ref={widgetRef} />

        {status === 'error' && <p className="text-red-600 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-vert-sauge hover:opacity-90 disabled:opacity-50 text-white font-display font-semibold text-xs uppercase tracking-widest py-3 rounded-lg transition"
        >
          {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>
      </form>

      {status === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
            <p className="font-serif text-2xl text-vert-profond mb-2">Message envoyé !</p>
            <p className="text-gris-doux text-sm mb-6">Votre message a bien été envoyé, merci !</p>
            <button
              onClick={() => setStatus('idle')}
              className="bg-vert-sauge text-white font-display text-xs uppercase tracking-widest px-6 py-2 rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
