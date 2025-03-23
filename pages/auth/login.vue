<template>
  <div
    class="min-h-screen bg-white dark:bg-gray-800 dark:text-white transition-all duration-300"
  >
    <div class="fixed top-0 left-0">
      <ThemeToggle />
    </div>
    <div class="w-full max-w-[1440px] mx-auto px-5 py-8 md:py-10">
      <div class="mb-10">
        <nuxt-link to="/" class="inline-block">
          <h1 class="text-3xl font-bold">GlamConnect</h1>
        </nuxt-link>
      </div>

      <div class="flex items-center justify-between mb-10">
        <nuxt-link
          to="#"
          @click.prevent="goBack"
          class="mr-8 flex items-center justify-center space-x-3"
        >
          <ArrowLeftIcon class="h-6 w-6" />
          <span class="">Back</span>
        </nuxt-link>

        <div class="flex items-center space-x-4 flex-grow max-w-2xl"></div>
        <div></div>
      </div>

      <!-- Form Content -->
      <div class="max-w-xl mx-auto">
        <transition name="fade" mode="out-in">
          <!-- Step 1: Personal Information -->
          <div class="animate-fadeIn">
            <h2 class="text-3xl font-bold mb-8">Welcome Back</h2>

            <div class="space-y-6">
              <div>
                <label for="email" class="block mb-2 font-medium"
                  >Email Address</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="example@mail"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                  {{ errors.email }}
                </p>
              </div>
              <div>
                <label for="password" class="block mb-2 font-medium"
                  >Password</label
                >
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100 pr-10"
                    :class="{ 'border-red-500': errors.password }"
                    @input="checkPasswordStrength"
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility('password')"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <EyeIcon
                      v-if="!showPassword"
                      class="h-5 w-5 text-gray-500"
                    />
                    <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                  {{ errors.password }}
                </p>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    class="h-5 w-5 accent-orange-500 text-white"
                  />
                  <label for="remember">Remember Me</label>
                </div>
                <nuxt-link
                  to="/auth/forgot-password"
                  class="text-orange-600 hover:underline underline-offset-4"
                  >Forgot Password?</nuxt-link
                >
              </div>

              <div class="pt-4">
                <button
                  @click="handleSubmit"
                  class="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="max-w-2xl mx-auto mt-10 space-y-6">
        <div class="flex items-center gap-6">
          <div class="h-0.5 w-full bg-gray-300"></div>
          <span class="text-gray-500 text-sm whitespace-nowrap"
            >or continue with</span
          >
          <div class="h-0.5 w-full bg-gray-300"></div>
        </div>

        <div class="flex items-center justify-center space-x-10">
          <nuxt-link
            to="#"
            class="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img
              src="/images/google_symbol.svg.svg"
              alt="google-icon"
              class="h-6 w-6"
            />
          </nuxt-link>
          <nuxt-link
            to="#"
            class="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img
              src="/images/apple_logo.svg.svg"
              alt="apple-icon"
              class="h-6 w-6"
            />
          </nuxt-link>
          <nuxt-link
            to="#"
            class="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img
              src="/images/facebook_symbol.svg.svg"
              alt="facebook-icon"
              class="h-6 w-6"
            />
          </nuxt-link>
        </div>

        <p class="text-center">
          Don't have an account?
          <nuxt-link to="/auth/register" class="text-orange-600 hover:underline"
            >Sign up</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-vue-next";

const { $toaster } = useNuxtApp();

const currentStep = ref(1);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = reactive({
  // Personal Information
  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  // Business Information
  brand: "",
  location: "",
  businessEmail: "",
  specialization: "",

  // Security Information
  password: "",
  confirmPassword: "",
});

const errors = ref({});
const agreeToTerms = ref(true);

const passwordChecks = reactive({
  length: false,
  special: false,
  number: false,
  cases: false,
});

const checkPasswordStrength = () => {
  const password = form.password;
  passwordChecks.length = password.length >= 8;
  passwordChecks.special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password,
  );
  passwordChecks.number = /\d/.test(password);
  passwordChecks.cases = /[a-z]/.test(password) && /[A-Z]/.test(password);
};

const validateStep = (step) => {
  errors.value = {};

  if (step === 1) {
    if (!form.firstName) errors.value.firstName = "First Name is required";
    if (!form.lastName) errors.value.lastName = "Last Name is required";
    if (!form.email) errors.value.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      errors.value.email = "Please enter a valid email";
    if (!form.phone) errors.value.phone = "Phone Number is required";

    return Object.keys(errors.value).length === 0;
  } else if (step === 2) {
    if (!form.brand) errors.value.brand = "Business Name is required";
    if (!form.location) errors.value.location = "Location is required";
    if (!form.businessEmail)
      errors.value.businessEmail = "Business Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.businessEmail))
      errors.value.businessEmail = "Please enter a valid email";
    if (!form.specialization)
      errors.value.specialization = "Specialization is required";

    return Object.keys(errors.value).length === 0;
  } else if (step === 3) {
    if (!form.password) {
      errors.value.password = "Password is required";
    } else {
      if (!passwordChecks.length)
        errors.value.password = "Password must be at least 8 characters";
      else if (!passwordChecks.special)
        errors.value.password =
          "Password must include at least 1 special character";
      else if (!passwordChecks.number)
        errors.value.password = "Password must include at least 1 number";
      else if (!passwordChecks.cases)
        errors.value.password =
          "Password must include both uppercase and lowercase letters";
    }

    if (!form.confirmPassword) {
      errors.value.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      errors.value.confirmPassword = "Passwords do not match";
    }

    return Object.keys(errors.value).length === 0;
  }

  return true;
};

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    currentStep.value++;
  } else {
    $toaster?.show("Please correct the errors before continuing.", "error");
  }
};

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSubmit = () => {
  if (validateStep(currentStep.value)) {
    $toaster?.show("Registration Successful", "success");
    currentStep.value = 4;
  } else {
    $toaster?.show("Please correct the errors before submitting.", "error");
  }
};

const togglePasswordVisibility = (field) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  } else if (field === "confirmPassword") {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500;
}

.form-checkbox {
  @apply rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transition__custom {
  transition: all 0.3s ease;
}
</style>
