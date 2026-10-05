import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { branches, BranchCard, ServiceGrid, SiteLayout, waLink } from '@/components/vow-site';
import { useLang } from '@/lib/lang';
import lombokImage from '@/assets/office-lombok.jpg';
import servicesWorkspace from '@/assets/services-workspace.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'VOW | Virtual Office di Bali, Jakarta, Bandung & Lombok' },
    { name: 'description', content: 'VOW — Virtual Office Work Lombok. Jelajahi layanan virtual office dan pilihan cabang di Bali, Jakarta, Bandung, dan Lombok.' },
    { property: 'og:title', content: 'VOW | Virtual Office di Bali, Jakarta, Bandung & Lombok' },
    { property: 'og:description', content: 'Jelajahi layanan virtual office VOW dan pilihan cabang di empat kota.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

function Home() {
  const { lang, t } = useLang();
  return <SiteLayout>
    <div className="home-hero"><img className="hero-image" src={lombokImage} alt={t('Ilustrasi interior ruang kerja modern', 'Illustration of a modern workspace interior')} width="1280" height="800" /><div className="hero-shade"/><div className="wrap hero-content"><div className="hero-copy"><p className="hero-eyebrow">VOW · VIRTUAL OFFICE WORK LOMBOK</p><h1>{t('Alamat kantor profesional untuk bisnis Anda', 'A professional office address for your business')}</h1><p>{t('Sewa virtual office di Bali, Jakarta, Bandung, dan Lombok. Pilih cabang yang tepat untuk langkah bisnis berikutnya.', 'Rent a virtual office in Bali, Jakarta, Bandung, and Lombok. Choose the right branch for your next business step.')}</p><div className="hero-actions"><Button asChild size="lg"><Link to="/" hash="cabang">{t('Lihat cabang', 'View branches')} <ArrowRight size={17}/></Link></Button><Button asChild size="lg" variant="heroOutline"><Link to="/layanan">{t('Lihat layanan', 'View services')}</Link></Button></div></div><div className="whatsapp-panel"><h2><MessageCircle size={21} aria-hidden="true" /> {t('Chat WhatsApp per cabang', 'WhatsApp chat by branch')}</h2><div className="whatsapp-list">{branches.map(branch => <div className="whatsapp-row" key={branch.slug}><div><strong>{branch.name}</strong><span>{branch.wa}</span></div><Button size="sm" asChild><a href={waLink(branch, lang)} target="_blank" rel="noopener noreferrer">Chat</a></Button></div>)}</div><p>{t('Klik Chat untuk memulai percakapan WhatsApp dengan cabang terpilih.', 'Click Chat to start a WhatsApp conversation with the selected branch.')}</p></div></div><span className="hero-photo-note">{t('Ilustrasi ruang kerja', 'Workspace illustration')}</span></div>
    <section className="section section-alt"><div className="wrap"><div className="section-heading"><p className="eyebrow">{t('Kenali virtual office', 'Get to know virtual offices')}</p><h2>{t('Apa itu virtual office?', 'What is a virtual office?')}</h2><p>{t('Alamat kantor untuk perusahaan Anda tanpa perlu menyewa ruang kantor sendiri. Solusi untuk bisnis yang ingin tampil profesional dengan cara lebih fleksibel.', 'An office address for your company without renting your own office space. A solution for businesses that want to look professional in a more flexible way.')}</p></div><ServiceGrid items={[{title:t('Hemat biaya','Cost-effective'),text:t('Tidak perlu menyewa dan mengurus gedung kantor sendiri.','No need to rent and manage your own office building.')},{title:t('Alamat profesional','Professional address'),text:t('Pilih alamat bisnis di kota yang sesuai kebutuhan Anda.','Choose a business address in the city that suits your needs.')},{title:t('Fleksibel','Flexible'),text:t('Temukan pilihan cabang untuk mendukung aktivitas usaha.','Find branch options that support your business activities.')}]} /></div></section>
    <section className="section services-section"><div className="services-media" aria-hidden="true"><img src={servicesWorkspace} alt="" loading="eager" width="1920" height="1088" /><span className="services-scrim"/></div><div className="wrap"><div className="section-heading"><p className="eyebrow">{t('Solusi untuk bisnis', 'Business solutions')}</p><h2>{t('Layanan kami', 'Our services')}</h2><p>{t('Dukungan praktis untuk operasional bisnis Anda, dari alamat hingga kebutuhan pertemuan.', 'Practical support for your business operations, from addresses to meeting needs.')}</p></div><ServiceGrid /><div className="section-action"><Button asChild variant="heroOutline"><Link to="/layanan">{t('Lihat semua layanan', 'View all services')} <ArrowRight size={16}/></Link></Button></div></div></section>
    <section id="cabang" className="section section-alt"><div className="wrap"><div className="section-heading"><p className="eyebrow">{t('Temukan lokasi Anda', 'Find your location')}</p><h2>{t('Pilih cabang', 'Choose a branch')}</h2><p>{t('Jelajahi pilihan lokasi VOW di Bali, Jakarta, Bandung, dan Lombok.', 'Explore VOW locations in Bali, Jakarta, Bandung, and Lombok.')}</p></div><div className="branch-grid">{branches.map(branch => <BranchCard key={branch.slug} branch={branch} />)}</div></div></section>
    <section className="section closing-section"><div className="wrap closing-inner"><div><p className="eyebrow">{t('Langkah berikutnya', 'Next step')}</p><h2>{t('Bingung memilih cabang?', 'Not sure which branch to choose?')}</h2><p>{t('Ceritakan kebutuhan bisnis Anda dan temukan lokasi yang paling sesuai.', 'Tell us about your business needs and find the most suitable location.')}</p></div><Button asChild><Link to="/kontak">{t('Hubungi kami', 'Contact us')} <ArrowRight size={16}/></Link></Button></div></section>
  </SiteLayout>;
}
