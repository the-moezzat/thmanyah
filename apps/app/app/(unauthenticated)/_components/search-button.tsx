'use client';

import { type ReactNode, useCallback, useState } from 'react';
import { Check, Copy, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@repo/design-system/components/ui/button';

export interface ButtonSearchProps {
  onSearch?: () => Promise<void> | void;
  idleIcon?: ReactNode;
  loadingIcon?: ReactNode;
  successIcon?: ReactNode;
  className?: string;
  duration?: number;
  loadingDuration?: number;
  disabled?: boolean;
}

const defaultIcons = {
  idle: <Copy size={16} />,
  loading: <LoaderCircle size={16} className="animate-spin" />,
  success: <Check size={16} />,
};

export default function ButtonSearch({
  onSearch,
  idleIcon = defaultIcons.idle,
  loadingIcon = defaultIcons.loading,
  successIcon = defaultIcons.success,
  className = '',
  duration = 2000,
  loadingDuration = 1000,
  disabled = false,
}: ButtonSearchProps) {
  const [buttonState, setButtonState] = useState<
    'idle' | 'loading' | 'success'
  >('idle');

  const handleClick = useCallback(async () => {
    setButtonState('loading');
    if (onSearch) {
      await onSearch();
    }
    setTimeout(() => {
      setButtonState('success');
    }, loadingDuration);
    setTimeout(() => {
      setButtonState('idle');
    }, loadingDuration + duration);
  }, [onSearch, loadingDuration, duration]);

  const icons = {
    idle: idleIcon,
    loading: loadingIcon,
    success: successIcon,
  };

  return (
    <div className="flex justify-center">
      <Button
        type="button"
        className={`relative size-14 cursor-pointer overflow-hidden rounded-full border ${className}`}
        disabled={buttonState !== 'idle' || disabled}
        onClick={handleClick}
        size={'icon'}
        aria-label={buttonState === 'loading' ? 'Searching...' : 'Search'}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            initial={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            key={buttonState}
            className="flex w-full items-center justify-center"
          >
            {icons[buttonState]}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  );
}
