import {
  ClockIcon,
  InboxIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  resolved: CheckBadgeIcon,
  personnels: ShieldCheckIcon,
  pending: ClockIcon,
  reports: InboxIcon,
};

export default async function CardWrapper() {
  const { totalResolvedReports, totalPendingReports, totalReports, totalPersonnels } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Resolved Reports" value={totalResolvedReports} type="resolved" />
      <Card title="Pending Reports" value={totalPendingReports} type="pending" />
      <Card title="Total Reports" value={totalReports} type="reports" />
      <Card
        title="Total Personnels"
        value={totalPersonnels}
        type="personnels"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'reports' | 'personnels' | 'pending' | 'resolved';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
