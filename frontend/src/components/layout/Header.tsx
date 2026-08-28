import { getMenus } from '@/lib/strapi';
import HeaderClient from './HeaderClient';
import type { MenuItemData } from '@/types/strapi';

export default async function Header() {
  let items: MenuItemData[] = [];

  try {
    const res = await getMenus();
    items = res.data?.Items ?? [];
  } catch {
    // Affiche le header sans menus si le CMS est inaccessible
  }

  return <HeaderClient items={items} />;
}

