"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ChooseRolePage() {
  const [selectedRole, setSelectedRole] = useState<"agent" | "member">("agent")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleProceed = () => {
    setIsLoading(true)
    
    // Simulate a brief loading state before navigation
    setTimeout(() => {
      if (selectedRole === "agent") {
        router.push("/agent-dashboard")
      } else {
        router.push("/member-dashboard")
      }
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5f0] p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Choose your role</h1>
          <p className="text-sm text-gray-600">How will you use MyAjo?</p>
        </div>

        <RadioGroup
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as "agent" | "member")}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex h-6 items-center">
              <RadioGroupItem value="agent" id="agent" className="h-5 w-5 border-2 border-[#8B5A2B] text-[#8B5A2B]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent" className="font-medium">
                As an Ajo Agent
              </Label>
              {selectedRole === "agent" && (
                <p className="text-sm text-gray-600">
                  You&apos;ll be able to create a savings group, invite members, set contribution details, and manage
                  how the money rotates.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-6 items-center">
              <RadioGroupItem value="member" id="member" className="h-5 w-5 border-2 border-[#8B5A2B] text-[#8B5A2B]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member" className="font-medium">
                As an Ajo Member
              </Label>
              {selectedRole === "member" && (
                <p className="text-sm text-gray-600">
                  Join a group using a referral code from a trusted admin. Contribute regularly, and when it&apos;s your
                  turn, get your payout automatically.
                </p>
              )}
            </div>
          </div>
        </RadioGroup>

        <Button
          className="w-full bg-[#8B5A2B] py-6 text-white hover:bg-[#7a4f26]"
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            `Proceed as ${selectedRole === "agent" ? "an Agent" : "a Member"}`
          )}
        </Button>
      </div>
    </div>
  )
}
