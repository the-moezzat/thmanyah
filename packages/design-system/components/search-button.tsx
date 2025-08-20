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
  // State control props
  state?: 'idle' | 'loading' | 'success';
  onStateChange?: (state: 'idle' | 'loading' | 'success') => void;
  controlled?: boolean;
  // Button type prop
  type?: 'button' | 'submit' | 'reset';
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
  state,
  onStateChange,
  controlled = false,
  type = 'button',
}: ButtonSearchProps) {
  const [internalState, setInternalState] = useState<
    'idle' | 'loading' | 'success'
  >('idle');

  // Use controlled state if provided, otherwise use internal state
  const buttonState = controlled && state !== undefined ? state : internalState;

  const updateState = useCallback(
    (newState: 'idle' | 'loading' | 'success') => {
      if (controlled) {
        onStateChange?.(newState);
      } else {
        setInternalState(newState);
      }
    },
    [controlled, onStateChange]
  );

  const handleClick = useCallback(async () => {
    updateState('loading');
    if (onSearch) {
      await onSearch();
    }

    // Only auto-transition states if not controlled
    if (!controlled) {
      setTimeout(() => {
        updateState('success');
      }, loadingDuration);
      setTimeout(() => {
        updateState('idle');
      }, loadingDuration + duration);
    }
  }, [onSearch, loadingDuration, duration, updateState, controlled]);

  const icons = {
    idle: idleIcon,
    loading: loadingIcon,
    success: successIcon,
  };

  return (
    <Button
      type={'submit'}
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
  );
}
