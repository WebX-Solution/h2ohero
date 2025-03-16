import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TipTapEditor({ content, onChange, placeholder = 'Beginnen Sie zu schreiben...' }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      CodeBlock,
      Blockquote,
      ListItem,
      BulletList,
      OrderedList,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-[400px] rounded-lg border border-[#002b56]/20 bg-[#002b56]/5 overflow-hidden">
      <div className="border-b border-[#002b56]/20 bg-white/50 p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('bold') ? 'bg-[#002b56]/10' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('italic') ? 'bg-[#002b56]/10' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('underline') ? 'bg-[#002b56]/10' : ''}`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('heading', { level: 2 }) ? 'bg-[#002b56]/10' : ''}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('heading', { level: 3 }) ? 'bg-[#002b56]/10' : ''}`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('bulletList') ? 'bg-[#002b56]/10' : ''}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('orderedList') ? 'bg-[#002b56]/10' : ''}`}
        >
          Ordered List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-[#002b56]/10 ${editor.isActive('blockquote') ? 'bg-[#002b56]/10' : ''}`}
        >
          Quote
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className="prose prose-lg max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
}