import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ContactInfo {
  email: string;
  phone: string;
  receiveSMS: boolean;
}

interface ContactInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactInfoChange: (contactInfo: ContactInfo) => void;
}

const ContactInfoDialog: React.FC<ContactInfoDialogProps> = ({
  open,
  onOpenChange,
  onContactInfoChange,
}) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    receiveSMS: true
  });

  const handleConfirm = () => {
    onContactInfoChange(contactInfo);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Email Address"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="phone"
              placeholder="Phone"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#3B82F6"
                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                  />
                </svg>
                <span className="font-medium">Texts from ParkItUp</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You'll receive SMS messages from ParkItUp about your reservation.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Message & data rates may apply. Message frequency varies. Reply STOP to opt out or HELP for help.
              </p>
              <p className="text-xs text-gray-400">
                If you already opted out, you won't receive these messages.
              </p>
            </div>
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

export default ContactInfoDialog;