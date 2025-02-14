<template>
  <div class="fixed top-0 left-0">
    <ThemeToggle />
  </div>
  <div
    class="min-h-screen bg-white dark:bg-gray-800 dark:text-white transition__custom"
  >
    <div
      class="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden transition__custom"
    >
      <div class="md:px-[63px] px-5 md:pt-10 pt-8">
        <nuxt-link to="/">
          <img src="/images/logo.svg" alt="logo" class="mb-14" />
        </nuxt-link>
        <h2
          class="md:text-4xl text-3xl font-bold text-orange-600 mb-4 text-center"
        >
          Create New Account
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-6 md:px-[63px]">
          <div class="mb-4 mt-10">
            <label for="firstName" class="form-label">First Name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="Enter First Name"
              class="form-input"
              :class="{
                'border-red-500': errors.firstName,
                'border-gray-300': !errors.firstName,
              }"
            />
            <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
              {{ errors.firstName }}
            </p>
          </div>

          <div class="mb-4">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Enter Last Name"
              class="form-input"
              :class="{
                'border-red-500': errors.lastName,
                'border-gray-300': !errors.lastName,
              }"
            />
            <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
              {{ errors.lastName }}
            </p>
          </div>

          <div class="mb-4">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter a Valid Email"
              class="form-input"
              :class="{
                'border-red-500': errors.email,
                'border-gray-300': !errors.email,
              }"
            />
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter Password"
                class="form-input pr-10"
                :class="{
                  'border-red-500': errors.password,
                  'border-gray-300': !errors.password,
                }"
              />
              <button
                type="button"
                @click="togglePasswordVisibility('password')"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-500" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">
              {{ errors.password }}
            </p>
          </div>

          <div class="mb-4">
            <label for="confirmPassword" class="form-label"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Re-enter Password"
                class="form-input pr-10"
                :class="{
                  'border-red-500': errors.confirmPassword,
                  'border-gray-300': !errors.confirmPassword,
                }"
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
            <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <div class="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="terms"
              v-model="agreeToTerms"
              class="form-checkbox h-5 w-5 text-orange-600 accent-orange-600"
            />
            <label for="terms" class="text-sm text-gray-700 dark:text-white"
              >I agree with the terms and conditions and also the protection of
              my personal data on this application</label
            >
          </div>
          <button
            type="submit"
            class="w-full bg-orange-600 text-white py-5 rounded-2xl hover:bg-orange-700"
          >
            Sign Up
          </button>
        </form>
        <div class="mt-10 md:mb-0 mb-10 space-y-10">
          <div class="flex items-center gap-6">
            <div class="h-0.5 w-full bg-primary-500" />
            <span class="text-primary-500 text-sm whitespace-nowrap"
              >or continue with</span
            >
            <div class="h-0.5 w-full bg-primary-500" />
          </div>
          <div class="flex items center justify-center">
            <div class="flex items-center space-x-20">
              <nuxt-link to="">
                <img src="/images/google_symbol.svg.svg" alt="google-icon" />
              </nuxt-link>
              <nuxt-link to="">
                <img src="/images/apple_logo.svg.svg" alt="apple-icon" />
              </nuxt-link>
              <nuxt-link to="">
                <img
                  src="/images/facebook_symbol.svg.svg"
                  alt="facebook-icon"
                />
              </nuxt-link>
            </div>
          </div>
          <p class="text-center">
            Existing user?
            <nuxt-link class="text-primary-500" href="/auth/login"
              >Log in</nuxt-link
            >
          </p>
        </div>
      </div>
      <div class="hidden md:block bg-orange-50">
        <img src="/images/customer-signup.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";

const { $toaster } = useNuxtApp();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = ref({});
const agreeToTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const validateForm = () => {
  errors.value = {};
  for (const key in form.value) {
    if (!form.value[key]) {
      errors.value[key] =
        `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
  }
  if (
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password !== form.value.confirmPassword
  ) {
    errors.value.confirmPassword = "Passwords do not match";
  }
  if (!agreeToTerms.value) {
    errors.value.terms = "You must agree to the terms and conditions";
  }
};

const handleSubmit = () => {
  validateForm();
  if (Object.keys(errors.value).length === 0) {
    $toaster.show("Signup Successful", "success");
  } else {
    $toaster.show("Please correct the errors before submitting.", "error");
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
input {
  transition: border 0.3s ease;
}
</style>
