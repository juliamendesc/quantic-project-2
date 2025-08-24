import { useState, useCallback, useEffect } from "react";
import {
  apiPost,
  apiGet,
  ReservationForm,
  ReservationApiResponse,
} from "@/utils";
import { useSubmissionState } from "@/hooks/useSubmissionState";
import { useToasterContext } from "@/contexts/ToasterContext";

interface UseReservationsOptions {
  endpoint?: string;
  initialForm?: Partial<ReservationForm>;
}

const defaultForm: ReservationForm = {
  time: "",
  date: "",
  timeSlot: "",
  guests: 1,
  name: "",
  email: "",
  phone: "",
};

// Time slot generation functions
const generateTimeSlots = () => {
  // Monday-Saturday: 5:00 PM – 11:00 PM (17:00 - 23:00)
  // Sunday: 5:00 PM – 9:00 PM (17:00 - 21:00)
  const weekdaySlots = [];
  const sundaySlots = [];

  // Generate weekday slots (17:00 - 22:30, last slot at 22:30)
  for (let hour = 17; hour < 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      weekdaySlots.push({ value: timeString, label: timeString });
    }
  }

  // Generate Sunday slots (17:00 - 20:30, last slot at 20:30)
  for (let hour = 17; hour < 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      sundaySlots.push({ value: timeString, label: timeString });
    }
  }

  return { weekdaySlots, sundaySlots };
};

const { weekdaySlots, sundaySlots } = generateTimeSlots();

// Validation rules
const validateField = (name: string, value: string | number): string | null => {
  switch (name) {
    case "time":
      if (!value || value === "") return "Date and time is required";
      // Check if date is in the future
      const selectedDate = new Date(value as string);
      const now = new Date();
      if (selectedDate <= now) return "Please select a future date and time";
      return null;

    case "date":
      if (!value || value === "") return "Date is required";
      const selectedDateOnly = new Date(value as string);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDateOnly < today)
        return "Please select today or a future date";
      return null;

    case "timeSlot":
      if (!value || value === "") return "Time slot is required";
      return null;

    case "name":
      if (!value || (value as string).trim() === "") return "Name is required";
      if ((value as string).length < 2)
        return "Name must be at least 2 characters";
      return null;

    case "email":
      if (!value || (value as string).trim() === "") return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string))
        return "Please enter a valid email address";
      return null;

    case "guests":
      const guests = Number(value);
      if (guests < 1) return "At least 1 guest is required";
      if (guests > 12) return "Maximum 12 guests allowed";
      return null;

    case "phone":
      // Phone is optional, but if provided should be valid
      if (value && (value as string).trim() !== "") {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!(value as string).match(phoneRegex))
          return "Please enter a valid phone number";
      }
      return null;

    default:
      return null;
  }
};

export const useReservations = (options: UseReservationsOptions = {}) => {
  const { endpoint = "/api/reservations", initialForm = {} } = options;

  const [form, setForm] = useState<ReservationForm>({
    ...defaultForm,
    ...initialForm,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>(
    {}
  );
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const {
    loading,
    handleSubmissionStart,
    handleSubmissionSuccess,
    handleSubmissionError,
  } = useSubmissionState();

  const { showSuccess, showError } = useToasterContext();

  // Fetch availability for a specific date
  const fetchAvailability = useCallback(async (date: string) => {
    if (!date) {
      setUnavailableSlots([]);
      return;
    }

    setLoadingAvailability(true);
    try {
      const response = await apiGet<{ unavailableTimeSlots: string[] }>(
        `/api/availability?date=${date}`
      );
      setUnavailableSlots(response.unavailableTimeSlots || []);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setUnavailableSlots([]);
    } finally {
      setLoadingAvailability(false);
    }
  }, []);

  // Effect to fetch availability when date changes
  useEffect(() => {
    if (form.date) {
      fetchAvailability(form.date);
    }
  }, [form.date, fetchAvailability]);

  const updateForm = useCallback((updates: Partial<ReservationForm>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const validateSingleField = useCallback(
    (name: string, value: string | number) => {
      const error = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
      return error;
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const processedValue = name === "guests" ? Number(value) : value;

      setForm((prev) => {
        const newForm = {
          ...prev,
          [name]: processedValue,
        };

        // Automatically combine date and timeSlot into time field
        if (name === "date" || name === "timeSlot") {
          const date = name === "date" ? value : prev.date;
          const timeSlot = name === "timeSlot" ? value : prev.timeSlot;

          if (date && timeSlot) {
            newForm.time = `${date}T${timeSlot}`;
          } else {
            newForm.time = "";
          }
        }

        return newForm;
      });

      // Clear error when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [fieldErrors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const processedValue = name === "guests" ? Number(value) : value;

      setTouchedFields((prev) => new Set(prev).add(name));
      validateSingleField(name, processedValue);
    },
    [validateSingleField]
  );

  const resetForm = useCallback(() => {
    setForm({ ...defaultForm, ...initialForm });
    setFieldErrors({});
    setTouchedFields(new Set());
  }, [initialForm]);

  const validateAllFields = useCallback(() => {
    const errors: Record<string, string | null> = {};
    let hasErrors = false;

    // Skip validation for 'time' as it's auto-generated from date + timeSlot
    const fieldsToValidate = Object.entries(form).filter(
      ([name]) => name !== "time"
    );

    fieldsToValidate.forEach(([name, value]) => {
      const error = validateField(name, value);
      errors[name] = error;
      if (error) hasErrors = true;
    });

    setFieldErrors(errors);
    setTouchedFields(
      new Set(Object.keys(form).filter((name) => name !== "time"))
    );
    return !hasErrors;
  }, [form]);

  const submitReservation = useCallback(async () => {
    const isValid = validateAllFields();

    if (!isValid) {
      showError("Please fix the errors below before submitting.");
      return false;
    }

    handleSubmissionStart();

    try {
      const data = await apiPost<ReservationApiResponse>(endpoint, form);
      handleSubmissionSuccess(
        data.message || "Reservation submitted successfully!"
      );
      showSuccess("Reservation submitted successfully!");
      resetForm();
      return true;
    } catch {
      const errorMsg = "Error submitting reservation. Please try again.";
      handleSubmissionError(errorMsg);
      showError(errorMsg);
      return false;
    }
  }, [
    form,
    endpoint,
    validateAllFields,
    handleSubmissionStart,
    handleSubmissionSuccess,
    handleSubmissionError,
    resetForm,
    showSuccess,
    showError,
  ]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      return await submitReservation();
    },
    [submitReservation]
  );

  // Computed properties
  const hasRequiredFields = Boolean(
    form.date && form.timeSlot && form.name && form.email
  );
  const hasErrors = Object.values(fieldErrors).some((error) => error !== null);
  const isSubmitDisabled = !hasRequiredFields || hasErrors || loading;

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touchedFields.has(fieldName) ? fieldErrors[fieldName] : null;
    },
    [fieldErrors, touchedFields]
  );

  const getAvailableTimeSlots = useCallback(() => {
    if (!form.date) return [];

    const selectedDate = new Date(form.date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get base slots based on day of week
    let baseSlots;
    if (dayOfWeek === 0) {
      baseSlots = sundaySlots;
    } else {
      baseSlots = weekdaySlots;
    }

    // Filter out unavailable slots and mark them as disabled
    return baseSlots.map((slot) => ({
      ...slot,
      disabled: unavailableSlots.includes(slot.value),
      label: unavailableSlots.includes(slot.value)
        ? `${slot.label} (Unavailable)`
        : slot.label,
    }));
  }, [form.date, unavailableSlots]);

  return {
    // Form state
    form,
    setForm,
    updateForm,
    resetForm,

    // Form handlers
    handleChange,
    handleBlur,
    handleSubmit,
    submitReservation,

    // Validation
    fieldErrors,
    touchedFields,
    getFieldError,
    validateSingleField,
    validateAllFields,
    hasRequiredFields,
    hasErrors,
    isSubmitDisabled,

    // Submission state
    loading,

    // Availability state
    loadingAvailability,
    unavailableSlots,

    // Computed values
    guestOptions: Array.from({ length: 12 }, (_, i) => i + 1),
    getAvailableTimeSlots,
  };
};
