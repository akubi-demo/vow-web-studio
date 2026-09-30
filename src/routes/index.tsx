import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { branches, BranchCard, ServiceGrid, SiteLayout, waLink } from '@/components/vow-site';
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
  return <SiteLayout>
    <div className="home-hero"><img className="hero-image" src={lombokImage} alt="Ilustrasi interior ruang kerja modern" width="1280" height="800" /><div className="hero-shade"/><div className="wrap hero-content"><div className="hero-copy"><p className="hero-eyebrow">VOW · VIRTUAL OFFICE WORK LOMBOK</p><h1>Alamat kantor profesional untuk bisnis Anda</h1><p>Sewa virtual office di Bali, Jakarta, Bandung, dan Lombok. Pilih cabang yang tepat untuk langkah bisnis berikutnya.</p><div className="hero-actions"><Button asChild size="lg"><Link to="/" hash="cabang">Lihat cabang <ArrowRight size={17}/></Link></Button><Button asChild size="lg" variant="heroOutline"><Link to="/layanan">Lihat layanan</Link></Button></div></div><div className="whatsapp-panel"><h2><MessageCircle size={21} aria-hidden="true" /> Chat WhatsApp per cabang</h2><div className="whatsapp-list">{branches.map(branch => <div className="whatsapp-row" key={branch.slug}><div><strong>{branch.name}</strong><span>{branch.wa}</span></div><Button size="sm" asChild><a href={waLink(branch)} target="_blank" rel="noopener noreferrer">Chat</a></Button></div>)}</div><p>Klik Chat untuk memulai percakapan WhatsApp dengan cabang terpilih.</p></div></div><span className="hero-photo-note">Ilustrasi ruang kerja</span></div>
    <section className="section section-alt"><div className="wrap"><div className="section-heading"><p className="eyebrow">Kenali virtual office</p><h2>Apa itu virtual office?</h2><p>Alamat kantor untuk perusahaan Anda tanpa perlu menyewa ruang kantor sendiri. Solusi untuk bisnis yang ingin tampil profesional dengan cara lebih fleksibel.</p></div><ServiceGrid items={[{title:'Hemat biaya',text:'Tidak perlu menyewa dan mengurus gedung kantor sendiri.'},{title:'Alamat profesional',text:'Pilih alamat bisnis di kota yang sesuai kebutuhan Anda.'},{title:'Fleksibel',text:'Temukan pilihan cabang untuk mendukung aktivitas usaha.'}]} /></div></section>
    <section className="section services-section"><div className="services-media" aria-hidden="true"><img src={servicesWorkspace} alt="" loading="eager" width="1920" height="1088" /><span className="services-scrim"/></div><div className="wrap"><div className="section-heading"><p className="eyebrow">Solusi untuk bisnis</p><h2>Layanan kami</h2><p>Dukungan praktis untuk operasional bisnis Anda, dari alamat hingga kebutuhan pertemuan.</p></div><ServiceGrid /><div className="section-action"><Button asChild variant="heroOutline"><Link to="/layanan">Lihat semua layanan <ArrowRight size={16}/></Link></Button></div></div></section>
    <section id="cabang" className="section section-alt"><div className="wrap"><div className="section-heading"><p className="eyebrow">Temukan lokasi Anda</p><h2>Pilih cabang</h2><p>Jelajahi pilihan lokasi VOW di Bali, Jakarta, Bandung, dan Lombok.</p></div><div className="branch-grid">{branches.map(branch => <BranchCard key={branch.slug} branch={branch} />)}</div></div></section>
    <section className="section closing-section"><div className="wrap closing-inner"><div><p className="eyebrow">Langkah berikutnya</p><h2>Bingung memilih cabang?</h2><p>Ceritakan kebutuhan bisnis Anda dan temukan lokasi yang paling sesuai.</p></div><Button asChild><a href="#kontak">Lihat informasi kontak <ArrowRight size={16}/></a></Button></div></section>
  </SiteLayout>;
}
