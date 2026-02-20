import './ComparisonTable.css';

/**
 * ComparisonTable - Feature comparison matrix
 * Responsive: table on desktop, cards on mobile
 * Used for: Ghost vs GPU vs FPGA comparisons
 */
export default function ComparisonTable({ columns, rows, highlightColumn = 0, className = '' }) {
  const classes = ['comparison-table', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="comparison-table__desktop">
        <table>
          <thead>
            <tr>
              <th></th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={index === highlightColumn ? 'comparison-table__highlight' : ''}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="comparison-table__feature">{row.feature}</td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={colIndex === highlightColumn ? 'comparison-table__highlight' : ''}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comparison-table__mobile">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="comparison-table__card">
            <h3 className="comparison-table__card-title">{col}</h3>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="comparison-table__card-row">
                <span className="comparison-table__card-feature">{row.feature}</span>
                <span className="comparison-table__card-value">{row.values[colIndex]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
