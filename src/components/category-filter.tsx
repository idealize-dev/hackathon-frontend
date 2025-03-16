import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Category } from "@/lib/definitions";

export default function CategoryDialog({ 
  title, 
  subtitle, 
  items, 
  onCategoryChange, 
  buttonText, 
  onCreateCategory 
} : {
  title: string;
  subtitle: string;
  items: Category[];
  onCategoryChange: (categoryId: number) => void;
  buttonText: string;
  onCreateCategory: (name: string, description: string) => void;
}) {
  // State for category name and description
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Track dialog state

  // Function to handle form submission
  const handleCreateCategory = () => {
    if (!categoryName.trim()) return; // Prevent empty categories
    onCreateCategory(categoryName, categoryDescription);
    
    // Reset form fields
    setCategoryName("");
    setCategoryDescription("");

    // Close dialog
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Wrapping the entire card to act as a trigger */}
        <div 
          className="flex flex-col h-full bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-gray-400 text-sm pb-4">{subtitle}</p>
          <div className="flex-1 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4">
                <Checkbox 
                  checked={item.isSelected} 
                  onCheckedChange={() => onCategoryChange(item.id)} 
                  onClick={(e) => e.stopPropagation()} // Prevents opening the dialog
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <Button className="w-full">{buttonText}</Button>  
          </div>
        </div>
      </DialogTrigger>

      {/* The actual dialog */}
      <DialogContent>
        <DialogTitle>Add category</DialogTitle>
        
        <Input 
          placeholder="Category Name" 
          value={categoryName} 
          onChange={(e) => setCategoryName(e.target.value)} 
        />
        
        <Textarea 
          placeholder="Write a description for your category." 
          value={categoryDescription} 
          onChange={(e) => setCategoryDescription(e.target.value)} 
        />
        
        <Button className="w-full mt-4" onClick={handleCreateCategory}>
          Add category
        </Button>
      </DialogContent>
    </Dialog>
  );
}
