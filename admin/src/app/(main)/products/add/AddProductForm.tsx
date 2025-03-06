"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Minus, Plus } from "lucide-react";
import { Input, TextArea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductRequest } from "@/lib/type";
import MediaUpload from "./MediaUpload";
import LoadingButton from "@/components/LoadingButton";
import { addProduct } from "./action";

export default function AddProductForm() {
  const [pointInd, setPointInd] = useState(1);
  const [pointCnt, setPointCnt] = useState<string[]>([""]);
  const [formValue, setFormValue] = useState<ProductRequest>({
    categoryId: "",
    description: "",
    description2: "",
    description3: "",
    fragrence: "",
    idealFor: "",
    images: [],
    maxPrice: "",
    name: "",
    points: [],
    preference: "",
    quantity: "",
    sellPrice: "",
    strength: "",
    sustainable: "",
    type: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [err, setErr] = useState("");
  const [isPending, startTansition] = useTransition();

  useEffect(() => {
    setFormValue({ ...formValue, points: pointCnt });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointCnt]);

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  const inpFields = [
    {
      name: "Name",
      type: "text",
      value: formValue.name,
      isrequired: true,
      onChange: (val: string) => setFormValue({ ...formValue, name: val }),
      comp: Input,
    },
    {
      name: "Description",
      type: "text",
      value: formValue.description,
      isrequired: true,
      onChange: (val: string) =>
        setFormValue({ ...formValue, description: val }),
      comp: TextArea,
    },
    {
      name: "Description2",
      type: "text",
      value: formValue.description2,
      isrequired: true,
      onChange: (val: string) =>
        setFormValue({ ...formValue, description2: val }),
      comp: TextArea,
    },
    {
      name: "Description3",
      type: "text",
      value: formValue.description3,
      isrequired: false,
      onChange: (val: string) =>
        setFormValue({ ...formValue, description3: val }),
      comp: TextArea,
    },
    {
      name: "Max Price",
      type: "number",
      isrequired: true,
      value: formValue.maxPrice,
      onChange: (val: string) => setFormValue({ ...formValue, maxPrice: val }),
      comp: Input,
    },
    {
      name: "Sell Price",
      type: "number",
      isrequired: true,
      value: formValue.sellPrice,
      onChange: (val: string) => setFormValue({ ...formValue, sellPrice: val }),
      comp: Input,
    },
    {
      name: "Fragrence",
      type: "text",
      isrequired: false,
      value: formValue.fragrence,
      onChange: (val: string) => setFormValue({ ...formValue, fragrence: val }),
      comp: Input,
    },
    {
      name: "Strength",
      type: "text",
      isrequired: false,
      value: formValue.strength,
      onChange: (val: string) => setFormValue({ ...formValue, strength: val }),
      comp: Input,
    },
    {
      name: "Preference",
      type: "text",
      isrequired: false,
      value: formValue.preference,
      onChange: (val: string) =>
        setFormValue({ ...formValue, preference: val }),
      comp: Input,
    },
    {
      name: "Sustainable",
      type: "text",
      isrequired: false,
      value: formValue.sustainable,
      onChange: (val: string) =>
        setFormValue({ ...formValue, sustainable: val }),
      comp: Input,
    },
    {
      name: "Type",
      type: "text",
      isrequired: false,
      value: formValue.type,
      onChange: (val: string) => setFormValue({ ...formValue, type: val }),
      comp: Input,
    },
    {
      name: "Ideal For",
      type: "text",
      isrequired: false,

      value: formValue.idealFor,
      onChange: (val: string) => setFormValue({ ...formValue, idealFor: val }),
      comp: Input,
    },
    {
      name: "Quantity",
      type: "number",
      isrequired: false,
      value: formValue.quantity,
      onChange: (val: string) => setFormValue({ ...formValue, quantity: val }),
      comp: Input,
    },
    {
      name: "Category",
      type: "text",
      isrequired: true,
      value: formValue.categoryId,
      onChange: (val: string) =>
        setFormValue({ ...formValue, categoryId: val }),
      comp: Input,
    },
  ];

  const onPlusClick = () => {
    setPointInd(pointInd + 1);
    setPointCnt([...pointCnt, ""]);
  };

  const onMinusClick = (i: number) => {
    setPointInd(pointInd - 1);
    const arr: string[] = [];
    pointCnt.map((cnt, ind) => {
      if (ind !== i) arr.push(cnt);
    });
    setPointCnt(arr);
  };

  const onChange = (text: string, i: number) => {
    const arr: string[] = [];
    pointCnt.map((cnt, ind) => {
      if (ind !== i) arr.push(cnt);
      else arr.push(text);
    });
    setPointCnt(arr);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTansition(async () => {
      const err = await addProduct(formValue);
      if (err) setErr(err.msg);
    });
  };

  function range(end: number) {
    const ans = [];
    for (let i = 0; i < end; i++) {
      ans.push(i);
    }
    return ans;
  }

  const setImage = (id: string[]) => {
    setFormValue({ ...formValue, images: id });
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
        <div className="w-1/2 space-y-1 px-2 mt-3">
          <p className="text-lg">Points</p>
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer mb-3"
            onClick={() => onPlusClick()}
          >
            <Plus />
          </Button>
          {range(pointInd).map((i) => (
            <div key={i} className="flex space-x-2">
              <Input
                value={pointCnt[i]}
                onChange={(e) => onChange(e.target.value, i)}
              />
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
                onClick={() => onMinusClick(i)}
              >
                <Minus />
              </Button>
            </div>
          ))}
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
            Add Product
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
