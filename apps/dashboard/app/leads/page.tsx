const leads = [
  { id: "1", site: "marketing-site", email: "encrypted", createdAt: "2026-01-05" }
];

export default function LeadsPage() {
  return (
    <main>
      <h1>Leads Dashboard</h1>
      <table>
        <thead><tr><th>ID</th><th>Site</th><th>Email</th><th>Date</th></tr></thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}><td>{lead.id}</td><td>{lead.site}</td><td>{lead.email}</td><td>{lead.createdAt}</td></tr>
          ))}
        </tbody>
      </table>
      <button type="button">Export CSV</button>
    </main>
  );
}
