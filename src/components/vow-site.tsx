import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, MapPin, Menu, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoAsset from '@/assets/vow-logo.png.asset.json';
import lombokImage from '@/assets/office-lombok.jpg';
import baliImage from '@/assets/office-bali.jpg';
import jakartaImage from '@/assets/office-jakarta.jpg';
import bandungImage from '@/assets/office-bandung.jpg';

export const branches = [
  { slug: 'bali', name: 'Bali', image: baliImage, region: 'Bali' },
  { slug: 'jakarta', name: 'Jakarta', image: jakartaImage, region: 'DKI Jakarta' },
  { slug: 'bandung', name: 'Bandung', image: bandungImage, region: 'Jawa Barat' },
  { slug: 'lombok', name: 'Lombok', image: lombokImage, region: 'Nusa Tenggara Barat' },
] as const;
export type Branch = (typeof branches)[number];

export const services = [
  { title: 'Alamat bisnis', text: 'Alamat kantor untuk kebutuhan bisnis dan surat-menyurat perusahaan.' },
  { title: 'Surat domisili', text: 'Tanyakan ketersediaan dokumen domisili sesuai kebutuhan usaha Anda.' },
  { title: 'Penerimaan surat & paket', text: 'Dukungan penerimaan korespondensi untuk bisnis Anda.' },
  { title: 'Ruang meeting', text: 'Ruang untuk bertemu klien, sesuai ketersediaan cabang.' },
];

function Logo() {
  return <span className="brand-lockup"><span className="brand-mark"><img src={logoAsset.url} alt="VOW" width="112" height="76" /></span><span className="brand-name">VOW<span>Virtual Office Work Lombok</span></span></span>;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header"><div className="wrap nav-inner">
      <Link to="/" className="brand-link" onClick={() => setOpen(false)} aria-label="VOW — Beranda"><Logo /></Link>
      <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navigasi utama">
        <Link to="/" onClick={() => setOpen(false)}>Beranda</Link>
        <Link to="/layanan" onClick={() => setOpen(false)}>Layanan</Link>
        <div className="nav-dropdown"><Link to="/" hash="cabang" onClick={() => setOpen(false)}>Cabang</Link><div className="nav-dropdown-menu">{branches.map(b => <Link key={b.slug} to={`/${b.slug}`} onClick={() => setOpen(false)}>{b.name}</Link>)}</div></div>
        <a href="#kontak" onClick={() => setOpen(false)}>Kontak</a>
      </nav>
      <div className="nav-actions"><Button asChild className="nav-contact"><a href="#kontak">Hubungi kami <ArrowRight size={16}/></a></Button><Button variant="outline" size="icon" className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</Button></div>
    </div></header>
    <main>{children}</main>
    <footer id="kontak" className="site-footer"><div className="wrap footer-grid"><div><Link to="/" className="brand-link"><Logo /></Link><p>Virtual office di Bali, Jakarta, Bandung, dan Lombok.</p></div><div><strong>Halaman</strong><Link to="/">Beranda</Link><Link to="/layanan">Layanan</Link>{branches.map(b => <Link key={b.slug} to={`/${b.slug}`}>{b.name}</Link>)}</div><div><strong>Kontak</strong><p>Informasi kontak dan nomor WhatsApp resmi VOW akan ditampilkan setelah tersedia.</p></div></div><div className="wrap footer-bottom">© {new Date().getFullYear()} VOW — Virtual Office Work Lombok. Semua hak dilindungi.</div></footer>
    <a className="floating-contact" href="#kontak" aria-label="Lihat informasi kontak"><MessageCircle size={21}/><span>Kontak</span></a>
  </>;
}

export function BranchCard({ branch }: { branch: Branch }) {
  return <article className="branch-card"><Link to={`/${branch.slug}`} className="branch-image-link" aria-label={`Lihat cabang ${branch.name}`}><img src={branch.image} alt={`Ilustrasi ruang kerja virtual office di ${branch.name}`} loading="lazy" width="1280" height="800" /><span className="image-tag">Ilustrasi ruang kerja</span></Link><div className="branch-card-body"><div className="branch-region"><MapPin size={15}/>{branch.region}</div><h3>{branch.name}</h3><p>Virtual office di {branch.name}</p><Button asChild variant="outline"><Link to={`/${branch.slug}`}>Lihat detail <ArrowRight size={16}/></Link></Button></div></article>;
}

export function ServiceGrid({ items = services }: { items?: readonly { title: string; text: string }[] }) {
  return <div className="service-grid">{items.map((item, index) => <div className="service-item" key={item.title}><span className="service-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>;
}

export function PageHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return <section className="page-heading"><div className="wrap">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><p>{description}</p></div></section>;
}
