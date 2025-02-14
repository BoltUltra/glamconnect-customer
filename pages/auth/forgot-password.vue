<template>
  <div class="fixed top-0 left-0">
    <ThemeToggle />
  </div>
  <div
    class="bg-white dark:bg-gray-800 dark:text-white transition__custom h-screen flex items-center justify-center"
  >
    <div class="w-full max-w-[1440px] mx-auto transition__custom">
      <div class="md:px-[63px] px-5 md:pt-10 pt-8 max-w-2xl mx-auto">
        <nuxt-link to="/">
          <img src="/images/logo.svg" alt="logo" class="mb-14" />
        </nuxt-link>
        <div
          class="bg-[#8C652B14] md:pt-40 pt-20 md:pb-16 pb-10 rounded-2xl md:px-0 px-5"
        >
          <Transition name="fade" mode="out-in">
            <!-- Email Input Step -->
            <div v-if="currentStep === 'email'" key="email">
              <h2
                class="md:text-5xl text-3xl font-bold text-orange-600 text-center mb-10"
              >
                Forgot Password!<br /><span
                  class="text-sm text-neutral-900 dark:text-neutral-200 font-light"
                  >We will email you a code to reset your password</span
                >
              </h2>

              <form
                @submit.prevent="handleEmailSubmit"
                class="space-y-8 md:px-[63px]"
              >
                <div class="mb-4">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Enter your Email"
                    class="form-input w-full py-5 px-4 rounded-2xl border"
                    :class="{
                      'border-red-500': emailError,
                      'border-gray-300 dark:border-gray-600': !emailError,
                    }"
                  />
                  <p v-if="emailError" class="text-red-500 text-xs mt-1">
                    {{ emailError }}
                  </p>
                </div>

                <button
                  type="submit"
                  class="w-full bg-orange-600 text-white py-5 rounded-2xl hover:bg-orange-700 transition duration-300"
                >
                  Next
                </button>
              </form>
            </div>

            <!-- OTP Verification Step -->
            <div v-else-if="currentStep === 'otp'" key="otp">
              <h2
                class="md:text-5xl text-3xl font-bold text-orange-600 text-center mb-10"
              >
                Enter OTP<br /><span
                  class="text-sm text-neutral-900 dark:text-neutral-200 font-light"
                  >Please enter the 6-digit code sent to your email</span
                >
              </h2>

              <form
                @submit.prevent="handleOtpSubmit"
                class="space-y-8 md:px-[63px]"
              >
                <div class="flex justify-between mb-4">
                  <input
                    v-for="(digit, index) in 6"
                    :key="index"
                    v-model="otpDigits[index]"
                    type="text"
                    maxlength="1"
                    class="w-12 h-12 text-center text-2xl border rounded-lg focus:border-orange-600 focus:ring-1 focus:ring-orange-600 font-bold text-primary-600"
                    :ref="
                      (el) => {
                        if (el) otpInputs[index] = el;
                      }
                    "
                    @input="handleOtpInput(index)"
                    @keydown="handleOtpKeydown(index, $event)"
                  />
                </div>
                <p v-if="otpError" class="text-red-500 text-xs mt-1">
                  {{ otpError }}
                </p>

                <button
                  type="submit"
                  class="w-full bg-orange-600 text-white py-5 rounded-2xl hover:bg-orange-700 transition duration-300"
                >
                  Verify OTP
                </button>
              </form>

              <p class="text-center mt-4">
                Didn't receive the code?
                <button
                  @click="resendOtp"
                  class="text-orange-600 hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>

            <!-- New Password Step -->
            <div v-else-if="currentStep === 'newPassword'" key="newPassword">
              <h2
                class="md:text-5xl text-3xl font-bold text-orange-600 text-center mb-10"
              >
                Set New Password<br /><span
                  class="text-sm text-neutral-900 dark:text-neutral-200 font-light"
                  >Please enter your new password</span
                >
              </h2>

              <form
                @submit.prevent="handleNewPasswordSubmit"
                class="space-y-8 md:px-[63px]"
              >
                <div class="mb-4 relative">
                  <input
                    id="newPassword"
                    v-model="newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    placeholder="New Password"
                    class="form-input w-full py-5 px-4 rounded-2xl border pr-10"
                    :class="{
                      'border-red-500': newPasswordError,
                      'border-gray-300 dark:border-gray-600': !newPasswordError,
                    }"
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility('newPassword')"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <EyeIcon
                      v-if="!showNewPassword"
                      class="h-5 w-5 text-gray-500"
                    />
                    <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
                  </button>
                  <p v-if="newPasswordError" class="text-red-500 text-xs mt-1">
                    {{ newPasswordError }}
                  </p>
                </div>

                <div class="mb-4 relative">
                  <input
                    id="confirmNewPassword"
                    v-model="confirmNewPassword"
                    :type="showConfirmNewPassword ? 'text' : 'password'"
                    placeholder="Confirm New Password"
                    class="form-input w-full py-5 px-4 rounded-2xl border pr-10"
                    :class="{
                      'border-red-500': confirmNewPasswordError,
                      'border-gray-300 dark:border-gray-600':
                        !confirmNewPasswordError,
                    }"
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility('confirmNewPassword')"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <EyeIcon
                      v-if="!showConfirmNewPassword"
                      class="h-5 w-5 text-gray-500"
                    />
                    <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
                  </button>
                  <p
                    v-if="confirmNewPasswordError"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ confirmNewPasswordError }}
                  </p>
                </div>

                <!-- Password Strength Indicators -->
                <div class="space-y-2">
                  <li
                    :class="{
                      'text-orange-600': hasSpecialChar,
                      'text-black dark:text-white': !hasSpecialChar,
                    }"
                  >
                    At least 1 special character
                  </li>
                  <li
                    :class="{
                      'text-orange-600': hasNumber,
                      'text-black dark:text-white': !hasNumber,
                    }"
                  >
                    At least 1 number
                  </li>
                  <li
                    :class="{
                      'text-orange-600': hasUpperCase,
                      'text-black dark:text-white': !hasUpperCase,
                    }"
                  >
                    At least 1 upper case
                  </li>
                  <li
                    :class="{
                      'text-orange-600': hasLowerCase,
                      'text-black dark:text-white': !hasLowerCase,
                    }"
                  >
                    At least 1 lowercase
                  </li>
                  <li
                    :class="{
                      'text-orange-600': hasMinLength,
                      'text-black dark:text-white': !hasMinLength,
                    }"
                  >
                    At least 8 characters
                  </li>
                </div>

                <button
                  type="submit"
                  class="w-full bg-orange-600 text-white py-5 rounded-2xl hover:bg-orange-700 transition duration-300"
                >
                  Reset Password
                </button>
              </form>
            </div>
            <!-- Success Step -->
            <div v-else-if="currentStep === 'success'" key="success">
              <h2
                class="md:text-5xl text-3xl font-bold text-orange-600 text-center mb-10"
              >
                Password Reset Successful!<br /><span
                  class="text-sm text-neutral-900 dark:text-neutral-200 font-light"
                  >Your password has been reset successfully</span
                >
              </h2>

              <div class="text-center">
                <button
                  @click="goToLogin"
                  class="bg-orange-600 text-white py-5 px-10 rounded-2xl hover:bg-orange-700 transition duration-300"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </Transition>

          <div class="mt-10 md:mb-0 mb-20 space-y-10">
            <p class="text-center">
              Remember password?
              <nuxt-link
                class="text-orange-600 hover:underline"
                to="/auth/login"
                >Login</nuxt-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";

const router = useRouter();
const { $toaster } = useNuxtApp();

const currentStep = ref("email");
const email = ref("");
const emailError = ref("");
const otpDigits = reactive(Array(6).fill(""));
const otpInputs = reactive([]);
const otpError = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const newPasswordError = ref("");
const confirmNewPasswordError = ref("");
const showNewPassword = ref(false);
const showConfirmNewPassword = ref(false);
const hasSpecialChar = computed(() =>
  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value),
);
const hasNumber = computed(() => /\d/.test(newPassword.value));
const hasUpperCase = computed(() => /[A-Z]/.test(newPassword.value));
const hasLowerCase = computed(() => /[a-z]/.test(newPassword.value));
const hasMinLength = computed(() => newPassword.value.length >= 8);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = "Email is required";
    return false;
  }
  if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email address";
    return false;
  }
  emailError.value = "";
  return true;
};

const handleEmailSubmit = () => {
  if (validateEmail()) {
    // Simulate sending OTP
    $toaster.show("OTP sent to your email", "success");
    currentStep.value = "otp";
  }
};

const handleOtpInput = (index) => {
  if (otpDigits[index].length === 1 && index < 5) {
    otpInputs[index + 1].focus();
  }
};

const handleOtpKeydown = (index, event) => {
  if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
    otpInputs[index - 1].focus();
  }
};

const handleOtpSubmit = () => {
  const otp = otpDigits.join("");
  if (otp.length !== 6) {
    otpError.value = "Please enter a valid 6-digit OTP";
    return;
  }
  // Simulate OTP verification
  $toaster.show("OTP verified successfully", "success");
  currentStep.value = "newPassword";
};

const resendOtp = () => {
  // Simulate resending OTP
  $toaster.show("New OTP sent to your email", "success");
};

const togglePasswordVisibility = (field) => {
  if (field === "newPassword") {
    showNewPassword.value = !showNewPassword.value;
  } else if (field === "confirmNewPassword") {
    showConfirmNewPassword.value = !showConfirmNewPassword.value;
  }
};

const validateNewPassword = () => {
  if (!newPassword.value) {
    newPasswordError.value = "New password is required";
    return false;
  }
  if (
    !hasSpecialChar.value ||
    !hasNumber.value ||
    !hasUpperCase.value ||
    !hasLowerCase.value ||
    !hasMinLength.value
  ) {
    newPasswordError.value = "Password does not meet all requirements";
    return false;
  }
  newPasswordError.value = "";
  return true;
};

const validateConfirmNewPassword = () => {
  if (!confirmNewPassword.value) {
    confirmNewPasswordError.value = "Please confirm your new password";
    return false;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    confirmNewPasswordError.value = "Passwords do not match";
    return false;
  }
  confirmNewPasswordError.value = "";
  return true;
};

const handleNewPasswordSubmit = () => {
  if (validateNewPassword() && validateConfirmNewPassword()) {
    // Simulate password reset
    $toaster.show("Password reset successfully", "success");
    currentStep.value = "success";
  }
};

const goToLogin = () => {
  router.push("/auth/login");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input {
  transition: border 0.3s ease;
}

.form-input {
  @apply bg-white dark:bg-gray-700 text-gray-900 dark:text-white;
}
</style>
