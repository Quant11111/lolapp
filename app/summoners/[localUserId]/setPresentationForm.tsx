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
import { toast } from "sonner";
import { setPresentationAction } from "./set-presentation.action";
import {
  SetPresentationFormType,
  SetPresentationSchema,
} from "./set-presentation.schema";
import { Textarea } from "@/components/ui/textarea";
import { UserWithSummoner } from "../../user-context-provider";

type SetPresentationFormProps = {
  user: UserWithSummoner;
  refetch: () => void;
  isOwnProfile: boolean;
};

export const SetPresentationForm = ({
  user,
  refetch,
  isOwnProfile,
}: SetPresentationFormProps) => {
  const form = useZodForm({
    schema: SetPresentationSchema,
    defaultValues: {
      presentation: user.pinnedPresentation || "",
    },
  });

  const setPresentationMutation = useMutation({
    mutationFn: async (values: SetPresentationFormType) => {
      const result = await setPresentationAction(values);

      if (!result) {
        toast.error("Failed to set presentation");
        return;
      }

      toast.success("Presentation set successfully");
      refetch();
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
        disabled={!isOwnProfile}
        render={({ field }) => (
          <FormItem className="m-2 w-full">
            <FormControl className="">
              <Textarea
                className="size-full"
                placeholder={user.pinnedPresentation || ""}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton
        className="w-1/6"
        hidden={!isOwnProfile}
        onClick={async () => {
          setTimeout;
        }}
      >
        Save
      </SubmitButton>
    </Form>
  );
};
