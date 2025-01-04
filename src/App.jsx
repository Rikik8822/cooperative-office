import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import Map from "./Map";


const App = () => {
  // מצב (state) לשמירת נתוני הטופס
  const [formData, setFormData] = useState({
    name: "", 
    address: "", 
    phone: "", 
    email: "", 
    internet: false, 
    kitchen: false, 
    coffeeMachine: false, 
    rooms: 1,
    distance: 1, 
  });

  // מצב להצעות להשלמת כתובת
  const [suggestions, setSuggestions] = useState([]);

  // מצב לקואורדינטות (ברירת מחדל: תל אביב)
  const [coordinates, setCoordinates] = useState([32.0853, 34.7818]);

  // קבלת מיקום המשתמש בעת טעינת האפליקציה
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates([latitude, longitude]); // עדכון הקואורדינטות למיקום הנוכחי של המשתמש
      },
      (error) => {
        console.error("שגיאה בקבלת מיקום:", error);
        if (error.code === 1) {
          alert(
            "בחרת לא לאפשר גישה למיקום. נא אפשר זאת בהגדרות הדפדפן או הזן מיקום ידנית."
          );
        } else {
          alert("לא ניתן לאתר את המיקום שלך. נסה שוב מאוחר יותר.");
        }
      }
    );
  }, []);

  // עדכון נתוני הטופס ושמירה על שינויים
  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // עדכון השדה שהתשנה
    }));

    if (name === "address") {
      fetchSuggestions(value); // קבלת הצעות לכתובת אם השדה הוא כתובת
    }
  };

  // קבלת הצעות להשלמת כתובת באמצעות API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // ניקוי הצעות אם אין חיפוש
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}&limit=5`
      );
      setSuggestions(response.data); // שמירת ההצעות שהתקבלו
    } catch (error) {
      console.error("שגיאה בקבלת הצעות לכתובת:", error);
    }
  };

  // טיפול בלחיצה על אחת מההצעות שהתקבלו
  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      address: suggestion.display_name, // עדכון שדה הכתובת עם ההצעה שנבחרה
    }));
    setSuggestions([]); // ניקוי ההצעות לאחר הבחירה
    const newCoordinates = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
    setCoordinates(newCoordinates); // עדכון הקואורדינטות לפי ההצעה
  };

  return (
    <div className="container">
      <h1>חיפוש משרד משותף</h1> 
      <SearchForm
        formData={formData} // נתוני הטופס
        suggestions={suggestions} // הצעות להשלמת כתובת
        onChange={handleFormChange} // פונקציה לטיפול בשינויים בטופס
        onSubmit={() => {}} // פונקציה ריקה לשמירת מבנה הטופס
        onSuggestionClick={handleSuggestionClick} // פונקציה לטיפול בבחירת הצעה
      />
      {/* מפה להצגת המיקום הנבחר */}
      <Map coordinates={coordinates} />
    </div>
  );
};

export default App;
