import React from 'react';
import HomeIcon from './icons/HomeIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChatAlt2Icon from './icons/ChatAlt2Icon';
import UserIcon from './icons/UserIcon';
import CalculatorIcon from './icons/CalculatorIcon';

interface NavItemProps {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  active: boolean;
  notificationCount?: number;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, notificationCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`
        relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl
        transition-all duration-300 ease-in-out transform
        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white
        ${active 
          ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/40 -translate-y-3' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }
      `}
    >
      <div className="relative">
        {React.cloneElement(icon, { className: "w-7 h-7" })}
        {notificationCount > 0 && (
          <span className={`
            absolute -top-1.5 -right-2 text-white bg-orange-500 text-[10px] font-bold 
            w-4 h-4 rounded-full flex items-center justify-center ring-2
            ${active ? 'ring-orange-500' : 'ring-white'}
          `}>
            {notificationCount}
          </span>
        )}
      </div>
      <span className="text-[11px] mt-1 font-bold">{label}</span>
    </button>
  );
};

interface BottomNavProps {
    activePage: string;
    onNavigate: (page: string) => void;
    messageNotificationCount: number;
    onEstimateClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, messageNotificationCount, onEstimateClick }) => {
    
    const navItems = [
        { label: 'Layanan', icon: <HomeIcon /> },
        { label: 'Pesanan', icon: <ClipboardListIcon /> },
        { label: 'Pesan', icon: <ChatAlt2Icon />, notificationCount: messageNotificationCount },
        { label: 'Profil', icon: <UserIcon /> },
    ];

    const leftItems = navItems.slice(0, 2);
    const rightItems = navItems.slice(2);

    return (
        <nav className="fixed bottom-0 inset-x-0 z-20 h-24" role="navigation">
             {/* The new estimate button - positioned higher */}
            <div className="absolute top-[-1.5rem] left-1/2 -translate-x-1/2 z-20">
                 <button
                    onClick={onEstimateClick}
                    aria-label="Buat Estimasi"
                    className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center
                               shadow-xl shadow-blue-800/40 transform hover:-translate-y-1 transition-all duration-300
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ring-2 ring-slate-100"
                >
                    <CalculatorIcon className="w-8 h-8" />
                </button>
            </div>

            {/* Wrapper to position the bar and handle safe area */}
            <div className="absolute bottom-0 inset-x-0 max-w-sm mx-auto px-4 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                {/* The visual bar */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg ring-1 ring-black/5">
                    <div className="flex justify-around items-center h-20">
                        {leftItems.map((item) => (
                            <NavItem 
                                key={item.label}
                                icon={item.icon}
                                label={item.label}
                                active={activePage === item.label}
                                onClick={() => onNavigate(item.label)}
                            />
                        ))}
                        
                        <div className="w-16 h-16" aria-hidden="true" /> 

                        {rightItems.map((item) => (
                            <NavItem 
                                key={item.label}
                                icon={item.icon}
                                label={item.label}
                                active={activePage === item.label}
                                notificationCount={item.notificationCount}
                                onClick={() => onNavigate(item.label)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default BottomNav;