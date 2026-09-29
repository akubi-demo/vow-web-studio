import { createFileRoute } from '@tanstack/react-router';
import { BranchPage } from '@/components/branch-page';
import { branches } from '@/components/vow-site';

export const Route = createFileRoute('/lombok')({
  head: () => ({ meta: [
    { title: 'Virtual Office Lombok | VOW' },
    { name: 'description', content: 'Jelajahi layanan dan informasi cabang virtual office VOW di Lombok.' },
    { property: 'og:title', content: 'Virtual Office Lombok | VOW' },
    { property: 'og:description', content: 'Pilihan virtual office VOW di Lombok untuk kebutuhan bisnis Anda.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <BranchPage branch={branches[3]} />,
});
