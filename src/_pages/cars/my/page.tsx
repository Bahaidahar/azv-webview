"use client";
import { CarCard } from "@/entities/car-card";
import React, { useEffect } from "react";
import { useUserStore } from "@/shared/stores/userStore";

const MyCarsPage = ({ onClose }: { onClose: () => void }) => {
  const { fetchUser, user, isLoading } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const ownedCars = user?.owned_cars || [];

  return (
    <section>
      <div className="flex flex-col gap-4 pt-4 overflow-scroll h-[calc(100vh-100px)] pb-[200px]">
        {isLoading ? (
          <div className="text-center py-4 text-[#191919] text-[16px]">
            Загрузка...
          </div>
        ) : ownedCars.length > 0 ? (
          ownedCars.map((car) => (
            <CarCard onCarClick={onClose} key={car.id} car={car} />
          ))
        ) : (
          <div className="text-center py-4 text-[#191919] text-[16px]">
            Ничего не найдено
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCarsPage;
