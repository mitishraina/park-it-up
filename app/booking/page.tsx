"use client";
import React, { useState } from "react";
import Image from "next/image";
import ParkitUp from "./assets/Parkitup_logo.png";
import Link from "next/link";
import LOCK from "./assets/lock.svg";
import TimeSelectionDialog from "@/app/booking/components/TimeSelectionDialog";
import ContactInfoDialog from "@/app/booking/components/ContactInfoDialog";
import PaymentMethodDialog from "@/app/booking/components/PaymentMethodDialog";
import VehicleDialog from "@/app/booking/components/VehicleDialog";

interface ReservationTime {
  date: string;
  time: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  receiveSMS: boolean;
}

interface PaymentMethod {
  type: "card" | "paytm" | "googlepay";
  cardNumber?: string;
  cardName?: string;
}

interface Vehicle {
  makeModel: string;
  licensePlate: string;
  state: string;
}

const BookingPage = () => {
  const [open, setOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [reservation, setReservation] = useState({
    enterTime: { date: "Today", time: "12:00 PM" },
    exitTime: { date: "Today", time: "2:00 PM" },
  });

  const handleTimeChange = (
    newEnterTime: ReservationTime,
    newExitTime: ReservationTime
  ) => {
    setReservation({
      enterTime: newEnterTime,
      exitTime: newExitTime,
    });
  };

  const handleContactInfoChange = (newContactInfo: ContactInfo) => {
    setContactInfo(newContactInfo);
  };

  const handlePaymentMethodChange = (newPaymentMethod: PaymentMethod) => {
    setPaymentMethod(newPaymentMethod);
  };

  const handleVehicleChange = (newVehicle: Vehicle) => {
    setVehicle(newVehicle);
  };

  return (
    <div className="min-h-screen bg-[#0a121a] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
        <div className="flex justify-between items-center mb-6">
          <Image
            src={ParkitUp}
            alt="ParkItUp Logo"
            width={90}
            height={40}
            className="object-contain"
          />
          <span className="text-gray-300 text-sm font-regular flex items-center">
            <Image src={LOCK} alt="" className="size-5" />
            Secure Checkout
          </span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section - Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Guest Checkout */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex gap-2 items-center mb-4">
                <span>Checking out as a guest</span>
                <Link href="/login">
                  <span className="text-blue-500 underline">Log in</span>
                </Link>
              </div>

              {/* Reservation Period */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Reservation Period</h3>
                    <p className="text-gray-600">Pacific Mall</p>
                    <span className="text-gray-600 font-semibold">
                      {reservation.enterTime.date}, {reservation.enterTime.time}{" "}
                      → {reservation.exitTime.time}
                    </span>
                  </div>
                  <button
                    className="text-blue-600 cursor-pointer underline"
                    onClick={() => setOpen(true)}
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="py-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Contact Info</h3>
                    <p className="text-gray-600">
                      {contactInfo
                        ? `${contactInfo.email} • ${contactInfo.phone}`
                        : "None"}
                    </p>
                  </div>
                  <button
                    className="text-blue-600 border border-gray-300 w-16 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    {contactInfo ? "Change" : "Add"}
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="py-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Payment Method</h3>
                    <p className="text-gray-600">
                      {paymentMethod
                        ? paymentMethod.type === "card"
                          ? `Card ending in ${paymentMethod.cardNumber?.slice(-4)}`
                          : paymentMethod.type === "paytm"
                            ? "Paytm"
                            : "Google Pay"
                        : "None"}
                    </p>
                  </div>
                  <button
                    className="text-blue-600 border border-gray-300 w-16 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200"
                    onClick={() => setPaymentDialogOpen(true)}
                  >
                    {paymentMethod ? "Change" : "Add"}
                  </button>
                </div>
              </div>

              {/* Vehicle */}
              <div className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Vehicle</h3>
                    <p className="text-gray-600">
                      {vehicle
                        ? `${vehicle.makeModel} • ${vehicle.licensePlate} • ${vehicle.state}`
                        : "I'll add my vehicle later"}
                    </p>
                  </div>
                  <button
                    className="text-blue-600 border border-gray-300 w-16 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200"
                    onClick={() => setVehicleDialogOpen(true)}
                  >
                    {vehicle ? "Change" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Price Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-xl font-bold mb-2">₹30</div>
              <div className="text-gray-600 mb-4">Pacific Mall lot</div>

              <div className="space-y-3">
                <h3 className="font-medium">Price Breakdown</h3>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹24</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹6</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 w-full text-left">
                  Add promo code
                </button>
                <div className="flex justify-between font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>₹30</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Cancel free until start time
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Easily change or extend
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  Pay And Reserve
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By purchasing, you agree to ParkItUp's Terms and Conditions
                  and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-gray-300">
        <hr className="mb-6" />
        <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-gray-300">
          <p className="text-sm">@ParkItUp 2025 | All rights reserved.</p>
        </div>
      </div>
      {/* Dialogs */}
      <TimeSelectionDialog
        open={open}
        onOpenChange={setOpen}
        reservation={reservation}
        onTimeChange={handleTimeChange}
      />
      <ContactInfoDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        onContactInfoChange={handleContactInfoChange}
      />
      <PaymentMethodDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onPaymentMethodChange={handlePaymentMethodChange}
      />
      <VehicleDialog
        open={vehicleDialogOpen}
        onOpenChange={setVehicleDialogOpen}
        onVehicleChange={handleVehicleChange}
      />
    </div>
  );
};

export default BookingPage;
