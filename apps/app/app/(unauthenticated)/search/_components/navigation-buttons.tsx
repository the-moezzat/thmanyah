'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function NavigationButtons() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const updateNavigationState = () => {
      setCanGoBack(window.history.length > 1);
      setCanGoForward(window.history.length > window.history.state?.idx + 1 || false);
    };

    updateNavigationState();

    const handlePopState = () => {
      updateNavigationState();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      window.history.forward();
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button 
        size={'icon'} 
        variant={'ghost'} 
        onClick={handleGoBack}
        disabled={!canGoBack}
      >
        <ChevronLeft className="size-6" />
      </Button>{' '}
      <Button 
        size={'icon'} 
        variant={'ghost'} 
        onClick={handleGoForward}
        disabled={!canGoForward}
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
}

export default NavigationButtons;
