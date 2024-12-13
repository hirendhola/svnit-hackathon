"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const models = [
  { id: "model1", name: "Low" },
  { id: "model2", name: "Medium" },
  { id: "model3", name: "High" },
];

export default function ModelInterface() {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunModel = () => {
    if (!selectedModel || !selectedFile) {
      alert("Please select both a model and an image");
      return;
    }
    // Handle model execution here
    console.log("Running model:", selectedModel, "with file:", selectedFile);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation Bar with Bento Grid */}
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl h-">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-start">
                <Image
                  src="/kavach.jpg"
                  alt="Logo 1"
                  width={90}
                  height={70}
                  className=" rounded-full"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/isea.png"
                  alt="Logo 2"
                  width={90}
                  height={70}
                  className="rounded-full h-20 w-auto"
                />
              </div>
              <div className="flex items-center justify-end ">
                <Image
                  src="/NIT_Surat_Logo.svg.png"
                  alt="Logo 3"
                  width={90}
                  height={70}
                  className="back rounded-full"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 text-white ">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Model Selection */}
            <Card className="flex flex-col gap-4 bg-gray-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-slate-300">
                Select Model
              </h2>
              <Select onValueChange={setSelectedModel} value={selectedModel}>
                <SelectTrigger className="w-full text-white">
                  <SelectValue placeholder="Choose a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            {/* File Upload */}
            <Card className="relative flex flex-col gap-4 bg-gray-900/50 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold">Upload Image</h2>
              <div className="group relative flex min-h-[200px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-600 transition-colors hover:border-gray-500">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                {preview ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={preview}
                      width={100}
                      height={100}
                      alt="Preview"
                      className="max-h-full max-w-full rounded-lg object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Upload className="h-8 w-8" />
                    <span>Drop your image here or click to browse</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Run Model Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleRunModel}
              disabled={!selectedModel || !selectedFile}
              className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 hover:from-blue-700 hover:to-blue-800"
            >
              Run Model
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
