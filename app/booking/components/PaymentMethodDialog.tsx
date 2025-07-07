import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import PAYTM from '../assets/paytm.png';
import GPAY from '../assets/gpay.png';
import GPAY_LOGO from '../assets/gpay_logo.png';

interface PaymentMethod {
  type: 'card' | 'paytm' ;
  cardNumber?: string;
  cardName?: string;
}

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentMethodChange: (paymentMethod: PaymentMethod) => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  open,
  onOpenChange,
  onPaymentMethodChange,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod['type']>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: ''
  });

  const handleConfirm = () => {
    const paymentMethod: PaymentMethod = {
      type: selectedMethod,
      ...(selectedMethod === 'card' && {
        cardNumber: cardInfo.number,
        cardName: cardInfo.name
      })
    };
    onPaymentMethodChange(paymentMethod);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            defaultValue="card"
            value={selectedMethod}
            onValueChange={(value) => setSelectedMethod(value as PaymentMethod['type'])}
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Credit or debit card</span>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="paytm" id="paytm" />
              <Label htmlFor="paytm" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <Image src={PAYTM} alt='' className='w-full h-4' />
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="googlepay" id="googlepay" />
              <Label htmlFor="googlepay" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <Image src={GPAY_LOGO} alt='' className='size-6'/>
                  {/* <Image src={GPAY} alt='' className='h-4 w-10'/> */}
                </div>
              </Label>
            </div>
          </RadioGroup>

          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Card number • MM / YY • CVC"
                  value={cardInfo.number}
                  onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  placeholder="Name on Card"
                  value={cardInfo.name}
                  onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          )}
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

export default PaymentMethodDialog;