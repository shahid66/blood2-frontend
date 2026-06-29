"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHeartbeat,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaTint,
  FaMapMarkerAlt,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaVenusMars,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";
import { useGeoData } from "@/hooks/useGeoData";
import { uploadImageToImgBB } from "@/lib/imageUpload";
import { signUp } from "@/lib/auth-client";
import Image from "next/image";
import ClientMetadata from "@/components/seo/ClientMetadata";
import { serverMutation } from "@/lib/core/server";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

export default function RegisterPage() {
  const router = useRouter();
  const {
    districts,
    getUpazilasByDistrict,
    loading: geoLoading,
  } = useGeoData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    district: "",
    districtName: "",
    upazila: "",
    upazilaName: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDistrictChange = (districtId) => {
    const selectedDistrict = districts.find((d) => d.id === districtId);
    handleInputChange("district", districtId);
    handleInputChange(
      "districtName",
      selectedDistrict ? selectedDistrict.name : "",
    );
    handleInputChange("upazila", "");
    handleInputChange("upazilaName", "");
  };

  const handleUpazilaChange = (upazilaId) => {
    const upazilas = getUpazilasByDistrict(formData.district);
    const selectedUpazila = upazilas.find((u) => u.id === upazilaId);
    handleInputChange("upazila", upazilaId);
    handleInputChange(
      "upazilaName",
      selectedUpazila ? selectedUpazila.name : "",
    );
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }


  

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }

    if (!formData.district) {
      newErrors.district = "District is required";
    }

    if (!formData.upazila) {
      newErrors.upazila = "Upazila is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      let avatarUrl = null;

      if (avatar) {
        setIsUploading(true);
        try {
          const uploadResult = await uploadImageToImgBB(avatar);
          avatarUrl = uploadResult.url;
        } catch (error) {
          toast.error("Failed to upload avatar. Please try again.");
          setIsSubmitting(false);
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      const { data, error } = await signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        image: avatarUrl,

        role: "donor",
        status: "active",
        
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        districtName: formData.districtName,
        upazila: formData.upazila,
        upazilaName: formData.upazilaName,
        donationCount: 0,
        lastDonationDate: null,
      });

      
      
      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      if (data?.user) {
        const userPayload = {
          authId: data.user.id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          image: avatarUrl,
          
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          districtName: formData.districtName,
          upazila: formData.upazila,
          upazilaName: formData.upazilaName,
          role: "donor",
          status: "active",
          donationCount: 0,
          lastDonationDate: null,
          createdAt: new Date().toISOString(),
        };

        await serverMutation("/api/users", userPayload);
        toast.success("Account created successfully");
      }

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      console.error("Registration error encountered:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^0-9+]/g, "");
    handleInputChange("phone", value);
  };

  return (
    <>
      <ClientMetadata
        title="Register"
        description="BloodBond connects blood donors with those in need. Register as a donor, request blood, and save lives today."
        keywords={[
          "blood donation",
          "donate blood",
          "blood bank",
          "blood request",
          "save lives",
          "donor registration",
        ]}
      />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Ambient Premium Glow Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#C62828]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#C62828]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
        
           
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h1 className="text-3xl text-center font-extrabold text-gray-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Join our community of life-savers. Register as a blood donor today.
            </p>
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative transition-colors hover:border-[#C62828]/30">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <FaImage className="text-gray-300 text-3xl" />
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-[#C62828] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#b22020] transition-colors shadow-lg shadow-[#C62828]/20"
                  >
                    <FaImage className="text-white text-xs" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <span className="text-xs font-medium text-gray-400">
                  {avatarPreview ? "Click to change photo" : "Upload profile photo (optional)"}
                </span>
              </div>

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <FaUser className="absolute left-3.5 text-gray-400 w-4 h-4" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                    }`}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs font-medium text-red-500 mt-0.5">{errors.name}</span>
                )}
              </div>

              {/* Email & Phone Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-3.5 text-gray-400 w-4 h-4" />
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-xs font-medium text-red-500 mt-0.5">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bloodGroup" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Blood Group
                  </label>
                  <div className="relative flex items-center">
                    <FaTint className="absolute left-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
                    <select
                      id="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className={`w-full pl-11 pr-10 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-4 transition-all duration-200 appearance-none bg-white font-medium ${
                        errors.bloodGroup
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                      }`}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group} className="text-[#C62828] font-bold">
                          {group}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 pointer-events-none w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45 mb-1" />
                  </div>
                  {errors.bloodGroup && (
                    <span className="text-xs font-medium text-red-500 mt-0.5">{errors.bloodGroup}</span>
                  )}
                </div>
              </div>

            

              {/* District & Upazila Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="district" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    District
                  </label>
                  <div className="relative flex items-center">
                    <FaMapMarkerAlt className="absolute left-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
                    <select
                      id="district"
                      value={formData.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={geoLoading}
                      className={`w-full pl-11 pr-10 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-4 transition-all duration-200 appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed ${
                        errors.district
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                      }`}
                    >
                      <option value="">
                        {geoLoading ? "Loading districts..." : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 pointer-events-none w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45 mb-1" />
                  </div>
                  {errors.district && (
                    <span className="text-xs font-medium text-red-500 mt-0.5">{errors.district}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="upazila" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Upazila
                  </label>
                  <div className="relative flex items-center">
                    <FaMapMarkerAlt className="absolute left-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
                    <select
                      id="upazila"
                      value={formData.upazila}
                      onChange={(e) => handleUpazilaChange(e.target.value)}
                      disabled={!formData.district}
                      className={`w-full pl-11 pr-10 py-3 border rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-4 transition-all duration-200 appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed ${
                        errors.upazila
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                      }`}
                    >
                      <option value="">
                        {!formData.district
                          ? "Select district first"
                          : "Select Upazila"}
                      </option>
                      {getUpazilasByDistrict(formData.district).map((upazila) => (
                        <option key={upazila.id} value={upazila.id}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 pointer-events-none w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45 mb-1" />
                  </div>
                  {errors.upazila && (
                    <span className="text-xs font-medium text-red-500 mt-0.5">{errors.upazila}</span>
                  )}
                </div>
              </div>

              {/* Password Fields Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3.5 text-gray-400 w-4 h-4" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-xs font-medium text-red-500 mt-0.5">{errors.password}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3.5 text-gray-400 w-4 h-4" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]/10"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-xs font-medium text-red-500 mt-0.5">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full py-3.5 bg-[#C62828] hover:bg-[#b22020] text-white font-semibold text-sm rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C62828]/20 hover:shadow-xl hover:shadow-[#C62828]/30 flex items-center justify-center gap-2 group mt-8"
              >
                {isSubmitting || isUploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isUploading ? "Uploading Photo..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              
             
              <span className="bg-white px-4 text-gray-400">
                  Already have an account?
                  <Link
              href="/auth/signin"
              className=" py-3   text-gray-700 font-semibold text-sm  hover:border-[#C62828] hover:text-[#C62828] transition-all duration-300 text-center"
            >
              Login to Your Account
            </Link>
                </span>
            </div>

            {/* Login Link */}
            
          </div>

        </motion.div>
      </div>
    </>
  );
}