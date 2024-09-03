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
import { SubmitButton } from "@/features/form/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SummonerFormType, SummonerFormSchema } from "./edit-summoner.schema";
import { editSummonerAction } from "./edit-summoner.action";

export const EditSummonerForm = () => {
  const form = useZodForm({
    schema: SummonerFormSchema,
  });
  const router = useRouter();

  const updateSummonerMutation = useMutation({
    mutationFn: async (values: SummonerFormType) => {
      const result = await editSummonerAction(values);

      if (!result?.data) {
        toast.error(result?.serverError);
        return;
      }

      toast.success("Summoner linked successfully");
      router.refresh();
    },
  });

  return (
    <Form
      form={form}
      onSubmit={async (v) => updateSummonerMutation.mutateAsync(v)}
      disabled={updateSummonerMutation.isPending}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>new Summoner Name</FormLabel>
            <FormControl>
              <Input placeholder="ex: gabysushi#euw" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton className="w-fit self-end" size="sm">
        Save
      </SubmitButton>
    </Form>
  );
};
