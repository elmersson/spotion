import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreatePlaylist } from '@/hooks/use-create-playlist';
import { putCreatePlaylist } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';
import { AuthSession } from '@/types/types';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Playlist name must be at least 1 characters.',
  }),
  description: z.string().optional(),
  public: z.boolean(),
  collaborative: z.boolean(),
});

export const PlaylistModal = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const createPlaylist = useCreatePlaylist();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getAuthSession();

      setSession(session);
    };

    fetchSession();
  }, [setSession]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      public: false,
      collaborative: false,
    },
  });

  if (!session) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (session) {
      await putCreatePlaylist(session, values);
    }

    createPlaylist.onClose();
  };

  const handleSelectChange = (value: string) => {
    const isPublic = value === 'public';
    const isCollaborative = value === 'collaborative';

    if (isPublic) {
      form.setValue('public', true);
      form.setValue('collaborative', false);
    } else if (isCollaborative) {
      form.setValue('public', false);
      form.setValue('collaborative', true);
    } else {
      form.setValue('public', false);
      form.setValue('collaborative', false);
    }
  };

  console.log(session, 'hej');

  return (
    <Dialog open={createPlaylist.isOpen} onOpenChange={createPlaylist.onClose}>
      <DialogContent>
        <DialogHeader className='border-b pb-3'>
          <h2 className='text-lg font-medium'>Create Playlist</h2>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='playlist name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Textarea placeholder='description' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Private' defaultValue='private' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='private'>Private</SelectItem>
                  <SelectItem value='public'>Public</SelectItem>
                  <SelectItem value='collaborative'>Collaborative</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
