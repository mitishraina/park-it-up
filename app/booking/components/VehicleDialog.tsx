import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';

interface Vehicle {
  makeModel: string;
  licensePlate: string;
  state: string;
}

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleChange: (vehicle: Vehicle) => void;
}

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const VehicleDialog: React.FC<VehicleDialogProps> = ({
  open,
  onOpenChange,
  onVehicleChange,
}) => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    makeModel: '',
    licensePlate: '',
    state: ''
  });

  const handleConfirm = () => {
    onVehicleChange(vehicle);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vehicle</DialogTitle>
          <p className="text-sm text-gray-500">
            Add what you know now, fill in the rest later.
            <Link href="/login" className="text-blue-600 hover:underline ml-1">
              Sign in
            </Link> to use your saved vehicles.
          </p>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Make and Model"
                value={vehicle.makeModel}
                onChange={(e) => setVehicle({ ...vehicle, makeModel: e.target.value })}
                className="w-full pl-8"
              />
              <svg
                className="w-4 h-4 absolute left-2 top-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="License Plate"
              value={vehicle.licensePlate}
              onChange={(e) => setVehicle({ ...vehicle, licensePlate: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Select
              value={vehicle.state}
              onValueChange={(value) => setVehicle({ ...vehicle, state: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a state or province" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <button
            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;