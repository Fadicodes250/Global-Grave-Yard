"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import WorldField3D from "@/components/WorldField3D";
import Navigation from "@/components/Navigation";
import GraveModal from "@/components/GraveModal";
import GraveDetail from "@/components/GraveDetail";
import { supabase } from "@/lib/supabaseClient";

interface Grave {
  id: string;
  x_coord: number;
  y_coord: number;
  message: string;
  rating_avg: number;
  rating_count: number;
  tended_count: number;
}

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, x: 0, y: 0 });
  const [selectedGrave, setSelectedGrave] = useState<Grave | null>(null);

  const handleRate = async (id: string, rating: number) => {
    const { data: current } = await supabase
      .from("graves")
      .select("rating_avg, rating_count, tended_count")
      .eq("id", id)
      .single();

    if (!current) return false;

    const newCount = (current.rating_count || 0) + 1;
    const newAvg = ((current.rating_avg || 0) * (current.rating_count || 0) + rating) / newCount;

    const { error } = await supabase
      .from("graves")
      .update({ 
        rating_avg: newAvg, 
        rating_count: newCount,
        tended_count: (current.tended_count || 0) + 1 
      })
      .eq("id", id);

    return !error;
  };

  const handleBury = async (message: string) => {
    const { error } = await supabase
      .from("graves")
      .insert([
        { 
          message, 
          x_coord: modalState.x, 
          y_coord: modalState.y,
          rating_avg: 0,
          rating_count: 0,
          tended_count: 0
        }
      ]);

    if (!error) {
       setModalState({ ...modalState, isOpen: false });
    }
  };

  return (
    <div className={`relative w-full ${isEntered ? "min-h-screen overflow-y-auto overflow-x-hidden" : "h-screen overflow-hidden"} bg-[#030303]`}>
      {isEntered && <Navigation />}

      {!isEntered && <SplashScreen onEnter={() => setIsEntered(true)} />}

      <div className="fixed inset-0 z-0">
        <WorldField3D 
          isPlacingGrave={modalState.isOpen || !!selectedGrave}
          onBury={(x, y) => setModalState({ isOpen: true, x, y })}
          onRead={(g) => setSelectedGrave(g as Grave)}
        />
      </div>

      {modalState.isOpen && (
        <GraveModal 
          isOpen={modalState.isOpen}
          x={modalState.x}
          y={modalState.y}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          onSubmit={handleBury}
        />
      )}

      {selectedGrave && (
        <GraveDetail 
          grave={selectedGrave}
          onClose={() => setSelectedGrave(null)}
          onRate={handleRate}
        />
      )}

      {/* Footer appears at the bottom of the scrollable field */}
      {isEntered && (
        <div className="relative z-10 bg-gradient-to-t from-[#030303] to-transparent pt-[100vh]">
          {/* Transparent space to allow scrolling past the 3D canvas to the footer */}
        </div>
      )}
    </div>
  );
}
