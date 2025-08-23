import { useState, useCallback } from "react";
import { apiPost, ReservationForm, ReservationApiResponse } from "@/utils";
import { useSubmissionState } from "@/hooks/useSubmissionState";
import { useToasterContext } from "@/contexts/ToasterContext";

interface UseReservationsOptions {
  endpoint?: string;
  initialForm?: Partial<ReservationForm>;
}

const defaultForm: ReservationForm = {
  time: "",
  guests: 1,
  name: "",
  email: "",
  phone: "",
};

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

  const {
    loading,
    handleSubmissionStart,
    handleSubmissionSuccess,
    handleSubmissionError,
  } = useSubmissionState();

  const { showSuccess, showError } = useToasterContext();

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const processedValue = name === "guests" ? Number(value) : value;

      setForm((prev) => ({
        ...prev,
        [name]: processedValue,
      }));

      // Clear error when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [fieldErrors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
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

    Object.entries(form).forEach(([name, value]) => {
      const error = validateField(name, value);
      errors[name] = error;
      if (error) hasErrors = true;
    });

    setFieldErrors(errors);
    setTouchedFields(new Set(Object.keys(form)));
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
  const hasRequiredFields = Boolean(form.time && form.name && form.email);
  const hasErrors = Object.values(fieldErrors).some((error) => error !== null);
  const isSubmitDisabled = !hasRequiredFields || hasErrors || loading;

  const getFieldError = useCallback(
    (fieldName: string) => {
      return touchedFields.has(fieldName) ? fieldErrors[fieldName] : null;
    },
    [fieldErrors, touchedFields]
  );

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

    // Computed values
    guestOptions: Array.from({ length: 12 }, (_, i) => i + 1),
  };
};
