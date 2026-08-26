import type { RichTextBlock as RichTextBlockType } from '@/types/strapi';

export default function RichTextBlock({ block }: { block: RichTextBlockType }) {
  return (
    <section className="container mx-auto px-6 py-16 max-w-3xl">
      <div
        className="prose prose-lg prose-slate font-serif mx-auto"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </section>
  );
}
