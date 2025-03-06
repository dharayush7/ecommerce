"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Loader2, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import useMediaUpload, { Attachment } from "./useMediaUpload";
import { Button } from "@/components/ui/button";

export default function MediaUpload({
  setImage,
  setIsUploading,
}: {
  setImage: (id: string[]) => void;
  setIsUploading: (e: boolean) => void;
}) {
  const {
    attachments,
    isUploading,
    removeAttachment,
    startUpload,
    uploadProgress,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  useEffect(() => {
    setImage(attachments.map((e) => e.mediaId || ""));
  }, [attachments]);

  useEffect(() => {
    setIsUploading(isUploading);
  }, [isUploading]);

  return (
    <div className="space-y-2 w-full">
      <div {...getRootProps()} className="w-80 h-40">
        <div
          className={cn(
            "h-40 w-80 overflow-y-auto rounded-2xl bg-gray-100 px-5 py-3 outline-black absolute",
            isDragActive ? "outline-dashed outline-2" : "outline"
          )}
        />
        <input {...getInputProps()} />
        <div className="relative w-full h-full flex justify-center items-center">
          <Button type="button" disabled={isUploading}>
            <Upload />
            Upload
          </Button>
        </div>
      </div>
      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}

      <div>
        {isUploading && (
          <>
            <span className="text-sm">
              {uploadProgress ?? 0}%
              <Loader2 className="size-5 animate-spin text-primary" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  onRemoveClick,
  attachment: { file, isUploading },
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);
  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          title="delete"
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
