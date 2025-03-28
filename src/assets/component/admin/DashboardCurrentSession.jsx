import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const DashboardCurrentSession = () => {
  const [currentSession, setCurrentSession] = useState(null);

  const { t } = useTranslation();


  useEffect(() => {
    const fetchCurrentSession = async () => {
      try {
        const response = await axios.get(
          "https://attendswift-backend.onrender.com/api/academicsessions"
        );
        
        // Find the current session (where isCurrent is true)
        const activeSession = response.data.find((session) => session.isCurrent);
        
        if (activeSession) {
          setCurrentSession(activeSession);
        }
      } catch (error) {
        console.error("Error fetching current session:", error);
      }
    };

    fetchCurrentSession();
  }, []);

  if (!currentSession) return <p>{t('No current session available.')}</p>;

  return (
    <>
        <div className="p-4 border border-gray-300 rounded-lg shadow-md w-[90%] md:w-[30%] mx-auto md:mx-0 mt-3 md:mt-0">
            <h2 className="text-xl font-bold mb-2 text-blue-700">{t('Current Academic Session')}</h2>
            <p><strong>{t('Session')}:</strong> {currentSession.academicSession}</p>
            <p><strong>{t('Term')}:</strong> {currentSession.terms}</p>
            <p><strong>{t('Start Date')}:</strong> {new Date(currentSession.startDate).toDateString()}</p>
            <p><strong>{t('End Date')}:</strong> {new Date(currentSession.endDate).toDateString()}</p>
        </div>
    </>
  );
};

export default DashboardCurrentSession;
