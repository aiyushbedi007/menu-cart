import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import styles from "./MenuItems.module.css";
import { MenuItem as MenuItemType } from "../../api/menu";

type MenuListProps = {
  items: MenuItemType[];
  selectedItem: string;
};

export function MenuItems({ items, selectedItem }: MenuListProps) {
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(items);
  const { addItem } = useCart();

  const handleSelected = (item: MenuItemType) => {
    addItem(item);
  };

  useEffect(() => {
    if (!selectedItem || selectedItem === "all") return setFilteredItems(items);

    setFilteredItems(
      items.filter((item) => item.tags.some((tag) => tag === selectedItem))
    );
  }, [selectedItem, items]);

  return (
    <div className={styles.root}>
      {filteredItems.map((item, idx) => (
        <MenuCard
          key={item.name + idx}
          menuItem={item}
          onClick={handleSelected}
        />
      ))}
    </div>
  );
}

const MenuCard = ({
  menuItem,
  onClick,
}: {
  menuItem: MenuItemType;
  onClick: (item: MenuItemType) => void;
}) => {
  return (
    <div className={styles.item} onClick={() => onClick(menuItem)}>
      {menuItem.imgUrl ? (
        <img src={menuItem.imgUrl} className={styles.image} />
      ) : (
        <div className={styles.image} />
      )}
      <div className={styles.right}>
        <span className={styles.title}>{menuItem.name}</span>
        <span className={styles.description}>{menuItem.description}</span>
        <div className={styles.tags}>
          {menuItem.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
