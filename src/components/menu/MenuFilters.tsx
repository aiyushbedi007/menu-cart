import { useEffect, useState } from "react";
import { cls } from "../../utils";
import styles from "./MenuFilters.module.css";
import { MenuFilter as MenuFilterType } from "../../api/menu";

type MenuFilterProps = {
  menuFilters: MenuFilterType[];
  onSelected: (key: string) => void;
};

export function MenuFilters({ menuFilters, onSelected }: MenuFilterProps) {
  const [selectedItem, setSelectedItem] = useState("all");

  const selectItem = (key: string) => {
    setSelectedItem(key);
    onSelected(key);
  };

  return (
    <div className={styles.root}>
      <FilterItem
        isSelected={selectedItem === "all"}
        onClick={() => selectItem("all")}
      >
        All
      </FilterItem>
      {menuFilters.map((item) => (
        <FilterItem
          isSelected={selectedItem === item.id}
          key={item.id}
          onClick={() => selectItem(item.id)}
        >
          {item.label}
        </FilterItem>
      ))}
    </div>
  );
}

type FilterItemProps = {
  children: string;
  onClick: React.HTMLAttributes<HTMLDivElement>["onClick"];
  isSelected?: boolean;
};
const FilterItem = ({ children, onClick, isSelected }: FilterItemProps) => {
  return (
    <div
      className={cls(styles.item, isSelected && styles.selected)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
