import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function FilterGroup({
  title,
  subtitle,
  buttonText,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
}) {
  const categories = [
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "Category 2",
    },
    {
      id: 3,
      name: "Category 3",
    },
  ];
  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h1 className="font-bold text-lg">{title}</h1>
      <p className="text-gray-400 text-sm pb-4">{subtitle}</p>
      <div className="flex-1 overflow-y-auto">
        {categories.map((category) => (
          <span key={category.id} className="flex items-center gap-4 pb-4">
            <Checkbox />
            <p>{category.name}</p>
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <Button className="w-full">{buttonText}</Button>
      </div>
    </div>
  );
}
