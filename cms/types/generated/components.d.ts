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

export interface PageBuilderBlocLivre extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_bloc_livres';
  info: {
    description: 'Affiche un livre sp\u00E9cifique s\u00E9lectionn\u00E9';
    displayName: 'Bloc Livre';
    icon: 'book';
  };
  attributes: {
    Livre: Schema.Attribute.Relation<'oneToOne', 'api::livre.livre'> &
      Schema.Attribute.Required;
  };
}

export interface PageBuilderCitation extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_citations';
  info: {
    description: 'Bloc citation sur fond nuage';
    displayName: 'Citation';
    icon: 'quote';
  };
  attributes: {
    Bouton: Schema.Attribute.Component<'component.bouton-cta', false>;
    Description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Style: Schema.Attribute.Enumeration<
      ['Nuages', 'Cerf-volant', 'Herbes', 'Uni']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Nuages'>;
    Titre: Schema.Attribute.String;
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

export interface PageBuilderListeActualites extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_liste_actualites';
  info: {
    description: "Affiche un titre suivi des N actualit\u00E9s les plus r\u00E9centes et d'un lien vers tous les \u00E9v\u00E8nements";
    displayName: 'Liste Actualit\u00E9s';
    icon: 'calendar';
  };
  attributes: {
    Bouton: Schema.Attribute.Component<'component.bouton-cta', false>;
    NombreActualites: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    Titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageBuilderListeAvis extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_liste_avis';
  info: {
    description: 'Affiche tous les avis publi\u00E9s, tri\u00E9s par date d\u00E9croissante \u2014 aucun param\u00E8tre';
    displayName: 'Liste Avis';
    icon: 'message';
  };
  attributes: {};
}

export interface PageBuilderListeLivre extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_liste_livres';
  info: {
    description: 'Affiche la liste de tous les livres publi\u00E9s \u2014 aucun param\u00E8tre';
    displayName: 'Liste Livre';
    icon: 'book';
  };
  attributes: {};
}

export interface PageBuilderTexte extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_textes';
  info: {
    description: 'Bloc texte long avec illustration lat\u00E9rale';
    displayName: 'Texte';
    icon: 'align-left';
  };
  attributes: {
    Description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Fond: Schema.Attribute.Enumeration<['Uni', 'Livre', 'Barque']>;
    PreTitre: Schema.Attribute.String;
    Titre: Schema.Attribute.String & Schema.Attribute.Required;
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
    Bouton2: Schema.Attribute.Component<'component.bouton-cta', false>;
    Description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Fond: Schema.Attribute.Enumeration<['Uni', 'Montagne', 'Fleurs', 'Nuage']>;
    Image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    PositionImage: Schema.Attribute.Enumeration<['Gauche', 'Droite']> &
      Schema.Attribute.DefaultTo<'Droite'>;
    PreTitre: Schema.Attribute.String;
    SousTitre: Schema.Attribute.String;
    Titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageBuilderTitre extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_titres';
  info: {
    description: 'Bloc titre de page avec sous-titre et accroche optionnels';
    displayName: 'Titre';
    icon: 'heading';
  };
  attributes: {
    Accroche: Schema.Attribute.Text;
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
      'page-builder.bloc-livre': PageBuilderBlocLivre;
      'page-builder.citation': PageBuilderCitation;
      'page-builder.hero': PageBuilderHero;
      'page-builder.liste-actualites': PageBuilderListeActualites;
      'page-builder.liste-avis': PageBuilderListeAvis;
      'page-builder.liste-livre': PageBuilderListeLivre;
      'page-builder.texte': PageBuilderTexte;
      'page-builder.texte-image': PageBuilderTexteImage;
      'page-builder.titre': PageBuilderTitre;
      'shared.menu-item': SharedMenuItem;
      'shared.seo': SharedSeo;
    }
  }
}
