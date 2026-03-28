import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface GraveData {
  id: string;
  x_coord: number;
  y_coord: number;
  message: string;
  tended_count: number;
  rating_avg: number;
  rating_count: number;
  image_url?: string;
}

interface GraveDetailProps {
  grave: GraveData | null;
  onClose: () => void;
  onRate: (id: string, newRating: number) => Promise<boolean>;
}

export default function GraveDetail({ grave, onClose, onRate }: GraveDetailProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!grave) {
      setHasRated(false);
      setShowSparks(false);
      setImageLoading(true);
      setImageError(false);
      return;
    }
    const rated = localStorage.getItem(`rated_${grave.id}`);
    setHasRated(!!rated);
    setImageLoading(true);
    setImageError(false);
  }, [grave]);

  const handleRate = async (rating: number) => {
    if (!grave || hasRated || isSubmitting) return;
    setIsSubmitting(true);
    
    const success = await onRate(grave.id, rating);
    if (success) {
      localStorage.setItem(`rated_${grave.id}`, "true");
      setHasRated(true);
      setShowSparks(true);
      setTimeout(() => onClose(), 2000);
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {grave && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/60 backdrop-blur-md pointer-events-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, filter: "blur(10px)" }}
            animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ scale: 0.9, y: 30, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0a0a0a]/95 border border-[#d1d1d1]/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Ethereal Glow */}
            <div className={`absolute -top-24 -left-24 w-64 h-64 blur-[100px] rounded-full mix-blend-plus-lighter pointer-events-none transition-colors duration-1000 ${grave.rating_avg >= 4 ? "bg-[#ffd700]/10" : "bg-[#4a90e2]/10"}`} />

            <div className="flex flex-col items-center gap-6 sm:gap-8 relative z-10 text-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono text-[#d1d1d1]/30 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                  Memory Crystal • {Math.round(grave.x_coord)} : {Math.round(grave.y_coord * -1)}
                </span>
                <div className="flex items-center gap-2 text-[#d1d1d1]/50 text-[10px] font-mono tracking-widest uppercase">
                  <Star className="w-3 h-3 text-[#d1d1d1]/30" fill="currentColor" />
                  Average: {grave.rating_avg.toFixed(1)} ({grave.rating_count})
                </div>
              </div>

              {grave.image_url && !imageError && (
                <div className="w-full relative aspect-square sm:aspect-video rounded-2xl overflow-hidden border border-[#d1d1d1]/10 bg-[#050505] shadow-2xl group">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
                      <div className="w-6 h-6 border-2 border-[#d1d1d1]/20 border-t-[#d1d1d1]/80 rounded-full animate-spin" />
                    </div>
                  )}
                  <img 
                    src={grave.image_url} 
                    alt="Memory Visual" 
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      imageLoading ? "opacity-0" : "opacity-70 grayscale contrast-125 group-hover:opacity-90 group-hover:grayscale-0"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                </div>
              )}

              {imageError && (
                <div className="w-full py-10 border border-[#d1d1d1]/5 rounded-2xl bg-red-500/5 flex flex-col items-center gap-2">
                   <p className="text-[10px] font-mono text-red-500/40 uppercase tracking-widest">Image lost to the void</p>
                   <p className="text-[8px] font-mono text-[#d1d1d1]/20 uppercase tracking-widest leading-tight px-6">Check your Supabase Storage permissions and Policy (RLS)</p>
                </div>
              )}

              <div 
                className="w-full max-h-[40vh] overflow-y-auto custom-scrollbar px-2 touch-pan-y"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <p className="font-serif text-xl sm:text-2xl leading-relaxed text-[#d1d1d1] italic break-words whitespace-pre-wrap">
                  "{grave.message}"
                </p>
              </div>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d1d1d1]/20 to-transparent" />

              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[10px] font-mono text-[#d1d1d1]/40 tracking-widest uppercase">
                  {hasRated ? "Reflection Received" : "Impart your essence"}
                </p>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onPointerEnter={() => !hasRated && setHoverRating(star)}
                      onPointerLeave={() => !hasRated && setHoverRating(0)}
                      onClick={() => handleRate(star)}
                      disabled={hasRated || isSubmitting}
                      className="relative p-1 transition-transform hover:scale-125 disabled:hover:scale-100 disabled:opacity-50"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors duration-300 ${
                          (hoverRating || (hasRated ? 0 : 0)) >= star
                            ? "text-[#ffd700]"
                            : "text-[#d1d1d1]/20"
                        }`}
                        fill={(hoverRating || 0) >= star ? "currentColor" : "none"}
                        strokeWidth={1}
                      />
                      
                      {/* Floating star animation */}
                      {showSparks && (
                        <motion.div
                          initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
                          animate={{ opacity: 0, y: -100, x: (Math.random() - 0.5) * 40, scale: 1.5 }}
                          transition={{ duration: 1.5, delay: star * 0.1 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <Star className="w-6 h-6 text-[#ffd700]/60" fill="currentColor" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-[#d1d1d1]/20 hover:text-[#d1d1d1] transition-colors p-2"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

