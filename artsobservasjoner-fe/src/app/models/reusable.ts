// models and viewmodels for reusable components

export interface TableRow<T> {
    values: T;
    // Add here any additional action or information
    // about a generic table row, like a navigation
    // target if the row is clicked.
  }

  export interface TableColumn<T> {
    name: keyof T;
    title?: keyof T;
    alignment?: keyof T;
    // Add here any additional action or information
    // about a generic table column, like whether it is
    // sortable or not.
  }

