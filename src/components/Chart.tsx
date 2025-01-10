import React from 'react';

const Chart = ({ data }) => {
  const maxValue = Math.max(...data);

  return (
    <div className="chart-container">
      {data.map((value, index) => (
        <div key={index} className="chart-row">
          <div className="chart-label">{index + 1}</div>
          <div
            className="chart-bar"
            style={{
              width: value === 0 ? '18px' : `${(value / maxValue) * 100}%`,
              backgroundColor: value === 0 ? '#3a3a3c' : '#4b9147',
            }}
          >
            <span className="chart-value">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chart;
