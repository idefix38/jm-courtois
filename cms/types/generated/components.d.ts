import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentBoutonCta extends Struct.ComponentSchema {
  collectionName: 'components_component_bouton_ctas';
  info: {
    displayName: 'BoutonCta';
  };
  attributes: {
    Style: Schema.Attribute.Enumeration<['Primaire', 'Secondaire']>;
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
    Accroche: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    Bouton1: Schema.Attribute.Component<'component.bouton-cta', false>;
    Bouton2: Schema.Attribute.Component<'component.bouton-cta', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    Titre: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Mon Titre'>;
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
      'shared.seo': SharedSeo;
    }
  }
}
