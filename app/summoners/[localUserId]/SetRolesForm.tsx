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
import { setRolesAction } from "./set-roles.action";
import { SetRolesFormType, SetRolesSchema } from "./set-roles.schema";
import { Role } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { UserWithSummoner } from "../../user-context-provider";

type SetRolesFormProps = {
  user: UserWithSummoner;
  refetch: () => void;
  isOwnProfile: boolean;
};

export const SetRolesForm = ({
  user,
  refetch,
  isOwnProfile,
}: SetRolesFormProps) => {
  const form = useZodForm({
    schema: SetRolesSchema,
    defaultValues: {
      firstRole: (user.firstRole as Role) || null,
      secondRole: (user.secondRole as Role) || null,
    },
  });

  const setRolesMutation = useMutation({
    mutationFn: async (values: SetRolesFormType) => {
      const result = await setRolesAction(values);

      if (!result) {
        toast.error("Failed to set roles");
        return;
      }
      toast.success("Roles set successfully");
      refetch();
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
        disabled={!isOwnProfile}
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
        disabled={!isOwnProfile}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton className="w-1/4" hidden={!isOwnProfile}>
        Save
      </SubmitButton>
    </Form>
  );
};
