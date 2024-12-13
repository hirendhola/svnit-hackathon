"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";

interface PredictionData {
  prediction: string;
  confidence: number;
}

export default function ImagePrediction() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call - replace with actual backend call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setImageUrl("/placeholder.svg");
        setPredictionData({
          prediction: "Cat",
          confidence: 80,
        });
      } catch (error) {
        console.error("Error fetching prediction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white shadow-xl">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-center">
            Image Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-center items-center gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-700">
              {loading || !imageUrl ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-16 w-16 text-gray-500" />
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt="Predicted Image"
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 hover:scale-105"
                />
              )}
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-700">
              {loading || !imageUrl ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-16 w-16 text-gray-500" />
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt="Predicted Image"
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 hover:scale-105"
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-400">
                Prediction
              </div>
              {loading ? (
                <Skeleton className="h-8 w-full bg-gray-700" />
              ) : (
                <div className="text-2xl font-bold">
                  {predictionData?.prediction}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">
                  Confidence
                </span>
                {loading ? (
                  <Skeleton className="h-6 w-16 bg-gray-700" />
                ) : (
                  <span className="text-lg font-bold">
                    {predictionData?.confidence}%
                  </span>
                )}
              </div>
              {loading ? (
                <Skeleton className="h-2 w-full bg-gray-700" />
              ) : (
                <Progress
                  value={predictionData?.confidence}
                  className="h-2 bg-gray-700"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
