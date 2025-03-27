"use client";
import React, { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import MediaUpload from "./MediaUpload";
import LoadingButton from "@/components/LoadingButton";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { addCarousel } from "./action";
import { AddCarousel } from "@/lib/type";

export default function AddCarouselForm() {
  const [formValue, setFormValue] = useState<AddCarousel>({
    imageId: "",
    isBlack: true,
    link: "",
    preference: "1",
    position: "LEFT",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [err, setErr] = useState("");

  const [isPending, startTansition] = useTransition();

  const inpFields = [
    {
      name: "Link",
      type: "text",
      value: formValue.link,
      isrequired: true,
      onChange: (val: string) => setFormValue({ ...formValue, link: val }),
      comp: Input,
    },
    {
      name: "Preference",
      type: "number",
      value: formValue.preference,
      isrequired: true,
      onChange: (val: string) =>
        setFormValue({ ...formValue, preference: val }),
      comp: Input,
    },
  ];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTansition(async () => {
      const err = await addCarousel(formValue);
      if (err) setErr(err.msg);
    });
  };

  const setImage = (id: string[]) => {
    setFormValue({ ...formValue, imageId: id[0] });
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <p className="text-red-600">{err}</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap">
          {inpFields.map((item, i) => (
            <div key={i} className="w-1/2 px-2 py-2">
              <label htmlFor={`${i}`} className="pb-1">
                {item.name}
              </label>
              <item.comp
                id={`${i}`}
                value={item.value}
                onChange={(e) => item.onChange(e.target.value)}
                type={item.type}
                required={item.isrequired}
              />
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex items-center space-x-2 w-full">
            <Checkbox
              id="site"
              className="rounded-none border border-primary"
              checked={formValue.isBlack}
              onCheckedChange={(e) =>
                setFormValue({ ...formValue, isBlack: Boolean(e) })
              }
            />
            <label
              htmlFor="site"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Black button
            </label>
          </div>
          <div className="w-full">
            <p className="text-lg mb-3">Position</p>
            <RadioGroup
              defaultValue="LEFT"
              value={formValue.position}
              onValueChange={(value) =>
                setFormValue({ ...formValue, position: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="LEFT" id="option-one" />
                <Label htmlFor="option-one">Left</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="RIGHT" id="option-two" />
                <Label htmlFor="option-two">Right</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="pt-3">
          <p className="text-lg font-bold pb-2">Upload Images</p>
          <MediaUpload setImage={setImage} setIsUploading={setIsUploading} />
        </div>
        <div className="w-full flex justify-end items-center">
          <LoadingButton
            type="submit"
            disabled={isUploading}
            isLoading={isPending}
          >
            Add Carousel
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
