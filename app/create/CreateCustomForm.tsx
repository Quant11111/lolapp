"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCustomAction } from "./create-custom.action";
import { CustomFormSchema, CustomFormType } from "./create-custom.schema";
import { Button } from "@/components/ui/button";
export const CreateCustomForm = () => {
  const form = useZodForm({
    schema: CustomFormSchema,
  });
  const createCustomMutation = useMutation({
    mutationFn: async (values: CustomFormType) => {
      const result = await createCustomAction(values);

      if (result?.serverError) {
        toast.error(result.serverError);
        return;
      }
    },
  });

  async function onSubmit(values: CustomFormType) {
    return createCustomMutation.mutateAsync(values);
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-3 p-4">
      <h2>Create Custom Event</h2>
      <Form
        form={form}
        onSubmit={async (values) => {
          return onSubmit(values);
        }}
        className="max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>descrition</FormLabel>
              <FormControl>
                <Input placeholder="Noxus VS DEMACIAAAAA !!!!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discordLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>discordLink</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </Form>
    </div>
  );
};
