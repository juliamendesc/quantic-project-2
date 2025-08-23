"use client";
import React from "react";
import { useReservations } from "@/hooks";
import InputField from "@/components/InputField";

const Reservations: React.FC = () => {
  const {
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    isSubmitDisabled,
    getFieldError,
  } = useReservations();

  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <main
          className="max-w-2xl mx-auto"
          aria-labelledby="reservations-title"
        >
          <header className="text-center mb-16">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight leading-none"
              id="reservations-title"
            >
              Make a Reservation
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-3xl mx-auto leading-snug mb-6">
              Reserve your table for an unforgettable dining experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </header>

          <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-labelledby="reservations-title"
              noValidate
            >
              <InputField
                id="reservation-time"
                type="datetime-local"
                name="time"
                value={form.time}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Date and Time"
                required
                error={getFieldError("time")}
              />

              <InputField
                id="reservation-guests"
                type="number"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Number of Guests"
                required
                min={1}
                max={12}
                error={getFieldError("guests")}
              />

              <InputField
                id="reservation-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
                required
                placeholder="Enter your full name"
                error={getFieldError("name")}
              />

              <InputField
                id="reservation-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                required
                placeholder="your.email@example.com"
                error={getFieldError("email")}
              />

              <InputField
                id="reservation-phone"
                type="tel"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone (optional)"
                placeholder="+1234567890"
                error={getFieldError("phone")}
              />

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-neutral-50 font-poppins font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105 text-lg md:text-xl"
                  disabled={isSubmitDisabled}
                  aria-label="Submit reservation"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </span>
                  ) : (
                    "Reserve Your Table"
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reservations;
