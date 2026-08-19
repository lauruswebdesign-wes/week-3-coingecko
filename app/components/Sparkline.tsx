'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

type SparklinePoint = {
  value: number;
};

type SparklineProps = {
  data: SparklinePoint[];
  isPositive: boolean;
};

export default function Sparkline({ data, isPositive }: SparklineProps) {
  if (data.length === 0) {
    return <span className="text-sm text-gray-400">No data</span>;
  }

  return (
    <div className="h-10 w-32" aria-label="Seven-day price trend">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 4 }}
            formatter={(value) => [
              typeof value === 'number' ? `$${value.toLocaleString()}` : value,
              'Price',
            ]}
            labelFormatter={() => '7-day trend'}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#16a34a' : '#dc2626'}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}