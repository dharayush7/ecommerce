import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

export default function useMediaUpload() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>();

  const { startUpload, isUploading } = useUploadThing("media", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extention = file.name.split(".").pop();
        return new File([file], `attachment_${uuidv4()}.${extention}`, {
          type: file.type,
        });
      });

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({ file, isUploading: true })),
      ]);

      return renamedFiles;
    },
    onUploadProgress: setUploadProgress,
    onClientUploadComplete(res) {
      setAttachments((prev) =>
        prev.map((a) => {
          const uploadresult = res.find((r) => r.name === a.file.name);
          if (!uploadresult) return a;
          return {
            ...a,
            mediaId: uploadresult.serverData.mediaId,
            isUploading: false,
          };
        })
      );
    },
    onUploadError(e) {
      setAttachments((prev) => prev.filter((a) => !a.isUploading));
      toast(e.message);
    },
  });

  function handelStartUpload(files: File[]) {
    if (isUploading) {
      toast("please wait for the current upload finish.");
      return;
    }

    if (attachments.length + files.length > 5) {
      toast("You can only upload up to 5 attachments");
      return;
    }

    startUpload(files);
  }

  function removeAttachment(fileName: string) {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  }

  function reset() {
    setAttachments([]);
    setUploadProgress(undefined);
  }

  return {
    startUpload: handelStartUpload,
    removeAttachment,
    reset,
    attachments,
    isUploading,
    uploadProgress,
  };
}
