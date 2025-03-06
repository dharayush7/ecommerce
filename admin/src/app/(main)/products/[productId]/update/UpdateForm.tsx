"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Input, TextArea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category, ProductRequest } from "@/lib/type";
import LoadingButton from "@/components/LoadingButton";
import { updateProduct } from "./action";
import { CategorySelection } from "./CategorySelectiom";

export default function UpdateForm({
  data,
  productId,
  categories,
}: {
  data: Omit<ProductRequest, "images">;
  productId: string;
  categories: Category[];
}) {
  const [pointInd, setPointInd] = useState(data.points.length);
  const [pointCnt, setPointCnt] = useState<string[]>([...data.points]);
  const [formValue, setFormValue] =
    useState<Omit<ProductRequest, "images">>(data);
  const [category, setCatagory] = useState<string>("");
  const [currentCategories, setCurrentCategoies] = useState([
    ...categories.filter((e) => !formValue.category.includes(e.id)),
  ]);
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
      const err = await updateProduct({ productId, values: formValue });
      if (err) setErr(err);
    });
  };

  const onAddCategory = () => {
    if (category.length == 0) return;
    setCurrentCategoies([
      ...currentCategories.filter((e) => e.id !== category),
    ]);
    setFormValue({ ...formValue, category: [...formValue.category, category] });
    setCatagory("");
  };

  const onRemoveCategory = (id: string) => {
    const r = categories.find((e) => e.id === id);
    if (r) {
      setCurrentCategoies([...currentCategories, r]);
      setFormValue({
        ...formValue,
        category: formValue.category.filter((e) => e !== id),
      });
    }
  };

  function range(end: number) {
    const ans = [];
    for (let i = 0; i < end; i++) {
      ans.push(i);
    }
    return ans;
  }

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
        <div className="flex justify-evenly w-full">
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
          <div className="w-full space-y-1">
            <p>Categories</p>
            <div className="flex space-x-2 w-1/2">
              <CategorySelection
                categories={currentCategories}
                setCategory={setCatagory}
              />
              <Button className="" type="button" onClick={onAddCategory}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formValue.category?.map((cat, i) => {
                const r = categories.find((e) => e.id == cat);
                return (
                  <div
                    className="flex space-x-2 justify-center items-center w-fit bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-400"
                    key={i}
                  >
                    <p>{r?.name}</p>
                    <button
                      onClick={() => onRemoveCategory(cat)}
                      title="remove"
                      type="button"
                      className="hover:bg-gray-300 rounded-full p-1 duration-200 ease-in-out"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <LoadingButton type="submit" isLoading={isPending}>
            Save changes
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
