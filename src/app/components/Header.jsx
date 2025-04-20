"use client";

import { BellIcon, SearchIcon } from "./icons";
import UserMenu from "./UserMenu";

export default function Header({ title }) {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <h1 className="text-lg font-medium">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <input 
              type="search" 
              className="block w-full pl-10 pr-4 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400"
              placeholder="Rechercher..." 
            />
          </div>
          
          <button className="relative p-2 rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900"></span>
          </button>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
} 