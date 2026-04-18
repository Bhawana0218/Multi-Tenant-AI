import React from 'react';

interface WidgetProps { type: string; title: string; config: Record<string, any>; }

export const StatWidget: React.FC<WidgetProps> = ({ title, config }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{config.value || Math.floor(Math.random() * 100)}</p>
  </div>
);

export const ChartWidget: React.FC<WidgetProps> = ({ title, config }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-48">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <div className="mt-4 flex items-end justify-between h-32 gap-1">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="w-full bg-blue-500 dark:bg-blue-400 rounded-t-sm transition-all duration-500" 
             style={{ height: `${Math.random() * 100}%` }} />
      ))}
    </div>
  </div>
);

export const WidgetRenderer: React.FC<{ widget: { type: string; title: string; config: Record<string, any>; cols: number }> = (
  { type, title, config, cols }
) => {
  const Widget = type === 'stat' ? StatWidget : ChartWidget;
  return <Widget title={title} config={config} />;
};