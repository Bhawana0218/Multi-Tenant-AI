export function IntegrationStatus({ integrations }: any) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h3 className="font-semibold mb-2">Integrations</h3>
      <ul>
        <li>Shopify: {integrations.shopify ? "✅" : "❌"}</li>
        <li>CRM: {integrations.crm ? "✅" : "❌"}</li>
      </ul>
    </div>
  );
}