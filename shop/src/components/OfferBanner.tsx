import { useState, useEffect } from "react";

const OfferBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 28,
    seconds: 30,
  });

  useEffect(() => {
    // A simple countdown logic for demonstration
    // Set a target date 2 hours, 28 mins, 30 secs from now
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2);
    targetDate.setMinutes(targetDate.getMinutes() + 28);
    targetDate.setSeconds(targetDate.getSeconds() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 / 60)) % 60), // Fixed this from my transcription
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-[#881337] text-white py-1 px-4 flex items-center justify-center gap-6 w-full overflow-hidden">
      <div className="flex flex-col items-center sm:items-end">
        <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase">Upto 70% OFF</h2>
        <span className="hidden sm:inline-block text-[10px] opacity-80 font-medium">at Sitewide - Sale ends in:</span>
      </div>

      <div className="flex items-center space-x-3">
        {[
          { label: 'D', value: timeLeft.days, desktopLabel: 'Days' },
          { label: 'H', value: timeLeft.hours, desktopLabel: 'Hours' },
          { label: 'M', value: timeLeft.minutes, desktopLabel: 'Mins' },
          { label: 'S', value: timeLeft.seconds, desktopLabel: 'Secs' },
        ].map((item, index, array) => (
          <div key={item.label} className="flex items-center">
            <div className="flex flex-col items-center min-w-[2.5rem]">
              <span className="text-sm sm:text-lg font-bold leading-none">{formatNumber(item.value)}</span>
              <span className="text-[8px] sm:text-[10px] mt-0.5 uppercase opacity-80">
                <span className="sm:hidden">{item.label}</span>
                <span className="hidden sm:inline">{item.desktopLabel}</span>
              </span>
            </div>
            {index < array.length - 1 && (
              <span className="text-sm sm:text-lg font-bold pb-3 ml-1 opacity-70">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
