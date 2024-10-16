"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LuLoader2 } from "react-icons/lu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { signout } from "@/lib/actions/auth/signout";
import { routes } from "@/constants";
import { useModalStore } from "@/lib/zustand/store-providers/modal-store-provider";

import { ModalTypes } from "@/lib/zustand/stores/modal-store";

function SignoutModal() {
  const { isOpen, type, onClose } = useModalStore((s) => s);

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const signoutRes = await signout();

      if (!signoutRes?.success) {
        console.log("[Error] signout", signoutRes?.error);
        throw new Error("Failed to signout");
      }

      toast.success("Signout successful");
      router.push(routes.signIn());
      onClose();
    } catch (error) {
      console.error("[Error] Signout", error);
      toast.error("Failed to signout");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog
      open={!!isOpen && type === ModalTypes.Signout}
      onOpenChange={isSubmitting ? () => {} : onClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will sign you out of your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSubmitting}
            className="flex items-center gap-3 form-btn"
            onClick={onSubmit}
          >
            {isSubmitting && <LuLoader2 className="w-5 h-5 animate-spin" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SignoutModal;
