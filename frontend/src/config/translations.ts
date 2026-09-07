export const translations = {
  en: {
    home: {
      title: "Ask anything about the weather.",
      subtitle: "Localized forecasts, warnings and actionable weather intelligence — grounded in trusted meteorological data.",
    },
    dashboard: {
      current: "Current Conditions",
      hourly: "Hourly Forecast",
      daily: "Daily Forecast",
      updated: "Updated",
      source: "Source",
    },
    chat: {
      placeholder: "Ask WeatherGPT anything...",
      thinking: "WeatherGPT is thinking...",
      listen: "Listen",
    },
    common: {
      search: "Search city or location...",
      current_loc: "Current",
    }
  },
  hi: {
    home: {
      title: "मौसम के बारे में कुछ भी पूछें।",
      subtitle: "विश्वसनीय मौसम डेटा पर आधारित स्थानीय पूर्वानुमान, चेतावनी और actionable मौसम इंटेलिजेंस।",
    },
    dashboard: {
      current: "वर्तमान स्थिति",
      hourly: "प्रति घंटा पूर्वानुमान",
      daily: "दैनिक पूर्वानुमान",
      updated: "अपडेट किया गया",
      source: "स्रोत",
    },
    chat: {
      placeholder: "WeatherGPT से कुछ भी पूछें...",
      thinking: "WeatherGPT सोच रहा है...",
      listen: "सुनें",
    },
    common: {
      search: "शहर या स्थान खोजें...",
      current_loc: "वर्तमान",
    }
  }
};

export type LanguageCode = keyof typeof translations;
