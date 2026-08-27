import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentBoutonCta extends Struct.ComponentSchema {
  collectionName: 'components_component_bouton_ctas';
  info: {
    displayName: 'BoutonCta';
  };
  attributes: {
    Style: Schema.Attribute.Enumeration<['Primaire', 'Secondaire', 'Link']>;
    Titre: Schema.Attribute.String & Schema.Attribute.Required;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageBuilderHero extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_heroes';
  info: {
    displayName: 'Hero';
    icon: 'grid';
  };
  attributes: {
    Bouton1: Schema.Attribute.Component<'component.bouton-cta', false>;
    Bouton2: Schema.Attribute.Component<'component.bouton-cta', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    SousTitre: Schema.Attribute.String;
    Titre: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Mon Titre'>;
    Titre_Ligne_2: Schema.Attribute.String;
  };
}

export interface PageBuilderTexteImage extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_texte_images';
  info: {
    description: 'Bloc texte avec image optionnelle et CTA';
    displayName: 'TexteImage';
    icon: 'layout';
  };
  attributes: {
    Bouton1: Schema.Attribute.Component<'component.bouton-cta', false>;
    Bouton2: Schema.Attribute.Component<'component.bouton-cta', true>;
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    Fond: Schema.Attribute.Enumeration<['Uni', 'Montagne', 'Fleurs', 'Nuage']>;
    Image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    PositionImage: Schema.Attribute.Enumeration<['Gauche', 'Droite']> &
      Schema.Attribute.DefaultTo<'Droite'>;
    PreTitre: Schema.Attribute.String;
    SousTitre: Schema.Attribute.String;
    Titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_items';
  info: {
    description: '\u00C9l\u00E9ment de navigation';
    displayName: 'MenuItem';
    icon: 'link';
  };
  attributes: {
    Titre: Schema.Attribute.String & Schema.Attribute.Required;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaRobots: Schema.Attribute.Enumeration<['Index', 'NoIndex']> &
      Schema.Attribute.DefaultTo<'Index'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'component.bouton-cta': ComponentBoutonCta;
      'page-builder.hero': PageBuilderHero;
      'page-builder.texte-image': PageBuilderTexteImage;
      'shared.menu-item': SharedMenuItem;
      'shared.seo': SharedSeo;
    }
  }
}
