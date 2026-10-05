import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, ServiceGrid, SiteLayout } from '@/components/vow-site';
import { useLang } from '@/lib/lang';
import servicesWorkspace from '@/assets/services-workspace.jpg';

export const Route = createFileRoute('/layanan')({
  head: () => ({ meta: [
    { title: 'Layanan Virtual Office | VOW' },
    { name: 'description', content: 'Jelajahi layanan virtual office VOW: alamat bisnis, korespondensi, ruang meeting, dan konsultasi awal.' },
    { property: 'og:title', content: 'Layanan Virtual Office | VOW' },
    { property: 'og:description', content: 'Dukungan praktis untuk alamat dan aktivitas bisnis Anda bersama VOW.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: ServicesPage,
});
function ServicesPage() {
  const { t } = useLang();
  const faqs = [
    [t('Apa bedanya virtual office dengan sewa kantor biasa?', 'How is a virtual office different from renting a regular office?'), t('Virtual office menyediakan alamat bisnis dan layanan pendukung tanpa ruang kerja pribadi tetap. Rincian layanan mengikuti pilihan yang tersedia.', 'A virtual office provides a business address and support services without a fixed private workspace. Service details depend on the available options.')],
    [t('Cabang mana yang bisa dipilih?', 'Which branches can I choose?'), t('Anda dapat menjelajahi Bali, Jakarta, Bandung, dan Lombok.', 'You can explore Bali, Jakarta, Bandung, and Lombok.')],
    [t('Bagaimana cara mulai?', 'How do I get started?'), t('Pilih cabang, lalu hubungi tim VOW melalui informasi kontak resmi yang akan ditambahkan.', 'Choose a branch, then contact the VOW team through the official contact information.')],
    [t('Berapa biayanya?', 'How much does it cost?'), t('Harga resmi belum tersedia di website. Hubungi tim VOW untuk informasi terbaru setelah kontak resmi ditambahkan.', 'Official prices are not yet available on the website. Contact the VOW team for the latest information.')],
  ];
  return <SiteLayout><PageHeading eyebrow={t('VOW / Layanan', 'VOW / Services')} title={t('Layanan kami', 'Our services')} description={t('Pilihan layanan virtual office untuk membantu bisnis Anda berjalan lebih leluasa.', 'Virtual office services to help your business run more freely.')} />
    <section className="section section-alt"><div className="wrap"><ServiceGrid items={[{title:t('Alamat bisnis','Business address'),text:t('Alamat kantor untuk kebutuhan bisnis dan korespondensi perusahaan.','An office address for business needs and company correspondence.')},{title:t('Surat domisili','Domicile letter'),text:t('Tanyakan ketersediaan dokumen domisili sesuai kebutuhan usaha Anda.','Ask about domicile document availability for your business needs.')},{title:t('Penerimaan surat & paket','Mail & package handling'),text:t('Dukungan penerimaan surat dan paket atas nama perusahaan Anda.','Receiving mail and packages on behalf of your company.')},{title:t('Ruang meeting','Meeting rooms'),text:t('Tempat bertemu klien saat dibutuhkan, sesuai ketersediaan cabang.','A place to meet clients when needed, subject to branch availability.')},{title:t('Layanan telepon','Phone services'),text:t('Tanyakan pilihan dukungan komunikasi bisnis yang tersedia.','Ask about available business communication support.')},{title:t('Konsultasi awal','Initial consultation'),text:t('Cari tahu cabang dan pilihan layanan yang sesuai kebutuhan Anda.','Find the branch and services that fit your needs.')}]} /></div></section>
    <section className="section steps-section"><div className="steps-media" aria-hidden="true"><img src={servicesWorkspace} alt="" width="1920" height="1088" /><span className="steps-scrim" /></div><div className="wrap"><div className="section-heading"><p className="eyebrow">{t('Mulai dengan mudah', 'Easy to start')}</p><h2>{t('Cara memulai', 'How to get started')}</h2><p>{t('Tiga langkah sederhana untuk menemukan pilihan virtual office Anda.', 'Three simple steps to find your virtual office.')}</p></div><ol className="steps-grid"><li><span>01</span><h3>{t('Pilih cabang', 'Choose a branch')}</h3><p>{t('Tentukan kota yang Anda butuhkan.', 'Pick the city you need.')}</p></li><li><span>02</span><h3>{t('Hubungi VOW', 'Contact VOW')}</h3><p>{t('Tanyakan pilihan layanan dan ketersediaannya.', 'Ask about service options and availability.')}</p></li><li><span>03</span><h3>{t('Mulai pakai', 'Start using it')}</h3><p>{t('Ikuti arahan tim hingga alamat siap digunakan.', 'Follow the team’s guidance until your address is ready.')}</p></li></ol></div></section>
    <section className="section section-alt"><div className="wrap faq-wrap"><div className="section-heading"><p className="eyebrow">{t('Informasi tambahan', 'More information')}</p><h2>{t('Pertanyaan umum', 'Frequently asked questions')}</h2></div>{faqs.map(([q, a], i) => <details key={i}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  </SiteLayout>;
}
