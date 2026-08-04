import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Compass, Calendar, Volume2, VolumeX, Download, Clock } from 'lucide-react';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface ApiData {
  timings: Timings;
  date: {
    readable: string;
    hijri: {
      date: string;
      day: string;
      month: { en: string; ar: string };
      year: string;
      designation: string;
    };
  };
  meta: {
    timezone: string;
    method: {
      name: string;
    };
  };
}

// Offline fallback prayer times for Makkah (Umm Al-Qura method)
const OFFLINE_PRAYER_TIMES: ApiData = {
  timings: {
    Fajr: '04:12',
    Sunrise: '05:38',
    Dhuhr: '12:22',
    Asr: '15:45',
    Sunset: '18:52',
    Maghrib: '19:04',
    Isha: '20:32',
    Imsak: '04:02',
    Midnight: '00:22'
  },
  date: {
    readable: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    hijri: {
      date: '',
      day: '',
      month: { en: '', ar: '' },
      year: '',
      designation: 'AH'
    }
  },
  meta: {
    timezone: 'Asia/Riyadh',
    method: {
      name: 'Umm Al-Qura University, Makkah'
    }
  }
};

export default function PrayerTimes() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [cityInput, setCityInput] = useState<string>('Makkah');
  const [countryInput, setCountryInput] = useState<string>('Saudi Arabia');
  const [calcMethod, setCalcMethod] = useState<number>(4); // Default to Makkah (Umm Al-Qura) = 4
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [calendarData, setCalendarData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [qiblaDegrees, setQiblaDegrees] = useState<number>(0);
  const [countdown, setCountdown] = useState<string>('');
  const [currentPrayer, setCurrentPrayer] = useState<string>('');

  // Real Hardware and Simulated Qibla Compass orientation states
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [simulatedHeading, setSimulatedHeading] = useState<number>(0);
  const [isSensorActive, setIsSensorActive] = useState<boolean>(false);
  const [needsPermission, setNeedsPermission] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Compass element ref for center calculations
  const compassContainerRef = useRef<HTMLDivElement>(null);

  // iOS Safari check for DeviceOrientation permission modal requirement
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      setNeedsPermission(true);
    }
  }, []);

  // Set up real physical sensory hardware listeners for both Mobile and PC convertibles
  useEffect(() => {
    let isMounted = true;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isMounted) return;

      let heading: number | null = null;

      // 1. iOS high accuracy Webkit proprietary heading
      if ('webkitCompassHeading' in e) {
        heading = (e as any).webkitCompassHeading;
      }
      // 2. Standard absolute alpha orientation if available
      else if (e.alpha !== null && (e.absolute || (e as any).absolute === true)) {
        heading = (360 - e.alpha) % 360;
      }
      // 3. General orientation alpha fallback (360 - alpha is clockwise degrees)
      else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null) {
        setDeviceHeading(Math.round(heading));
        setIsSensorActive(true);
      }
    };

    const activateSensors = () => {
      // Prefer absolute orientation state with strict North alignment
      const win = window as any;
      if ('ondeviceorientationabsolute' in win) {
        win.addEventListener('deviceorientationabsolute', handleOrientation, true);
      } else {
        win.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    if (!needsPermission) {
      activateSensors();
    }

    return () => {
      isMounted = false;
      const win = window as any;
      win.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      win.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [needsPermission]);

  // Request browser sensory authorization (required by iOS Safari iframe standards)
  const requestCompassPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const state = await (DeviceOrientationEvent as any).requestPermission();
        if (state === 'granted') {
          setNeedsPermission(false);
          setIsSensorActive(true);
        }
      } catch (err) {
        console.error('Sensor permission error:', err);
      }
    }
  };

  // Convert client cursor coords into polar clockwise degree heading relative to compass center
  const calculateHeadingFromCoords = (clientX: number, clientY: number) => {
    if (!compassContainerRef.current) return;
    const rect = compassContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const radians = Math.atan2(clientY - centerY, clientX - centerX);
    let degrees = radians * (180 / Math.PI) + 90; // Align 0 degrees upward (North)
    if (degrees < 0) {
      degrees += 360;
    }
    setSimulatedHeading(Math.round(degrees));
  };

  const handleStartDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSensorActive) return; // Prevent manual override if hardware sensor is active
    setIsDragging(true);

    if ('touches' in e) {
      if (e.touches.length > 0) {
        calculateHeadingFromCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    } else {
      calculateHeadingFromCoords(e.clientX, e.clientY);
    }
  };

  // Watch global mouse/touch movements when dragging is engaged
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMove = (e: MouseEvent) => {
      calculateHeadingFromCoords(e.clientX, e.clientY);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        calculateHeadingFromCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleGlobalEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging]);

  // Audio object ref
  const adhanAudioRef = useRef<HTMLAudioElement | null>(null);

  const methods = [
    { id: 1, name: 'University of Islamic Sciences, Karachi' },
    { id: 2, name: 'Islamic Society of North America (ISNA)' },
    { id: 3, name: 'Muslim World League (MWL)' },
    { id: 4, name: 'Umm Al-Qura University, Makkah' },
    { id: 5, name: 'Egyptian General Authority of Survey' },
    { id: 7, name: 'Institute of Geophysics, University of Tehran' },
    { id: 12, name: 'Union des Organisations Islamiques de France' },
  ];

  // Request browser geolocation on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });
          calculateQibla(lat, lng);
        },
        () => {
          // Fallback to Makkah
          setCoords({ lat: 21.4225, lng: 39.8262 });
          calculateQibla(21.4225, 39.8262);
        }
      );
    } else {
      setCoords({ lat: 21.4225, lng: 39.8262 });
      calculateQibla(21.4225, 39.8262);
    }
  }, []);

  // Calculate mathematical Qibla bearing towards Makkah (21.4225° N, 39.8262° E)
  const calculateQibla = (userLat: number, userLng: number) => {
    const latMakkah = 21.4225 * Math.PI / 180;
    const lngMakkah = 39.8262 * Math.PI / 180;
    const latUser = userLat * Math.PI / 180;
    const lngUser = userLng * Math.PI / 180;

    const dLng = lngMakkah - lngUser;
    
    const y = Math.sin(dLng);
    const x = Math.cos(latUser) * Math.tan(latMakkah) - Math.sin(latUser) * Math.cos(dLng);
    
    let qiblaRad = Math.atan2(y, x);
    let qiblaBe = qiblaRad * 180 / Math.PI;
    
    // Normalize to 0-360 degrees
    if (qiblaBe < 0) {
      qiblaBe += 360;
    }
    setQiblaDegrees(Math.round(qiblaBe));
  };

  // Fetch timings from Aladhan API
  const fetchTimings = async () => {
    setLoading(true);
    setErrorStatus(null);
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      let url = '';
      if (coords && coords.lat !== 21.4225 && coords.lng !== 39.8262) {
        url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${coords.lat}&longitude=${coords.lng}&method=${calcMethod}`;
      } else {
        url = `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${encodeURIComponent(cityInput)}&country=${encodeURIComponent(countryInput)}&method=${calcMethod}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to retrieve prayer timetable data.');
      const json = await res.json();
      
      if (json.data) {
        setApiData(json.data);
        
        // If we did a manual search, capture the updated coords returned
        if (!coords && json.data.meta?.latitude) {
          const lat = parseFloat(json.data.meta.latitude);
          const lng = parseFloat(json.data.meta.longitude);
          calculateQibla(lat, lng);
        }

        // Fetch remaining weekly calendar for timetable view
        let calUrl = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(cityInput)}&country=${encodeURIComponent(countryInput)}&method=${calcMethod}`;
        if (coords) {
          calUrl = `https://api.aladhan.com/v1/calendar?latitude=${coords.lat}&longitude=${coords.lng}&method=${calcMethod}&month=${month}&year=${year}`;
        }
        
        const calRes = await fetch(calUrl);
        if (calRes.ok) {
          const calJson = await calRes.json();
          if (calJson.data && Array.isArray(calJson.data)) {
            // grab 7 days starting today
            const startIndex = Math.max(0, day - 1);
            setCalendarData(calJson.data.slice(startIndex, startIndex + 7));
          }
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch prayer times:', err);
      setErrorStatus(err.message || 'Network error fetching prayer statistics. Using offline times.');
      // Use offline fallback
      setApiData(OFFLINE_PRAYER_TIMES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimings();
  }, [coords, calcMethod]);

  // Handle countdown timer ticking
  useEffect(() => {
    if (!apiData) return;

    const timer = setInterval(() => {
      const now = new Date();
      const times = apiData.timings;
      
      const prayList: { name: string; timeStr: string }[] = [
        { name: 'Fajr', timeStr: times.Fajr },
        { name: 'Sunrise', timeStr: times.Sunrise },
        { name: 'Dhuhr', timeStr: times.Dhuhr },
        { name: 'Asr', timeStr: times.Asr },
        { name: 'Maghrib', timeStr: times.Maghrib },
        { name: 'Isha', timeStr: times.Isha }
      ];

      // Convert each string to physical Date object
      let currentIdx = -1;
      let minDiff = Infinity;
      let nextPrayTime: Date | null = null;
      let nextPrayName = '';

      prayList.forEach((pray, i) => {
        const [hh, mm] = pray.timeStr.split(':').map(Number);
        const pDate = new Date(now);
        pDate.setHours(hh, mm, 0, 0);

        if (now >= pDate) {
          currentIdx = i;
        }

        const diff = pDate.getTime() - now.getTime();
        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextPrayTime = pDate;
          nextPrayName = pray.name;
        }
      });

      // Handle wraparound for Fajr tomorrow
      if (!nextPrayTime) {
        const [hh, mm] = prayList[0].timeStr.split(':').map(Number);
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(hh, mm, 0, 0);
        minDiff = tomorrow.getTime() - now.getTime();
        nextPrayTime = tomorrow;
        nextPrayName = 'Fajr';
        currentIdx = prayList.length - 1; // Isha is active
      }

      // Format countdown text
      const diffSecs = Math.floor(minDiff / 1000);
      const hours = Math.floor(diffSecs / 3600);
      const mins = Math.floor((diffSecs % 3600) / 60);
      const secs = diffSecs % 60;
      
      setCountdown(`${nextPrayName} in ${hours}h ${mins}m ${secs}s`);
      setCurrentPrayer(prayList[currentIdx]?.name || 'Isha');
      
      // Trigger Adhan Audio if enabled and seconds match 0
      if (audioEnabled && diffSecs === 0 && adhanAudioRef.current) {
        adhanAudioRef.current.play().catch(() => {});
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [apiData, audioEnabled]);

  const triggerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCoords(null); // Force lookup via city name
    fetchTimings();
  };

  // Convert prayer timing object for CSV / printable download format
  const exportTimingsAsCsv = () => {
    if (!apiData) return;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Prayer,Time\n"
      + `Fajr,${apiData.timings.Fajr}\n`
      + `Sunrise,${apiData.timings.Sunrise}\n`
      + `Dhuhr,${apiData.timings.Dhuhr}\n`
      + `Asr,${apiData.timings.Asr}\n`
      + `Maghrib,${apiData.timings.Maghrib}\n`
      + `Isha,${apiData.timings.Isha}\n`
      + `Midnight,${apiData.timings.Midnight}\n`
      + `Zone,${apiData.meta.timezone}\n`
      + `Hijri,${apiData.date.hijri.date}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Almubashshireen_PrayerTimes_${apiData.date.readable.replace(/ /g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="prayer_times_page">
      {/* Hidden Adhan audio selector */}
      <audio 
        ref={adhanAudioRef} 
        src="https://download.quranicaudio.com/adhan/makkah/abdul_basit.mp3" 
        preload="auto"
      />

      {/* Header card banner */}
      <div className="bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858] p-8 shadow-md relative overflow-hidden text-center mb-8">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D39858]/20 m-2 rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#D39858]/20 m-2 rounded-br-lg" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D39858]">Liturgical Clock</span>
        <h2 className="font-serif text-3xl font-bold text-[#EACEAA] my-2">Prayer Times & Qibla Finder</h2>
        {apiData && (
          <p className="text-xl font-arabic text-amber-200 mt-2 block" dir="rtl" lang="ar">
            {apiData.date.hijri.day} {apiData.date.hijri.month.ar} {apiData.date.hijri.year} AH
          </p>
        )}
      </div>

      {/* Control row: Fallback city lookup & method */}
      <div className="bg-[#EACEAA] bg-opacity-90 dark:bg-[#34150F] rounded-xl p-5 border border-[#D39858] shadow-md mb-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center" id="prayer_controls">
        {/* City Input Search Form */}
        <form onSubmit={triggerSearch} className="lg:col-span-6 grid grid-cols-2 gap-2 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#85431E]" />
            <input
              type="text"
              placeholder="City (e.g. Makkah)"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full bg-[#150C0C]/10 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg pl-9 pr-3 py-3 text-xs focus:ring-1 focus:ring-[#85431E] outline-none text-inherit font-sans"
            />
          </div>
          <div className="flex gap-1.5 items-center">
            <input
              type="text"
              placeholder="Country"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              className="w-full bg-[#150C0C]/10 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg px-3 py-3 text-xs focus:ring-1 focus:ring-[#85431E] outline-none text-inherit font-sans"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] rounded-md text-xs font-bold shrink-0 transition"
            >
              Go
            </button>
          </div>
        </form>

        {/* Calculation method selector */}
        <div className="lg:col-span-4 w-full">
          <select
            value={calcMethod}
            onChange={(e) => setCalcMethod(Number(e.target.value))}
            className="w-full bg-[#150C0C]/5 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg py-3 px-3 text-xs focus:ring-1 focus:ring-[#85431E] outline-none text-inherit font-sans"
          >
            {methods.map(meth => (
              <option key={meth.id} value={meth.id} className="bg-[#34150F] text-[#EACEAA]">{meth.name}</option>
            ))}
          </select>
        </div>

        {/* Adhan Audio Toggle button */}
        <div className="lg:col-span-2 flex justify-start lg:justify-end">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`flex items-center gap-1.5 px-4 py-3 rounded-lg text-xs font-bold uppercase transition ${
              audioEnabled 
                ? 'bg-emerald-600 text-white' 
                : 'bg-[#150C0C]/5 hover:bg-[#85431E]/15 text-[#85431E] dark:text-[#D39858]'
            }`}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Adhan On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Adhan Muted</span>
              </>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        /* Loading skeleton representation */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="prayer_skeleton_load flex">
          <div className="lg:col-span-8 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 w-full rounded-xl bg-[#EACEAA]/40 dark:bg-[#34150F]/45 animate-pulse" />
            ))}
          </div>
          <div className="lg:col-span-4 h-64 rounded-xl bg-[#EACEAA]/40 dark:bg-[#34150F]/45 animate-pulse" />
        </div>
      ) : errorStatus ? (
        <div className="bg-red-500/10 border border-red-500 p-8 rounded-xl text-center text-red-500">
          <p className="font-serif font-bold text-lg">{errorStatus}</p>
          <button 
            onClick={fetchTimings}
            className="mt-4 px-4 py-2 bg-[#85431E] text-[#EACEAA] rounded-md text-xs font-bold"
          >
            Retry Fetching Timestable
          </button>
        </div>
      ) : apiData ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="prayer_layout_root">
          
          {/* LEFT: 2-Column Prayer Cards Ledger (6 Columns) */}
          <div className="lg:col-span-8 workspace-pane space-y-6">
            
            {/* NEXT PRAYER TICKING COUNTDOWN */}
            <div className="bg-[#85431E] text-[#EACEAA] rounded-xl p-6 border border-[#D39858] shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-amber-300 animate-pulse" />
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-mono text-amber-200">Current active slot: {currentPrayer}</span>
                  <h3 className="font-serif text-xl font-bold">{countdown}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportTimingsAsCsv}
                  className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded px-3 py-1.5 transition font-semibold"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Schedule</span>
                </button>
              </div>
            </div>

            {/* THE PRAYER CARD LISTINGS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Fajr', time: apiData.timings.Fajr, arabic: 'الفجر' },
                { name: 'Sunrise', time: apiData.timings.Sunrise, arabic: 'الشروق' },
                { name: 'Dhuhr', time: apiData.timings.Dhuhr, arabic: 'الظهر' },
                { name: 'Asr', time: apiData.timings.Asr, arabic: 'العصر' },
                { name: 'Maghrib', time: apiData.timings.Maghrib, arabic: 'المغرب' },
                { name: 'Isha', time: apiData.timings.Isha, arabic: 'العشاء' },
                { name: 'Midnight', time: apiData.timings.Midnight, arabic: 'منتصف الليل' }
              ].map((pray) => {
                const isActive = pray.name === currentPrayer;
                return (
                  <div
                    key={pray.name}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#85431E] border-[#D39858] text-[#EACEAA] shadow-lg scale-[1.01]'
                        : 'bg-[#EACEAA] bg-opacity-90 dark:bg-[#34150F] border-[#D39858]/35 text-inherit'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${isActive ? 'bg-white/10' : 'bg-[#150C0C]/5 dark:bg-black/30'}`}>
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold">{pray.name}</h4>
                        <span className="text-[10px] font-mono opacity-80">{pray.arabic}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-lg font-bold block leading-none">{pray.time}</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono opacity-65">standard pm</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WEEKLY TIMETABLE PREDICTION TAB */}
            {calendarData.length > 0 && (
              <div className="bg-[#EACEAA] bg-opacity-95 dark:bg-[#34150F] border border-[#D39858] rounded-xl p-5 shadow-sm" id="weekly_timetable">
                <h4 className="font-serif text-sm font-bold text-[#85431E] dark:text-[#EACEAA] border-b border-[#D39858]/30 pb-2 mb-3 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Weekly Timetable Prediction (7 Days)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#D39858]/35 text-[#85431E] dark:text-[#D39858] font-mono uppercase text-[9px]">
                        <th className="py-2.5 px-1.5">Date</th>
                        <th className="py-2.5 px-1.5">Fajr</th>
                        <th className="py-2.5 px-1.5">Dhuhr</th>
                        <th className="py-2.5 px-1.5">Asr</th>
                        <th className="py-2.5 px-1.5">Maghrib</th>
                        <th className="py-2.5 px-1.5">Isha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D39858]/25 text-[#34150F] dark:text-[#EACEAA]/90">
                      {calendarData.map((day, idx) => (
                        <tr key={idx} className="hover:bg-[#85431E]/5 transition">
                          <td className="py-2 px-1.5 font-semibold">{day.date.readable.split(' ').slice(0, 2).join(' ')}</td>
                          <td className="py-2 px-1.5 font-mono">{day.timings.Fajr.split(' ')[0]}</td>
                          <td className="py-2 px-1.5 font-mono">{day.timings.Dhuhr.split(' ')[0]}</td>
                          <td className="py-2 px-1.5 font-mono">{day.timings.Asr.split(' ')[0]}</td>
                          <td className="py-2 px-1.5 font-mono">{day.timings.Maghrib.split(' ')[0]}</td>
                          <td className="py-2 px-1.5 font-mono">{day.timings.Isha.split(' ')[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Qibla Compasses & Geographical summary (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* COMPASS AREA CARD */}
            <div className="bg-[#EACEAA] bg-opacity-95 dark:bg-[#34150F] border border-[#D39858] rounded-xl p-6 shadow-md text-center flex flex-col items-center justify-between relative overflow-hidden" id="qibla_compass_card">
              <h4 className="font-serif text-sm font-bold text-[#85431E] dark:text-[#EACEAA] border-b border-[#D39858]/30 pb-2 mb-3 w-full flex items-center justify-center gap-1.5">
                <Compass className="h-4 w-4 text-[#85431E]" /> Qibla Direction Compass
              </h4>
              
              {/* Hardware Status / Interaction info */}
              <div className="mb-4 w-full">
                {isSensorActive ? (
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    📡 Mobile Hardware Compass Active
                  </div>
                ) : (
                  <div className="inline-flex flex-col items-center gap-1 w-full">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/35 text-[#85431E] dark:text-[#D39858] text-[9px] font-mono uppercase font-bold tracking-wider">
                      💻 Interactive PC drag Mode
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-sans">
                      Click & drag the dial or slide below to align orientation
                    </span>
                  </div>
                )}
              </div>

              {/* ROTATING SVG COMPASS COMPONENT */}
              <div 
                ref={compassContainerRef}
                onMouseDown={handleStartDrag}
                onTouchStart={handleStartDrag}
                className={`relative w-48 h-48 mb-4 flex items-center justify-center select-none ${isSensorActive ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                title={isSensorActive ? "Device orientation active" : "Click and drag to rotate compass dial"}
              >
                
                {/* Dial circle (Rotates relative to heading to align North) */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-[#D39858]/40 bg-[#150C0C]/5 dark:bg-[#150C0C]/40 flex items-center justify-center transition-all duration-300 ease-out"
                  style={{ transform: `rotate(${- (isSensorActive ? deviceHeading : simulatedHeading)}deg)` }}
                >
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 absolute top-2 font-black">N</div>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 absolute bottom-2 font-black">S</div>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 absolute right-2 font-black">E</div>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 absolute left-2 font-black">W</div>

                  {/* Dial ticks */}
                  <div className="absolute w-full h-full rounded-full border border-[#D39858]/10 pointer-events-none" />
                  <div className="absolute w-full h-full rounded-full border-2 border-dotted border-[#D39858]/20 rotate-45 pointer-events-none" />
                </div>

                {/* Compass static outer ring details */}
                <div className="absolute w-40 h-40 rounded-full border border-dashed border-[#D39858]/45 pointer-events-none" />

                {/* Rotating Qibla Needle container (Points reliably to Mecca relative to screen) */}
                <div 
                  className="w-full h-full absolute flex items-center justify-center transition-all duration-300 ease-out pointer-events-none"
                  style={{ transform: `rotate(${(qiblaDegrees - (isSensorActive ? deviceHeading : simulatedHeading))}deg)` }}
                >
                  {/* The actual pointing needle */}
                  <div className="absolute h-24 w-1.5 bg-[#85431E] dark:bg-[#D39858] top-12 rounded-full" />
                  {/* Arrow Tip */}
                  <div className="absolute top-8 border-l-6 border-r-6 border-b-8 border-transparent border-b-[#85431E] dark:border-b-[#D39858] h-0 w-0" />
                  
                  {/* Green Ka'bah micro icon at pointer tail */}
                  <div className="absolute top-3 bg-[#34150F] border-2 border-[#D39858] p-1 rounded text-[8px] font-mono text-[#EACEAA] font-bold shadow" title="Qiblah Mecca Target">
                    🕋 KA'BAH
                  </div>
                </div>

                {/* Central brass pin pivot */}
                <div className="w-5 h-5 rounded-full bg-[#34150F] border-2 border-[#D39858] z-30 shadow-md pointer-events-none" />
              </div>

              {/* Simulated Orientation precise slider for PC devices */}
              {!isSensorActive && (
                <div className="w-full px-2 mb-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 mb-1">
                    <span>Aesthetic Heading: {(isSensorActive ? deviceHeading : simulatedHeading)}°</span>
                    <span>North Align</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={simulatedHeading}
                    onChange={(e) => setSimulatedHeading(parseInt(e.target.value, 10))}
                    className="w-full accent-[#85431E] h-1 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* iOS Safari Actionable Calibration Permission Button */}
              {needsPermission && (
                <button
                  type="button"
                  onClick={requestCompassPermission}
                  className="mb-4 px-3 py-1.5 bg-[#85431E] text-xs font-bold text-white rounded hover:bg-[#D39858] transition"
                  title="Requests mobile accelerometer and magnetometer sensor metrics"
                >
                  Unlock Live iPhone Compass
                </button>
              )}

              <div className="bg-[#150C0C]/5 dark:bg-black/35 p-3 rounded-lg border border-[#D39858]/20 w-full text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block">Calculated Bearing Angle</span>
                <span className="text-xl font-mono font-bold text-[#85431E] dark:text-[#D39858]">{qiblaDegrees}° Northeast</span>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 font-sans font-medium">
                  Current orientation bearing offset: {((qiblaDegrees - (isSensorActive ? deviceHeading : simulatedHeading)) + 360) % 360}°
                </p>
              </div>
            </div>

            {/* GEOGRAPHIC COORDINATES PREVIEW CARD */}
            <div className="bg-[#34150F] text-[#EACEAA] border border-[#D39858] rounded-xl p-5 text-xs text-left shadow-md">
              <h5 className="font-serif font-bold text-[#D39858] border-b border-[#D39858]/30 pb-2 mb-3 flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Location Authority Matrix
              </h5>
              <div className="space-y-2.5 font-sans">
                <div className="flex justify-between">
                  <span className="text-stone-400">Timezone ID:</span>
                  <span className="font-mono font-medium">{apiData.meta.timezone}</span>
                </div>
                {coords ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-stone-400">User Latitude:</span>
                      <span className="font-mono font-medium">{coords.lat.toFixed(4)}° N</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">User Longitude:</span>
                      <span className="font-mono font-medium">{coords.lng.toFixed(4)}° E</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Target Location:</span>
                      <span className="font-mono font-medium capitalize">{cityInput}, {countryInput}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400">Calc System:</span>
                  <span className="font-mono font-medium truncate ml-1">{apiData.meta?.method?.name || 'Umm Al-Qura'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : null}
    </div>
  );
}
