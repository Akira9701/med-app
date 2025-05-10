import { Link, useLocation } from 'react-router';
import clsx from 'clsx';

interface Item {
  title: string;
  url: string;
  icon: React.ElementType;
}

const BottomNav = ({ items }: { items: Item[] }) => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 flex justify-around py-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.url;
        return (
          <Link
            key={item.url}
            to={item.url}
            className={clsx(
              'flex flex-col items-center gap-1 text-xs',
              isActive ? 'text-blue-600' : 'text-gray-500',
            )}>
            <Icon size={24} />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
