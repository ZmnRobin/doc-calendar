// Day.js
import React from 'react';

const Day = ({ day, month, year, appointments, onAppointmentClick }) => {
  // Fix for date offset - use UTC to avoid timezone issues
  const date = new Date(Date.UTC(year, month - 1, day));
  const formattedDate = date.toISOString().split('T')[0];
  const dayAppointments = appointments.filter(app => app.date === formattedDate);

  return (
    <div className="border rounded p-4 bg-gray-100 min-h-[120px]">
      <h3 className="text-center font-semibold mb-2">{day}</h3>
      <div 
        className={`space-y-1 ${dayAppointments.length > 3 ? 'max-h-[120px] overflow-y-auto scrollbar-hide' : ''}`}
        style={{
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none',   /* Firefox */
        }}
      >
        {dayAppointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => onAppointmentClick(appointment)}
            className="bg-blue-100 p-1 rounded text-sm cursor-pointer hover:bg-blue-200 transition-colors"
          >
            <p className="truncate">{appointment.name}</p>
            <p className="text-xs text-gray-600">{appointment.time}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Day;