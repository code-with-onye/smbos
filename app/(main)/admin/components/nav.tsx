import React from 'react'
import { MainNav } from './admin-nav'
import { ThemeSwitcher } from '@/components/shared/theme-switcher'

export const Nav = () => {
  return (
    <div className="w-full rounded-full border dark:border-slate-800 bg-white dark:bg-[#272E38] p-4 my-4 flex justify-between sticky top-3">
    <MainNav />
    <ThemeSwitcher />
  </div>
  )
}
