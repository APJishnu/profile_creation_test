"use client"
import React, { useEffect, useState } from "react";
import ProfileForm from "../components/profile-form/profile-form";
import Loader from "@/themes/components/loader/loader";

const ProfileCreationView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time (for demo purposes, you can remove this in production)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate a loading state for 2 seconds
  }, []);
  return (
    <>
      {loading ? (
        <Loader /> // Show the loader while loading
      ) : (
        <div>
          <ProfileForm />
        </div>
      )}
    </>
  );
};

export default ProfileCreationView;
