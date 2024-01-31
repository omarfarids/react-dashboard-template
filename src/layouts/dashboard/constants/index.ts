import { Type_Nav_Items } from "@/types/layout";

export const NAV_ITEMS: Type_Nav_Items[] = [
  // icons code comes from the next link : https://icones.js.org/collection/all?s=home      "SVG formula"
  {
    name: "Restaurants",
    path: "/home",
    icon: "pi pi-home",
    role: "admin",
  },
  {
    name: "Categories",
    path: "/Category",
    icon: "pi pi-users",
    role: "user",
  },
  {
    name: "Products",
    path: "/Products",
    icon: "pi pi-users",
    role: "all",
  },

  {
    name: "Settings",
    path: "/Settings",
    icon: "pi pi-file",
    role: "all",
  },
];
