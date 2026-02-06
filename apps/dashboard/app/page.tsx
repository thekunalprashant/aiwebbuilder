import Link from "next/link";

export default function DashboardHome() {
  return (
    <main>
      <h1>AI Website Builder Dashboard</h1>
      <ul>
        <li><Link href="/editor">Open Editor</Link></li>
        <li><Link href="/leads">View Leads</Link></li>
      </ul>
    </main>
  );
}
