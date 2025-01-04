import React from "react";

const SearchForm = ({ formData, suggestions, onChange, onSubmit, onSuggestionClick }) => {
  // פונקציה שמטפלת בשינוי של שדות הטופס
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // חילוץ נתוני השדה שהשתנה
    onChange(name, type === "checkbox" ? checked : value); // עדכון ערך לפי סוג השדה (תיבת סימון או קלט רגיל)
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        שם:
        <input
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        כתובת:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>

      {/* רשימת הצעות להשלמת כתובת */}
      {suggestions.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index} // מפתח ייחודי לכל הצעה
              onClick={() => onSuggestionClick(suggestion)} // קריאה לפונקציה בעת לחיצה על הצעה
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                margin: "5px 0",
                padding: "5px",
                background: "#f9f9f9",
              }}
            >
              {suggestion.display_name} {/* תצוגת שם ההצעה */}
            </li>
          ))}
        </ul>
      )}

      {/* שדה להזנת מספר טלפון */}
      <label>
        טלפון:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      {/* שדה להזנת כתובת אימייל */}
      <label>
        דוא"ל:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      {/* תיבת סימון לציון האם נדרש חיבור אינטרנט */}
      <label>
        אינטרנט:
        <input
          type="checkbox"
          name="internet"
          checked={formData.internet}
          onChange={handleChange}
        />
      </label>

      {/* תיבת סימון לציון האם נדרש מטבח */}
      <label>
        מטבח:
        <input
          type="checkbox"
          name="kitchen"
          checked={formData.kitchen}
          onChange={handleChange}
        />
      </label>

      {/* תיבת סימון לציון האם נדרשת מכונת קפה */}
      <label>
        מכונת קפה:
        <input
          type="checkbox"
          name="coffeeMachine"
          checked={formData.coffeeMachine}
          onChange={handleChange}
        />
      </label>

      {/* שדה להזנת מספר חדרים מבוקש */}
      <label>
        מספר חדרים:
        <input
          type="number"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          min="1" 
        />
      </label>

      {/* שדה להזנת המרחק המקסימלי */}
      <label>
        מרחק (בק"מ):
        <input
          type="number"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          min="1" 
        />
      </label>

      {/* כפתור לשליחת הטופס */}
      <button type="submit">חיפוש</button>
    </form>
  );
};

export default SearchForm;
