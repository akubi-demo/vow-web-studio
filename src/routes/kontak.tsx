import { useState, type FormEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { branches, PageHeading, SiteLayout } from '@/components/vow-site';
import { useLang } from '@/lib/lang';

export const Route = createFileRoute('/kontak')({
  head: () => ({ meta: [
    { title: 'Kontak VOW | Konsultasi Virtual Office' },
    { name: 'description', content: 'Hubungi VOW untuk konsultasi virtual office di Bali, Jakarta, Bandung, atau Lombok.' },
    { property: 'og:title', content: 'Kontak VOW | Konsultasi Virtual Office' },
    { property: 'og:description', content: 'Sampaikan kebutuhan bisnis Anda kepada tim VOW melalui formulir kontak.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{7,19}$/),
  branch: z.enum(['bali', 'jakarta', 'bandung', 'lombok']),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(1000),
});

type ContactFields = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactFields, string>>;

function ContactPage() {
  const { lang, t } = useLang();
  const [errors, setErrors] = useState<FieldErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && !next[key as keyof ContactFields]) {
          next[key as keyof ContactFields] = t('Mohon periksa isian ini.', 'Please check this field.');
        }
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const branch = branches.find((item) => item.slug === result.data.branch);
    if (!branch) return;
    const message = lang === 'en'
      ? `Hello VOW ${branch.name},\n\nName: ${result.data.name}\nEmail: ${result.data.email}\nPhone: ${result.data.phone}\nService: ${result.data.service}\n\nMessage:\n${result.data.message}`
      : `Halo VOW ${branch.name},\n\nNama: ${result.data.name}\nEmail: ${result.data.email}\nTelepon: ${result.data.phone}\nLayanan: ${result.data.service}\n\nPesan:\n${result.data.message}`;
    const number = branch.wa.replace(/^0/, '62').replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const errorFor = (field: keyof ContactFields) => errors[field] ? <span className="field-error">{errors[field]}</span> : null;

  return <SiteLayout>
    <PageHeading eyebrow={t('VOW / Kontak', 'VOW / Contact')} title={t('Mari bicara tentang bisnis Anda', 'Let’s talk about your business')} description={t('Isi formulir berikut dan pesan Anda akan diteruskan ke WhatsApp cabang VOW yang dipilih.', 'Complete the form and your message will be sent to the WhatsApp account of your selected VOW branch.')} />
    <section className="section contact-section"><div className="wrap contact-layout">
      <aside className="contact-aside">
        <p className="eyebrow">{t('Hubungi VOW', 'Contact VOW')}</p>
        <h2>{t('Temukan cabang yang sesuai', 'Find the right branch')}</h2>
        <p>{t('Tim VOW siap membantu Anda memilih lokasi dan layanan virtual office sesuai kebutuhan usaha.', 'The VOW team is ready to help you choose a virtual office location and service for your business needs.')}</p>
        <div className="contact-points">
          <div><MessageCircle aria-hidden="true" /><span><strong>WhatsApp</strong>{t('Balasan langsung dari cabang pilihan', 'Direct reply from your selected branch')}</span></div>
          <div><MapPin aria-hidden="true" /><span><strong>{t('Empat pilihan kota', 'Four city options')}</strong>Bali, Jakarta, Bandung, Lombok</span></div>
          <div><CheckCircle2 aria-hidden="true" /><span><strong>{t('Konsultasi kebutuhan', 'Needs consultation')}</strong>{t('Alamat bisnis, surat, paket, dan ruang meeting', 'Business address, mail, packages, and meeting rooms')}</span></div>
        </div>
        <div className="contact-numbers">{branches.map((branch) => <a key={branch.slug} href={`https://wa.me/${branch.wa.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer"><span>{branch.name}</span><strong><Phone size={15} aria-hidden="true" />{branch.wa}</strong></a>)}</div>
      </aside>

      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="form-heading"><Mail aria-hidden="true" /><div><h2>{t('Kirim pesan', 'Send a message')}</h2><p>{t('Lengkapi data agar tim kami dapat membantu dengan tepat.', 'Complete your details so our team can assist you accurately.')}</p></div></div>
        <div className="form-grid">
          <label>{t('Nama lengkap', 'Full name')}<input name="name" type="text" autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} required />{errorFor('name')}</label>
          <label>Email<input name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={Boolean(errors.email)} required />{errorFor('email')}</label>
          <label>{t('Nomor telepon', 'Phone number')}<input name="phone" type="tel" autoComplete="tel" maxLength={20} placeholder="08..." aria-invalid={Boolean(errors.phone)} required />{errorFor('phone')}</label>
          <label>{t('Cabang tujuan', 'Preferred branch')}<select name="branch" defaultValue="" aria-invalid={Boolean(errors.branch)} required><option value="" disabled>{t('Pilih cabang', 'Choose a branch')}</option>{branches.map((branch) => <option key={branch.slug} value={branch.slug}>{branch.name}</option>)}</select>{errorFor('branch')}</label>
          <label className="form-wide">{t('Layanan yang diminati', 'Service of interest')}<select name="service" defaultValue="" aria-invalid={Boolean(errors.service)} required><option value="" disabled>{t('Pilih layanan', 'Choose a service')}</option><option>{t('Alamat bisnis', 'Business address')}</option><option>{t('Surat domisili', 'Domicile letter')}</option><option>{t('Penerimaan surat & paket', 'Mail & package handling')}</option><option>{t('Ruang meeting', 'Meeting rooms')}</option><option>{t('Konsultasi awal', 'Initial consultation')}</option></select>{errorFor('service')}</label>
          <label className="form-wide">{t('Ceritakan kebutuhan Anda', 'Tell us what you need')}<textarea name="message" rows={6} minLength={10} maxLength={1000} aria-invalid={Boolean(errors.message)} required />{errorFor('message')}<small>{t('Maksimal 1.000 karakter.', 'Maximum 1,000 characters.')}</small></label>
        </div>
        <Button type="submit" size="lg" className="contact-submit"><MessageCircle size={18} aria-hidden="true" />{t('Kirim lewat WhatsApp', 'Send via WhatsApp')}<ArrowRight size={17} aria-hidden="true" /></Button>
        <p className="form-note">{t('Dengan mengirim formulir, Anda akan diarahkan ke WhatsApp untuk meninjau pesan sebelum dikirim.', 'Submitting this form opens WhatsApp so you can review the message before sending it.')}</p>
      </form>
    </div></section>
  </SiteLayout>;
}