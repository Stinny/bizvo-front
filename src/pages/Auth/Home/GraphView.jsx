import moment from 'moment';
import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const GraphView = ({ dataSet, filter }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col gap-1 items-start border border-gray-200 rounded-sm shadow bg-white p-2">
          <p className="text-xs text-stone-800 flex items-center gap-1">
            <span>
              <p className="text-xs text-stone-800">
                {filter === 'year'
                  ? moment(label).format('MMMM YYYY')
                  : moment(label).format('MMMM D')}
              </p>
            </span>
          </p>

          <div className="flex flex-col items-start text-left">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <span className="w-3 h-3 p-0.5 border rounded-sm bg-stone-800"></span>
              <span>
                <p className="text-xs text-stone-800">Revenue</p>
              </span>
            </p>
            <p className="text-xs font-medium text-stone-800">
              $
              {parseFloat(payload[0].value / 100)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex flex-col items-start text-left mt-1">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <span className="w-3 h-3 p-0.5 rounded-sm bg-stone-300"></span>
              <span>
                <p className="text-xs text-stone-800">Payments</p>
              </span>
            </p>
            <p className="text-sm font-medium text-stone-800">
              {payload[1].value}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dataSet}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" hide={true} />

        {/* Left Y-axis for revenue */}
        <YAxis yAxisId="left" hide={true} />

        {/* Right Y-axis for count */}
        <YAxis yAxisId="right" orientation="right" hide={true} />

        <Bar
          yAxisId="left"
          dataKey="revenue"
          fill="#000"
          radius={4}
          minPointSize={2}
        />
        <Bar
          yAxisId="right"
          dataKey="count"
          fill="#f4f4f4"
          radius={4}
          minPointSize={2}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraphView;
