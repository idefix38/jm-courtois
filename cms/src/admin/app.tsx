import {
  Bold,
  Essentials,
  Heading,
  HorizontalLine,
  Italic,
  Link,
  List,
  Paragraph,
  Underline,
} from 'ckeditor5';
import { getPluginPresets } from '@_sh/strapi-plugin-ckeditor';

export default {
  register() {
    // Editeur simplifié : sélection paragraphe/titre, gras, italique, souligné, hr, lien, liste à puces
    const presets = getPluginPresets();

    presets.defaultHtml.editorConfig = {
      licenseKey: 'GPL',
      plugins: [Essentials, Paragraph, Heading, Bold, Italic, Underline, Link, List, HorizontalLine],
      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'bulletedList',
        '|',
        'link',
        '|',
        'horizontalLine',
      ],
    };
  },
};
