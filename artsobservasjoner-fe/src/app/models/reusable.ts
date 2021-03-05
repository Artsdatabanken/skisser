// MODELS, CLASSES, INTERFACES AND ENUMS FOR REUSABLE COMPONENTS / ELEMENTS

export interface TableRow<T> {
  values: T;
  // Add here any additional action or information
  // about a generic table row, like a navigation
  // target if the row is clicked.
}

export interface TableColumn<T> {
  id: keyof T;
  title?: keyof T;
  titleNorwegian?: keyof T;
  titleEnglish?: keyof T;
  alignment?: keyof T;

  // Add here any additional action or information
  // about a generic table column, like whether it is
  // sortable or not.
}

export interface DropdownOption {
  text: string;
  url?: string;
  icon?: string;
  action?: any; // if it's not a link, but a function, for instance
}