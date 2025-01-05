"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeetingStore } from "@/hooks/useMeetingStore";

const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  // Add more country codes as needed
];

export default function PhoneInput() {
  const [countryCode, setCountryCode] = useState("+1");
  const [localNumber, setLocalNumber] = useState("");
  const setPhoneNumber = useMeetingStore((state) => state.setPhoneNumber);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setLocalNumber(value);
    setPhoneNumber(`${countryCode}${value}`);
  };

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
    setPhoneNumber(`${value}${localNumber}`);
  };

  return (
    <div className="flex space-x-2">
      <Select value={countryCode} onValueChange={handleCountryCodeChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent>
          {COUNTRY_CODES.map(({ code, country }) => (
            <SelectItem key={code} value={code}>
              {code} {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder="Phone number"
        value={localNumber}
        onChange={handleNumberChange}
        className="flex-1"
      />
    </div>
  );
}
