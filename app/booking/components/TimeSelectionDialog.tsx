import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReservationTime {
  date: string;
  time: string;
}

interface TimeSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: {
    enterTime: ReservationTime;
    exitTime: ReservationTime;
  };
  onTimeChange: (enterTime: ReservationTime, exitTime: ReservationTime) => void;
}

const TimeSelectionDialog: React.FC<TimeSelectionDialogProps> = ({
  open,
  onOpenChange,
  reservation,
  onTimeChange,
}) => {
  const [tempReservation, setTempReservation] = React.useState(reservation);

  const handleConfirm = () => {
    onTimeChange(tempReservation.enterTime, tempReservation.exitTime);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reservation Period</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter After</label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={tempReservation.enterTime.date}
                onValueChange={(value) => setTempReservation(prev => ({
                  ...prev,
                  enterTime: { ...prev.enterTime, date: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={tempReservation.enterTime.time}
                onValueChange={(value) => setTempReservation(prev => ({
                  ...prev,
                  enterTime: { ...prev.enterTime, time: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => {
                    const hour = i % 12 || 12;
                    const ampm = i < 12 ? 'AM' : 'PM';
                    const time = `${hour}:00 ${ampm}`;
                    return (
                      <SelectItem key={i} value={time}>{time}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Exit Before</label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={tempReservation.exitTime.date}
                onValueChange={(value) => setTempReservation(prev => ({
                  ...prev,
                  exitTime: { ...prev.exitTime, date: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={tempReservation.exitTime.time}
                onValueChange={(value) => setTempReservation(prev => ({
                  ...prev,
                  exitTime: { ...prev.exitTime, time: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => {
                    const hour = i % 12 || 12;
                    const ampm = i < 12 ? 'AM' : 'PM';
                    const time = `${hour}:00 ${ampm}`;
                    return (
                      <SelectItem key={i} value={time}>{time}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleConfirm} className='bg-blue-500'>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSelectionDialog;