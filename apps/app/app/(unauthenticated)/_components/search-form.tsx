'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { Search } from 'lucide-react';
import ButtonSearch from '@repo/design-system/components/search-button';
import { Button } from '@repo/design-system/components/ui/button';

// Form validation schema
const formSchema = z.object({
  searchTerm: z.string().min(1, {
    message: 'Search term is required.',
  }),
  mediaType: z.string({
    required_error: 'Please select a media type.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// iTunes Search API media types
const mediaTypes = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'podcast', label: 'Podcasts' },
  { value: 'music', label: 'Music' },
  { value: 'musicVideo', label: 'Music Videos' },
  { value: 'audiobook', label: 'Audiobooks' },
  { value: 'shortFilm', label: 'Short Films' },
  { value: 'tvShow', label: 'TV Shows' },
  { value: 'software', label: 'Apps' },
  { value: 'ebook', label: 'Books' },
];

export function SearchForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: '',
      mediaType: 'podcast',
    },
  });

  function onSubmit(values: FormValues) {
    // Handle form submission
    console.log('Form submitted with values:', values);

    // Navigate to search page with query parameters
    const searchParams = new URLSearchParams({
      q: values.searchTerm,
      media: values.mediaType,
    });

    router.push(`/search?${searchParams.toString()}`);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function onError(errors: any) {
    // Handle form validation errors with toast notifications
    for (const [field, error] of Object.entries(errors)) {
      if (error && typeof error === 'object' && 'message' in error) {
        toast.error(`${field}: ${(error as { message: string }).message}`);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex items-center gap-2"
      >
        <div className="grid w-full grid-cols-[auto_1fr] items-center rounded-full border border-gray-800 p-1 dark:bg-main-background ">
          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Media Type</FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-fit rounded-full border-gray-800 dark:bg-main-background dark:hover:bg-main-background">
                      <SelectValue className="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mediaTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="font-semibold text-base"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="w-full">
                {/* <FormLabel>Search Term</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Enter your search term..."
                    {...field}
                    className="h-12 w-full rounded-full border-0 bg-main-background shadow-none placeholder:text-lg focus-visible:border-none focus-visible:ring-[0px] focus-visible:ring-ring/50 md:text-lg dark:bg-main-background"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <ButtonSearch
          type="submit"
          controlled
          idleIcon={<Search />}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        />
      </form>
    </Form>
  );
}
