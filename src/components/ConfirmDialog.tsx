import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { en } from "@/language/en";
import { ReactNode } from "react";

type ConfirmDialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

function ConfirmDialog({
  trigger,
  title,
  description,
  cancelText = en.buttons.cancel,
  confirmText = en.buttons.confirm,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-x-4">
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDialog;
