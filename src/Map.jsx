import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapUpdater = ({ coordinates }) => {
  const map = useMap(); // גישה לאובייקט המפה מתוך רכיב ה-MapContainer
  map.setView(coordinates, 13); // עדכון מרכז המפה ורמת הזום
  return null; // רכיב זה לא מציג תוכן ולכן מחזיר null
};

// רכיב להצגת המפה
const Map = ({ coordinates }) => {
  return (
    <div className="map-container">
      {/* מיכל המפה (MapContainer) שמגדיר את המפה עם מרכז, רמת זום וסגנון */}
      <MapContainer
        center={coordinates} // מרכז המפה (קואורדינטות)
        zoom={13} // רמת זום התחלתית
        style={{ height: "400px", width: "100%" }} // עיצוב גובה ורוחב של המפה
      >
        {/* שכבת אריחים שמציגה את פרטי המפה (ממקור OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // כתובת האריחים לטעינה
        />
        {/* סמן שממוקם על המפה לפי הקואורדינטות שנשלחו */}
        <Marker position={coordinates} />
        {/* רכיב לעדכון דינמי של מרכז המפה */}
        <MapUpdater coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
