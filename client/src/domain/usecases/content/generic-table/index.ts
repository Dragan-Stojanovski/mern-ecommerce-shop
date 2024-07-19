export interface IColumn<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);

}

export interface IGenericTableProps<T> {
    columns: IColumn<T>[];
    data: T[];
    onDelete?: (id: string) => void;
}

