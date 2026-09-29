import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, ServiceGrid, SiteLayout } from '@/components/vow-site';

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
  return <SiteLayout><PageHeading eyebrow="VOW / Layanan" title="Layanan kami" description="Pilihan layanan virtual office untuk membantu bisnis Anda berjalan lebih leluasa." />
    <section className="section section-alt"><div className="wrap"><ServiceGrid items={[{title:'Alamat bisnis',text:'Alamat kantor untuk kebutuhan bisnis dan korespondensi perusahaan.'},{title:'Surat domisili',text:'Tanyakan ketersediaan dokumen domisili sesuai kebutuhan usaha Anda.'},{title:'Penerimaan surat & paket',text:'Dukungan penerimaan surat dan paket atas nama perusahaan Anda.'},{title:'Ruang meeting',text:'Tempat bertemu klien saat dibutuhkan, sesuai ketersediaan cabang.'},{title:'Layanan telepon',text:'Tanyakan pilihan dukungan komunikasi bisnis yang tersedia.'},{title:'Konsultasi awal',text:'Cari tahu cabang dan pilihan layanan yang sesuai kebutuhan Anda.'}]} /></div></section>
    <section className="section"><div className="wrap"><div className="section-heading"><p className="eyebrow">Mulai dengan mudah</p><h2>Cara memulai</h2><p>Tiga langkah sederhana untuk menemukan pilihan virtual office Anda.</p></div><ol className="steps-grid"><li><span>01</span><h3>Pilih cabang</h3><p>Tentukan kota yang Anda butuhkan.</p></li><li><span>02</span><h3>Hubungi VOW</h3><p>Tanyakan pilihan layanan dan ketersediaannya.</p></li><li><span>03</span><h3>Mulai pakai</h3><p>Ikuti arahan tim hingga alamat siap digunakan.</p></li></ol></div></section>
    <section className="section section-alt"><div className="wrap faq-wrap"><div className="section-heading"><p className="eyebrow">Informasi tambahan</p><h2>Pertanyaan umum</h2></div><details><summary>Apa bedanya virtual office dengan sewa kantor biasa?</summary><p>Virtual office menyediakan alamat bisnis dan layanan pendukung tanpa ruang kerja pribadi tetap. Rincian layanan mengikuti pilihan yang tersedia.</p></details><details><summary>Cabang mana yang bisa dipilih?</summary><p>Anda dapat menjelajahi Bali, Jakarta, Bandung, dan Lombok.</p></details><details><summary>Bagaimana cara mulai?</summary><p>Pilih cabang, lalu hubungi tim VOW melalui informasi kontak resmi yang akan ditambahkan.</p></details><details><summary>Berapa biayanya?</summary><p>Harga resmi belum tersedia di website. Hubungi tim VOW untuk informasi terbaru setelah kontak resmi ditambahkan.</p></details></div></section>
  </SiteLayout>;
}
