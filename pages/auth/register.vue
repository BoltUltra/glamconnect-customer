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

      <!-- Progress Steps -->
      <div class="flex items-center justify-between mb-10">
        <nuxt-link to="#" @click.prevent="goBack" class="mr-8">
          <ArrowLeftIcon class="h-6 w-6" />
          <span class="sr-only">Back</span>
        </nuxt-link>

        <div class="flex items-center space-x-4 flex-grow max-w-2xl">
          <div
            class="flex items-center justify-center rounded-full h-8 w-8 text-white"
            :class="
              currentStep === 1
                ? 'bg-orange-600'
                : 'bg-orange-50 !text-orange-600'
            "
          >
            1
          </div>
          <span
            class="text-sm md:text-base"
            :class="currentStep === 1 ? 'text-orange-600 font-medium' : ''"
          >
            Personal Information
          </span>

          <div class="flex-grow h-px bg-orange-50 !text-orange-600"></div>

          <div
            class="flex items-center justify-center rounded-full h-8 w-8 text-white"
            :class="
              currentStep === 2
                ? 'bg-orange-600'
                : 'bg-orange-50 !text-orange-600'
            "
          >
            2
          </div>
          <span
            class="text-sm md:text-base"
            :class="currentStep === 2 ? 'text-orange-600 font-medium' : ''"
          >
            Security Information
          </span>
        </div>
        <div></div>
      </div>

      <!-- Form Content -->
      <div class="max-w-2xl mx-auto">
        <transition name="fade" mode="out-in">
          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1" key="personal" class="animate-fadeIn">
            <h2 class="text-3xl font-bold mb-2">Personal Information</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8">
              Please Fill the necessary information Below
            </p>

            <div class="space-y-6">
              <div>
                <label for="firstName" class="block mb-2 font-medium"
                  >First Name</label
                >
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  placeholder="Jane"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100"
                  :class="{ 'border-red-500': errors.firstName }"
                />
                <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label for="lastName" class="block mb-2 font-medium"
                  >Second Name</label
                >
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  placeholder="Doe"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100"
                  :class="{ 'border-red-500': errors.lastName }"
                />
                <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
                  {{ errors.lastName }}
                </p>
              </div>

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
                <label for="phone" class="block mb-2 font-medium"
                  >Phone Number</label
                >
                <input
                  id="phone"
                  v-model="form.phone"
                  type="text"
                  placeholder="+1245500974"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100"
                  :class="{ 'border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                  {{ errors.phone }}
                </p>
              </div>

              <div class="pt-4">
                <button
                  @click="nextStep"
                  class="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <!-- Step 3: Security Information -->
          <div
            v-else-if="currentStep === 2"
            key="security"
            class="animate-fadeIn"
          >
            <h2 class="text-3xl font-bold mb-2">Password</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8">
              Input a password you can remember
            </p>

            <div class="space-y-6">
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

                <!-- Password Requirements -->
                <div
                  class="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300"
                >
                  <p :class="{ 'text-green-500': passwordChecks.length }">
                    *Must be at least 8 characters
                  </p>
                  <p :class="{ 'text-green-500': passwordChecks.special }">
                    *Must include at least 1 special character
                  </p>
                  <p :class="{ 'text-green-500': passwordChecks.number }">
                    *Must include at least 1 numerical character
                  </p>
                  <p :class="{ 'text-green-500': passwordChecks.cases }">
                    *Must include upper case and lower case
                  </p>
                </div>

                <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                  {{ errors.password }}
                </p>
              </div>

              <div>
                <label for="confirmPassword" class="block mb-2 font-medium"
                  >Confirm Password</label
                >
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100 pr-10"
                    :class="{ 'border-red-500': errors.confirmPassword }"
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility('confirmPassword')"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <EyeIcon
                      v-if="!showConfirmPassword"
                      class="h-5 w-5 text-gray-500"
                    />
                    <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <p
                  v-if="errors.confirmPassword"
                  class="text-red-500 text-sm mt-1"
                >
                  {{ errors.confirmPassword }}
                </p>
              </div>

              <div class="pt-4">
                <button
                  @click="handleSubmit"
                  class="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors duration-300"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Final Step: Success Message (optional) -->
        <div v-if="currentStep === 4" class="text-center py-10 animate-fadeIn">
          <CheckCircleIcon class="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 class="text-2xl font-bold mb-2">Registration Successful!</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Your account has been created successfully.
          </p>
          <nuxt-link to="/auth/login" class="text-orange-600 hover:underline">
            Go to Login
          </nuxt-link>
        </div>
      </div>

      <!-- Social Login Options (only on first step) -->
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
          Existing user?
          <nuxt-link to="/auth/login" class="text-orange-600 hover:underline"
            >Log in</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
} from "lucide-vue-next";

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
