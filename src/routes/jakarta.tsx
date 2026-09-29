import { createFileRoute } from '@tanstack/react-router';
import { BranchPage } from '@/components/branch-page';
import { branches } from '@/components/vow-site';

export const Route = createFileRoute('/jakarta')({
  head: () => ({ meta: [
    { title: 'Virtual Office Jakarta | VOW' },
    { name: 'description', content: 'Jelajahi layanan dan informasi cabang virtual office VOW di Jakarta.' },
    { property: 'og:title', content: 'Virtual Office Jakarta | VOW' },
    { property: 'og:description', content: 'Pilihan virtual office VOW di Jakarta untuk kebutuhan bisnis Anda.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <BranchPage branch={branches[1]} />,
});
