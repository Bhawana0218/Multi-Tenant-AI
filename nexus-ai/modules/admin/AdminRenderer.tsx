import { StatsCard } from "./components/StatsCard";
import { IntegrationStatus } from "./components/IntegrationStatus";

export function AdminRenderer({ config, data, integrations }: any) {
 if (!config?.layout?.length) {
  return (
    <div className="p-6 text-center text-gray-500">
      No dashboard configured yet.
    </div>
  );
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {config.layout.map((item: any, index: number) => {
        switch (item.type) {
          
          case "text_block":
            return (
              <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {item.content}
                </p>
              </div>
            );

          case "stats_card":
            return (
              <div key={index} className="p-4 bg-white dark:bg-gray-900 shadow rounded-xl">
                <h2 className="text-sm text-gray-500">{item.title}</h2>
                <p className="text-2xl font-bold">
                  {data[item.dataKey] ?? 0}
                </p>
              </div>
            );

          case "integration_status":
            return (
              <div key={index} className="p-4 bg-white dark:bg-gray-900 shadow rounded-xl">
                <h2 className="text-sm text-gray-500">{item.title}</h2>
                <p>Shopify: {integrations.shopify ? "✅" : "❌"}</p>
                <p>CRM: {integrations.crm ? "✅" : "❌"}</p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}