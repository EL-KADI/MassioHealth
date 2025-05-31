"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Heart, Scale, Ruler } from "lucide-react"

export default function BMICalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState("")
  const [categoryColor, setCategoryColor] = useState("")

  const calculateBMI = () => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height)

    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum)
      setBmi(Number.parseFloat(bmiValue.toFixed(1)))

      // Determine BMI category and color
      if (bmiValue < 18.5) {
        setCategory("Underweight")
        setCategoryColor("text-blue-600 bg-blue-50 border-blue-200")
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory("Normal Weight")
        setCategoryColor("text-green-600 bg-green-50 border-green-200")
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory("Overweight")
        setCategoryColor("text-yellow-600 bg-yellow-50 border-yellow-200")
      } else {
        setCategory("Obese")
        setCategoryColor("text-red-600 bg-red-50 border-red-200")
      }
    }
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setBmi(null)
    setCategory("")
    setCategoryColor("")
  }

  const getBMIDescription = (category: string) => {
    switch (category) {
      case "Underweight":
        return "You may need to gain weight. Consider consulting with a healthcare provider for personalized advice."
      case "Normal Weight":
        return "Great! You have a healthy weight. Maintain your current lifestyle with balanced diet and regular exercise."
      case "Overweight":
        return "Consider adopting a healthier lifestyle with balanced nutrition and regular physical activity."
      case "Obese":
        return "It's recommended to consult with a healthcare provider for a personalized weight management plan."
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-800">MassioHealth</h1>
          </div>
          <p className="text-gray-600 text-lg">Simple, fast, and accurate BMI calculator for your health assessment</p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Calculator className="h-6 w-6" />
              BMI Calculator
            </CardTitle>
            <CardDescription>Enter your weight and height to calculate your Body Mass Index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Height (m)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height in meters"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-lg"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={calculateBMI}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-6"
                disabled={!weight || !height}
              >
                Calculate BMI
              </Button>
              <Button onClick={resetCalculator} variant="outline" className="px-6 py-6">
                Reset
              </Button>
            </div>

            {/* Results */}
            {bmi && (
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800 mb-2">{bmi}</div>
                  <div className="text-gray-600 text-lg">Your BMI Score</div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${categoryColor} text-center`}>
                  <div className="text-xl font-semibold mb-2">{category}</div>
                  <div className="text-sm opacity-90">{getBMIDescription(category)}</div>
                </div>

                {/* BMI Scale Reference */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">BMI Categories:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Underweight:</span>
                      <span className="text-blue-600 font-medium">{"< 18.5"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Normal:</span>
                      <span className="text-green-600 font-medium">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overweight:</span>
                      <span className="text-yellow-600 font-medium">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obese:</span>
                      <span className="text-red-600 font-medium">{"≥ 30.0"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            <strong>Disclaimer:</strong> This BMI calculator is for informational purposes only. Please consult with a
            healthcare professional for personalized medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
