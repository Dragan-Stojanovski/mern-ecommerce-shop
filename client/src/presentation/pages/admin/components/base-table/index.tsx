import React from 'react';
import styles from './BaseTable.module.css';

interface IBaseTableProps {
  data: { [key: string]: any }[] | null;
  onDelete?: (id: string) => void;
}

const BaseTable: React.FC<IBaseTableProps> = ({ data, onDelete }) => {
  if ( data?.length === 0) {
    return <p className={styles.noData}>No data available</p>;
  }else if(data === null){
    return <p className={styles.noData}>Loading</p>;
  }
  

  const headers = Object.keys(data[0]);

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {headers.map((header) => (
            <th key={header} className={styles.th}>{header}</th>
          ))}
          <th className={styles.th}>Actions</th> {/* Add Actions header */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.tr}>
            {headers.map((header) => (
              <td key={`${rowIndex}-${header}`} className={styles.td}>{row[header]}</td>
            ))}
           {onDelete && (
            <td className={styles.td}>
              <button onClick={() => onDelete(row._id)} className={styles.deleteButton}>Delete</button>
            </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BaseTable;