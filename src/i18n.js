import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const storedLanguage = localStorage.getItem('i18nextLng');
const initialLanguage = storedLanguage || 'en'; // Default to 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: 'Hello',
        'Current Academic Session': 'Current Academic Session',
        'Add Student': 'Add Student',
        Session: 'Session',
        Term: 'Term',
        'Start Date': 'Start Date',
        'End Date': 'End Date',
        'No current session available.': 'No current session available.',
        "Students": "Students",
        "Total": "Total",
        "Present": "Present",
        "Today": "Today",
        "Absent": "Absent",
        "Attendance": "Attendance",
        "from yesterday": "from yesterday",
        "increase": "increase",
        "decrease": "decrease",
        "This Month": "This Month",
        "Recent Activities": "Recent Activities",
        "Today": "Today",
        "New teacher created": "New teacher created",
        "JSS 1 A attendance taken": "JSS 1 A attendance taken",
        "Absence application": "Absence application",
        "Sick Leave application": "Sick Leave application",
        "Class": "Class",
          "Section": "Section",
          "Select a Class": "Select a Class",
          "Select a Section": "Select a Section",
          "Get Students": "Get Students",
          "Mark Attendance": "Mark Attendance",
          "Student ID": "Student ID",
          "Student Name": "Student Name",
          "Attendance": "Attendance",
          "present": "present",
          "absent": "absent",
          "late": "late",
          "No records found": "No records found",
          "Submit Attendance": "Submit Attendance",
          "Submitting...": "Submitting...",
          "⚠️ Please select attendance status for all students.": "⚠️ Please select attendance status for all students.",
          "✅ Attendance submitted successfully!": "✅ Attendance submitted successfully!",
          "❌ Error: ": "❌ Error: ",
          "Attendance Preview": "Attendance Preview",
          "No attendance records found.": "No attendance records found.",
      "Submit Absence Application": "Submit Absence Application",
      "Select Class": "Select Class",
      "Select Student": "Select Student",
      "Absence Start Date": "Absence Start Date",
      "Number of Days": "Number of Days",
      "Reason for Absence": "Reason for Absence",
      "Submit Application": "Submit Application"
      },
    },
    fr: {
      translation: {
        hello: 'Bonjour',
        'Current Academic Session': 'Session académique en cours',
        'Add Student': 'Ajouter un étudiant',
        Session: 'Session',
        Term: 'Trimestre',
        'Start Date': 'Date de début',
        'End Date': 'Date de fin',
        'No current session available.': 'Aucune session actuelle disponible.',
        "Students": "Étudiants",
        "Total": "Total",
        "Present": "Présent",
        "Today": "Aujourd'hui",
        "Absent": "Absent",
        "Attendance": "Présence",
        "from yesterday": "depuis hier",
        "increase": "augmentation",
        "decrease": "diminution",
        "This Month": "Ce mois-ci",
        "Recent Activities": "Activités Récentes",
        "Today": "Aujourd'hui",
        "New teacher created": "Nouveau professeur créé",
        "JSS 1 A attendance taken": "Présence prise pour JSS 1 A",
        "Absence application": "Demande d'absence",
        "Sick Leave application": "Demande de congé maladie",
        "Class": "Classe",
          "Section": "Section",
          "Select a Class": "Sélectionner une Classe",
          "Select a Section": "Sélectionner une Section",
          "Get Students": "Obtenir les Élèves",
          "Mark Attendance": "Marquer la Présence",
          "Student ID": "ID de l'Élève",
          "Student Name": "Nom de l'Élève",
          "Attendance": "Présence",
          "present": "présent",
          "absent": "absent",
          "late": "en retard",
          "No records found": "Aucun enregistrement trouvé",
          "Submit Attendance": "Soumettre la Présence",
          "Submitting...": "Soumission en cours...",
          "⚠️ Please select attendance status for all students.": "⚠️ Veuillez sélectionner le statut de présence pour tous les élèves.",
          "✅ Attendance submitted successfully!": "✅ Présence soumise avec succès !",
          "❌ Error: ": "❌ Erreur : ",
          "Attendance Preview": "Aperçu de la présence",
          "No attendance records found.": "Aucun enregistrement de présence trouvé.",
          "Submit Absence Application": "Soumettre une demande d'absence",
      "Select Class": "Sélectionnez une classe",
      "Select Student": "Sélectionner un étudiant",
      "Absence Start Date": "Date de début d'absence",
      "Number of Days": "Nombre de jours",
      "Reason for Absence": "Motif de l'absence",
      "Submit Application": "Soumettre la candidature"
      },
    },
  },
  lng: initialLanguage, // Use stored language or default
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

// i18n.jsx
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend'; // Import the backend

// const storedLanguage = localStorage.getItem('i18nextLng');
// const initialLanguage = storedLanguage || 'en';

// i18n
//   .use(Backend) // Initialize the backend
//   .use(initReactI18next)
//   .init({
//     lng: initialLanguage,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//     backend: { // Backend configuration
//       loadPath: '/locales/{{lng}}/translation.json', // Path to your JSON files
//     },
//   });

// export default i18n;