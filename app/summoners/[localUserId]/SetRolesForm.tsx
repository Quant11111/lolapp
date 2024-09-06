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
import { setRolesAction } from "./set-roles.action";
import { SetRolesFormType, SetRolesSchema } from "./set-roles.schema";
import { Role, Summoner } from "@prisma/client";
import { Input } from "@/components/ui/input";

type SetRolesFormProps = {
  summoner: Summoner;
};

export const SetRolesForm = ({ summoner }: SetRolesFormProps) => {
  const form = useZodForm({
    schema: SetRolesSchema,
    defaultValues: {
      firstRole: (summoner.firstRole as Role) || null,
      secondRole: (summoner.secondRole as Role) || null,
    },
  });
  const router = useRouter();

  const setRolesMutation = useMutation({
    mutationFn: async (values: SetRolesFormType) => {
      const result = await setRolesAction(values);

      if (!result) {
        toast.error("Failed to set roles");
        return;
      }

      toast.success("Roles set successfully");
      router.refresh();
    },
  });

  return (
    <Form
      form={form}
      onSubmit={async (v) => setRolesMutation.mutateAsync(v)}
      disabled={setRolesMutation.isPending}
      className="flex size-full items-center justify-around gap-2"
    >
      <FormField
        control={form.control}
        name="firstRole"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="secondRole"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton className="w-1/4">Save</SubmitButton>
    </Form>
  );
};
