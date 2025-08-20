import type { Meta, StoryObj } from '@storybook/react';
import { Search, Loader2, Check, RotateCcw } from 'lucide-react';
import { useState } from 'react';

import ButtonSearch from '@repo/design-system/components/search-button';

/**
 * A customizable search button component that supports different states (idle, loading, success)
 * and can be controlled externally or manage its own state internally.
 */
const meta = {
  title: 'ui/ButtonSearch',
  component: ButtonSearch,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
    controlled: {
      control: 'boolean',
      description: 'Whether the button state is controlled externally',
    },
    state: {
      control: 'select',
      options: ['idle', 'loading', 'success'],
      description: 'Current state of the button (only when controlled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'button',
    controlled: false,
    disabled: false,
    idleIcon: <Search className="h-4 w-4" />,
    loadingIcon: <Loader2 className="h-4 w-4 animate-spin" />,
    successIcon: <Check className="h-4 w-4" />,
  },
} satisfies Meta<typeof ButtonSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default search button that manages its own state internally.
 * Clicking it will cycle through idle → loading → success → idle states.
 */
export const Default: Story = {
  args: {
    onSearch: () => console.log('Search clicked'),
  },
};

/**
 * A submit button type for use within forms.
 * When clicked, it will submit the parent form.
 */
export const SubmitType: Story = {
  args: {
    type: 'submit',
    onSearch: () => console.log('Form submitted'),
  },
  render: (args: Story['args']) => (
    <form onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); }}>
      <input 
        type="text" 
        placeholder="Search..." 
        className="mr-2 rounded border px-3 py-2"
      />
      <ButtonSearch {...args} />
    </form>
  ),
};

/**
 * A reset button type for clearing forms.
 */
export const ResetType: Story = {
  args: {
    type: 'reset',
    idleIcon: <RotateCcw className="h-4 w-4" />,
    onSearch: () => console.log('Form reset'),
  },
  render: (args: Story['args']) => (
    <form>
      <input 
        type="text" 
        placeholder="Search..." 
        defaultValue="Sample text"
        className="mr-2 rounded border px-3 py-2"
      />
      <ButtonSearch {...args} />
    </form>
  ),
};

/**
 * A disabled search button that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    onSearch: () => console.log('This should not fire'),
  },
};

/**
 * A controlled search button where the state is managed externally.
 * Use the controls to change the state manually.
 */
export const Controlled: Story = {
  args: {
    controlled: true,
    state: 'idle',
    onStateChange: (newState: string) => console.log('State changed to:', newState),
  },
};

/**
 * Interactive example showing external state control with buttons.
 */
export const InteractiveControlled: Story = {
  render: () => {
    const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <ButtonSearch
          controlled
          state={state}
          onStateChange={setState}
          idleIcon={<Search className="h-4 w-4" />}
          loadingIcon={<Loader2 className="h-4 w-4 animate-spin" />}
          successIcon={<Check className="h-4 w-4" />}
        />
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setState('idle')}
            className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
          >
            Set Idle
          </button>
          <button
            type="button"
            onClick={() => setState('loading')}
            className="rounded bg-blue-100 px-3 py-1 text-sm hover:bg-blue-200"
          >
            Set Loading
          </button>
          <button
            type="button"
            onClick={() => setState('success')}
            className="rounded bg-green-100 px-3 py-1 text-sm hover:bg-green-200"
          >
            Set Success
          </button>
        </div>
        
        <p className="text-gray-600 text-sm">Current state: {state}</p>
      </div>
    );
  },
};

/**
 * Custom icons example showing how to customize the button icons.
 */
export const CustomIcons: Story = {
  args: {
    idleIcon: <Search className="h-5 w-5" />,
    loadingIcon: <Loader2 className="h-5 w-5 animate-spin" />,
    successIcon: <Check className="h-5 w-5" />,
    onSearch: () => console.log('Custom icons search'),
  },
};