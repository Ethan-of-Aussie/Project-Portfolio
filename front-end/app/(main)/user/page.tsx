"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { getUserIdFromToken } from "@/lib/auth";
import DietPlanCard from "@/app/components/dietPlanCard";

type UserProfile = {
  id: string;
  username: string;
  email: string;
  height: number;
  weight: number;
  allergies: string[];
  favFood: string[];
  created_at: string;
  updated_at: string;
};

export default function User() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dietPlans, setDietPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = getUserIdFromToken();

        if (!userId) {
          console.error("User ID not found");
          return;
        }

        const response = await api.get(`/api/v1/users/${userId}`);

        setProfile(response.data);
        const plansResponse = await api.get(`/api/v1/users/${userId}/plans`);

        setDietPlans(plansResponse.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700">
          My Account
        </p>

        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {profile?.username}
        </h1>

        <p className="mt-2 text-gray-600">{profile?.email}</p>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Height</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {profile?.height} cm
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {profile?.weight} kg
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Dietary Preferences
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-medium text-gray-500">Allergies</p>

            <div className="flex flex-wrap gap-2">
              {profile?.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-700"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-medium text-gray-500">
              Favourite Foods
            </p>

            <div className="flex flex-wrap gap-2">
              {profile?.favFood.map((food, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          My Diet Plans
        </h2>

        {dietPlans.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dietPlans.map((plan, index) => (
              <DietPlanCard dietPlan={plan} key={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="font-medium text-gray-700">No diet plans yet</p>
            <p className="mt-2 text-sm text-gray-500">
              Your saved diet plans will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
