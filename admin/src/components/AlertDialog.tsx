import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

interface AlertDialogProps {
  isOpen: boolean;
  content: string;
  btnTitle: string;
  isLoading: boolean;
  setIsOpen: (e: boolean) => void;
  onClick: () => void;
}

function AlertDialog({
  btnTitle,
  content,
  isLoading,
  isOpen,
  onClick,
  setIsOpen,
}: AlertDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Alert</DialogTitle>
        <DialogHeader>{content}</DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              if (!isLoading) setIsOpen(false);
            }}
          >
            Close
          </Button>
          <LoadingButton
            isLoading={isLoading}
            varient="destructive"
            onClick={onClick}
          >
            {btnTitle}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AlertDialog;
