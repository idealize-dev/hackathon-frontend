import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/lib/definitions";

export default function CategoryFilter({
  title,
  subtitle,
  buttonText,
  items,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  items: Category[];
}) {
  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h1 className="font-bold text-lg">{title}</h1>
      <p className="text-gray-400 text-sm pb-4">{subtitle}</p>
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <span key={item.id} className="flex items-center gap-4 pb-4">
            <Checkbox />
            <p>{item.name}</p>
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <Button className="w-full">{buttonText}</Button>
      </div>
    </div>
  );
}
