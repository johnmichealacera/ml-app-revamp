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
  const { totalResolvedStudentWelders, totalStudentComputerServicing, totalStudentBookeepingCount, totalStudents } = await fetchCardData();
  return (
    <>
      <Card title="Shielded Metal Arc Wielding" value={totalResolvedStudentWelders} type="resolved" />
      <Card title="Computer Systems Servicing" value={totalStudentComputerServicing} type="pending" />
      <Card title="Bookkeeping NC III" value={totalStudentBookeepingCount} type="reports" />
      <Card
        title="Total Students"
        value={totalStudents}
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
