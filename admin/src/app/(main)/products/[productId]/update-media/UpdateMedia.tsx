"use client";
import { Media } from "@/lib/type";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Loader2, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import useMediaUpload, { Attachment } from "@/hooks/useMediaUpload";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { updateMedia } from "./action";
import { toast } from "sonner";

export default function UpdateMedia({
  oldMedia,
  productId,
}: {
  oldMedia: Media[];
  productId: string;
}) {
  const [oldMediaData, setOldMediaData] = useState<Media[]>(oldMedia);
  const [mediaId, setMediaId] = useState<string[]>([]);
  const [uploadMediaId, setUploadMediaId] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMediaId([...oldMediaData.map((e) => e.id), ...uploadMediaId]);
  }, [oldMediaData, uploadMediaId]);

  const onCancel = (mediaId: string) => {
    const arr: Media[] = [];
    oldMediaData.map((e) => {
      if (e.id !== mediaId) arr.push(e);
    });
    setOldMediaData(arr);
  };

  const onSubmit = async () => {
    startTransition(async () => {
      const err = await updateMedia({ image: mediaId, productId });
      if (err) toast(err);
    });
  };

  return (
    <div>
      <div>
        <div className="w-full px-3 pb-10">
          <p className="text-3xl font-medium">Old images</p>
        </div>
        <div className="flex flex-wrap px-3 gap-3">
          {oldMediaData.map((media, i) => (
            <PrevAttachMentPreviw key={i} media={media} onCancle={onCancel} />
          ))}
        </div>
      </div>
      <div className="p-6 mt-12">
        <div className="pb-2 pl-2">
          <p className="text-lg">Upload New Images</p>
        </div>
        <MediaUpload
          setImage={setUploadMediaId}
          setIsUploading={setIsUploading}
        />
      </div>
      <div className="w-full flex justify-end items-center pt-6 px-6 pb-6">
        <LoadingButton
          isLoading={isPending}
          disabled={isUploading}
          onClick={onSubmit}
        >
          Save changes
        </LoadingButton>
      </div>
    </div>
  );
}

function PrevAttachMentPreviw({
  media,
  onCancle,
}: {
  media: Media;
  onCancle: (id: string) => void;
}) {
  return (
    <div className={cn("relative mx-auto size-fit")}>
      <Image
        src={media.url}
        alt="Attachment preview"
        width={300}
        height={300}
        className="size-fit max-h-[30rem] rounded-2xl"
      />
      <button
        title="delete"
        onClick={() => onCancle(media.id)}
        className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export function MediaUpload({
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
