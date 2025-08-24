"use client";
import React from "react";
import { useReservations } from "@/hooks";
import InputField from "@/components/InputField";
import { STATIC_CONTENT } f              <InputField
                id="reservation-phone"
                type="tel"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone (optional)"
                placeholder="+1234567890"
                error={getFieldError("phone")}
              />tants";

const Reservations: React.FC = () => {
  const {
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    isSubmitDisabled,
    getFieldError,
    getAvailableTimeSlots,
    loadingAvailability,
  } = useReservations();

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

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
              {STATIC_CONTENT.reservations.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-3xl mx-auto leading-snug mb-6">
              {STATIC_CONTENT.reservations.subtitle}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="reservation-date"
                    className="block text-sm font-medium text-primary-900 dark:text-accent-200"
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reservation-date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    min={today}
                    className="w-full h-12 px-4 py-3 border border-primary-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-neutral-700 text-primary-900 dark:text-accent-200 transition-all duration-200"
                  />
                  {getFieldError("date") && (
                    <p className="text-red-500 text-sm mt-1">
                      {getFieldError("date")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="reservation-timeSlot"
                    className="block text-sm font-medium text-primary-900 dark:text-accent-200"
                  >
                    Time Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reservation-timeSlot"
                    name="timeSlot"
                    value={form.timeSlot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={loadingAvailability || !form.date}
                    className="w-full h-12 px-4 py-3 border border-primary-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-neutral-700 text-primary-900 dark:text-accent-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {loadingAvailability
                        ? "Loading available times..."
                        : !form.date
                        ? "Please select a date first"
                        : "Select a time slot"}
                    </option>
                    {getAvailableTimeSlots().map((slot) => (
                      <option
                        key={slot.value}
                        value={slot.value}
                        disabled={slot.disabled}
                        style={
                          slot.disabled
                            ? {
                                color: "#9CA3AF",
                                fontStyle: "italic",
                                backgroundColor: "#F3F4F6",
                              }
                            : {}
                        }
                      >
                        {slot.label}
                      </option>
                    ))}
                  </select>
                  {getFieldError("timeSlot") && (
                    <p className="text-red-500 text-sm mt-1">
                      {getFieldError("timeSlot")}
                    </p>
                  )}
                </div>
              </div>

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
                label="Telefone (opcional)"
                placeholder="+5511987654321"
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
