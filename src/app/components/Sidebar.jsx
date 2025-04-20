"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon, 
  CalendarIcon, 
  DocumentTextIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from "./icons";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navigation = [
    { name: "Tableau de bord", href: "/", icon: HomeIcon },
    { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
    { name: "Événements", href: "/events", icon: CalendarIcon },
    { name: "Documents", href: "/documents", icon: DocumentTextIcon },
    { name: "Paramètres", href: "/settings", icon: CogIcon },
  ];

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col px-4 py-5">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            DC
          </div>
          <span className="text-lg font-semibold">ClientDash</span>
        </div>
        
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    group flex gap-2 rounded-md p-2 text-sm font-medium
                    ${pathname === item.href 
                      ? "bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400" 
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                    }
                  `}
                >
                  <item.icon 
                    className={`h-5 w-5 shrink-0 ${
                      pathname === item.href 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
              <UserCircleIcon className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Jean Dupont</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">jean@example.com</span>
            </div>
          </div>
          <button className="ml-auto rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 