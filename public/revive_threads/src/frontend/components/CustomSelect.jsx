import React, { useState, useRef, useEffect } from 'react';

/**
 * Luxury Revive Threads Custom Select Component
 * No OS-native grey menus; styled with brand palette and Plus Jakarta Sans.
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  label,
  name,
  className = '',
  buttonClassName = '',
  placeholder = 'Select option...'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeOpt = options.find((o) => String(o.value) === String(value)) || options[0] || { label: placeholder, value: '' };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {name && <input type="hidden" name={name} value={value} />}
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-forest bg-white hover:bg-linen-50/80 border border-linen-300 focus:border-sage-500 rounded-xl transition-all shadow-2xs text-left select-none ${buttonClassName}`}
      >
        <span className="truncate">{activeOpt.label}</span>
        <svg
          className={`w-4 h-4 text-sage-600 ml-2 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-forest' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full min-w-[200px] bg-white rounded-2xl border border-linen-300 shadow-xl py-1.5 max-h-60 overflow-y-auto animate-fadeIn backdrop-blur-md">
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-sage-100 text-forest font-bold'
                    : 'text-sage-800 hover:bg-linen-100 hover:text-forest'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-forest shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
