"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { SubmitButton } from "@/features/form/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setPresentationAction } from "./set-presentation.action";
import {
  SetPresentationFormType,
  SetPresentationSchema,
} from "./set-presentation.schema";
import { Summoner } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

type SetPresentationFormProps = {
  summoner: Summoner;
};

export const SetPresentationForm = ({ summoner }: SetPresentationFormProps) => {
  const form = useZodForm({
    schema: SetPresentationSchema,
    defaultValues: {
      presentation: summoner.pinnedPresentation || "",
    },
  });
  const router = useRouter();

  const setPresentationMutation = useMutation({
    mutationFn: async (values: SetPresentationFormType) => {
      const result = await setPresentationAction(values);

      if (!result) {
        toast.error("Failed to set presentation");
        return;
      }

      toast.success("Presentation set successfully");
      router.refresh();
    },
  });

  return (
    <Form
      form={form}
      onSubmit={async (v) => setPresentationMutation.mutateAsync(v)}
      disabled={setPresentationMutation.isPending}
      className="flex size-full items-center justify-around gap-2"
    >
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem className="m-2 w-full">
            <FormControl className="">
              <Textarea
                className="size-full"
                placeholder=""
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton className="w-1/6">Save</SubmitButton>
    </Form>
  );
};
