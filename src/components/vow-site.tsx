import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Globe, MapPin, Menu, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setLang, useLang } from '@/lib/lang';
import logoAsset from '@/assets/vow-logo.png.asset.json';
import lombokImage from '@/assets/office-lombok.jpg';
import baliImage from '@/assets/office-bali.jpg';
import jakartaImage from '@/assets/office-jakarta.jpg';
import bandungImage from '@/assets/office-bandung.jpg';

export const branches = [
  { slug: 'bali', name: 'Bali', image: baliImage, region: 'Bali', wa: '08123456789' },
  { slug: 'jakarta', name: 'Jakarta', image: jakartaImage, region: 'DKI Jakarta', wa: '08123456781' },
  { slug: 'bandung', name: 'Bandung', image: bandungImage, region: 'Jawa Barat', regionEn: 'West Java', wa: '08123456782' },
  { slug: 'lombok', name: 'Lombok', image: lombokImage, region: 'Nusa Tenggara Barat', regionEn: 'West Nusa Tenggara', wa: '08123456783' },
] as const;
export type Branch = (typeof branches)[number];

export function regionOf(branch: Branch, lang: string) {
  return lang === 'en' && 'regionEn' in branch ? branch.regionEn : branch.region;
}

export function waLink(branch: Branch, lang: string = 'id') {
  const number = branch.wa.replace(/^0/, '62').replace(/\D/g, '');
  const text = lang === 'en'
    ? `Hello VOW ${branch.name}, I would like to ask about your virtual office services.`
    : `Halo VOW ${branch.name}, saya ingin bertanya tentang layanan virtual office.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function useServices() {
  const { t } = useLang();
  return [
    { title: t('Alamat bisnis', 'Business address'), text: t('Alamat kantor untuk kebutuhan bisnis dan surat-menyurat perusahaan.', 'An office address for your business and company correspondence.') },
    { title: t('Surat domisili', 'Domicile letter'), text: t('Tanyakan ketersediaan dokumen domisili sesuai kebutuhan usaha Anda.', 'Ask about domicile document availability for your business needs.') },
    { title: t('Penerimaan surat & paket', 'Mail & package handling'), text: t('Dukungan penerimaan korespondensi untuk bisnis Anda.', 'Correspondence receiving support for your business.') },
    { title: t('Ruang meeting', 'Meeting rooms'), text: t('Ruang untuk bertemu klien, sesuai ketersediaan cabang.', 'Space to meet clients, subject to branch availability.') },
  ];
}

function Logo() {
  return <span className="brand-lockup"><span className="brand-mark"><img src={logoAsset.url} alt="VOW" width="112" height="76" /></span><span className="brand-name">VOW<span>Virtual Office Work Lombok</span></span></span>;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLang();
  const choose = (l: 'id' | 'en') => { setLang(l); setOpen(false); };
  return <>
    <header className="site-header"><div className="wrap nav-inner">
      <Link to="/" className="brand-link" onClick={() => setOpen(false)} aria-label={t('VOW — Beranda', 'VOW — Home')}><Logo /></Link>
      <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label={t('Navigasi utama', 'Main navigation')}>
        <Link to="/" onClick={() => setOpen(false)}>{t('Beranda', 'Home')}</Link>
        <Link to="/layanan" onClick={() => setOpen(false)}>{t('Layanan', 'Services')}</Link>
        <div className="nav-dropdown"><Link to="/" hash="cabang" onClick={() => setOpen(false)}>{t('Cabang', 'Branches')}</Link><div className="nav-dropdown-menu">{branches.map(b => <Link key={b.slug} to={`/${b.slug}`} onClick={() => setOpen(false)}>{b.name}</Link>)}</div></div>
        <a href="#kontak" onClick={() => setOpen(false)}>{t('Kontak', 'Contact')}</a>
        <div className="nav-dropdown"><button type="button" className="lang-trigger"><Globe size={15} aria-hidden="true" /> Language</button><div className="nav-dropdown-menu">
          <button type="button" className={`lang-option${lang === 'en' ? ' is-active' : ''}`} onClick={() => choose('en')}>English</button>
          <button type="button" className={`lang-option${lang === 'id' ? ' is-active' : ''}`} onClick={() => choose('id')}>Indonesia</button>
        </div></div>
      </nav>
      <div className="nav-actions"><Button asChild className="nav-contact"><a href="#kontak">{t('Hubungi kami', 'Contact us')} <ArrowRight size={16}/></a></Button><Button variant="outline" size="icon" className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? t('Tutup menu', 'Close menu') : t('Buka menu', 'Open menu')} aria-expanded={open}>{open ? <X /> : <Menu />}</Button></div>
    </div></header>
    <main>{children}</main>
    <footer id="kontak" className="site-footer"><div className="wrap footer-grid"><div><Link to="/" className="brand-link"><Logo /></Link><p>{t('Virtual office di Bali, Jakarta, Bandung, dan Lombok.', 'Virtual offices in Bali, Jakarta, Bandung, and Lombok.')}</p></div><div><strong>{t('Halaman', 'Pages')}</strong><Link to="/">{t('Beranda', 'Home')}</Link><Link to="/layanan">{t('Layanan', 'Services')}</Link>{branches.map(b => <Link key={b.slug} to={`/${b.slug}`}>{b.name}</Link>)}</div><div><strong>{t('Kontak', 'Contact')}</strong>{branches.map(b => <a key={b.slug} className="footer-wa" href={waLink(b, lang)} target="_blank" rel="noopener noreferrer">{b.name} · {b.wa}</a>)}</div></div><div className="wrap footer-bottom">© {new Date().getFullYear()} VOW — Virtual Office Work Lombok. {t('Semua hak dilindungi.', 'All rights reserved.')}</div></footer>
    <a className="floating-contact" href="#kontak" aria-label={t('Lihat informasi kontak', 'View contact information')}><MessageCircle size={21}/><span>{t('Kontak', 'Contact')}</span></a>
  </>;
}

export function BranchCard({ branch }: { branch: Branch }) {
  const { lang, t } = useLang();
  return <article className="branch-card"><Link to={`/${branch.slug}`} className="branch-image-link" aria-label={t(`Lihat cabang ${branch.name}`, `View ${branch.name} branch`)}><img src={branch.image} alt={t(`Ilustrasi ruang kerja virtual office di ${branch.name}`, `Illustration of a virtual office workspace in ${branch.name}`)} loading="lazy" width="1280" height="800" /><span className="image-tag">{t('Ilustrasi ruang kerja', 'Workspace illustration')}</span></Link><div className="branch-card-body"><div className="branch-region"><MapPin size={15}/>{regionOf(branch, lang)}</div><h3>{branch.name}</h3><p>{t(`Virtual office di ${branch.name}`, `Virtual office in ${branch.name}`)}</p><Button asChild variant="outline"><Link to={`/${branch.slug}`}>{t('Lihat detail', 'View details')} <ArrowRight size={16}/></Link></Button></div></article>;
}

export function ServiceGrid({ items }: { items?: readonly { title: string; text: string }[] }) {
  const defaults = useServices();
  const list = items ?? defaults;
  return <div className="service-grid">{list.map((item, index) => <div className="service-item" key={index}><span className="service-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>;
}

export function PageHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return <section className="page-heading"><div className="wrap">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><p>{description}</p></div></section>;
}
