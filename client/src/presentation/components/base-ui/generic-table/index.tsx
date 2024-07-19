import { IGenericTableProps } from '../../../../domain/usecases/content/generic-table';
import style from './GenericTable.module.css';



const GenericTable = <T,>({ columns, data, onDelete}: IGenericTableProps<T>): JSX.Element => {

    return (
        <table className={style.generic_table__wrapper}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => {
                            const cellData = typeof column.accessor === 'function'
                                ? (column.accessor(item) as React.ReactNode)
                                : (item[column.accessor] as React.ReactNode);

                            return <td key={colIndex}>{cellData}</td>;
                        })}
                        {onDelete && (
                            <td className={style.td}>
                              
                                <button onClick={() => onDelete(item._id)} className={style.deleteButton}>Remove</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default GenericTable;