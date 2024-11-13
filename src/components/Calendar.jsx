// Calendar.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setMonth, setYear, addAppointment, updateAppointment, deleteAppointment } from '../redux/appointmentsSlice';
import Day from './Day';
import Modal from './Modal';

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { month, year } = useParams();
  const { selectedMonth, selectedYear, appointments } = useSelector((state) => state.appointments);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (month && year) {
      dispatch(setMonth(parseInt(month)));
      dispatch(setYear(parseInt(year)));
    } else {
      navigate(`/year/${selectedYear}/month/${selectedMonth}`);
    }
  }, [month, year, navigate]);

  const handleMonthChange = (e) => {
    const newMonth = Number(e.target.value);
    dispatch(setMonth(newMonth));
    navigate(`/year/${selectedYear}/month/${newMonth}`);
  };

  const handleYearChange = (e) => {
    const newYear = Number(e.target.value);
    dispatch(setYear(newYear));
    navigate(`/year/${newYear}/month/${selectedMonth}`);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setModalOpen(false);
  };

  const handleSaveAppointment = (data) => {
    // Convert the date to UTC to avoid timezone issues
    const utcDate = new Date(data.date);
    const formattedDate = new Date(Date.UTC(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate()
    )).toISOString().split('T')[0];
  
    const appointmentData = {
      ...data,
      date: formattedDate,
    };
  
    if (selectedAppointment) {
      dispatch(updateAppointment({ ...selectedAppointment, ...appointmentData }));
    } else {
      dispatch(addAppointment(appointmentData));
    }
    handleCloseModal();
  };

  const handleDeleteAppointment = (id) => {
    dispatch(deleteAppointment(id));
    handleCloseModal();
  };

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="container bg-white shadow-md rounded-lg p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <select 
            className="border rounded p-2" 
            value={selectedMonth} 
            onChange={handleMonthChange}
          >
            {monthNames.map((name, i) => (
              <option key={i} value={i + 1}>{name}</option>
            ))}
          </select>
          <select 
            className="border rounded p-2" 
            value={selectedYear} 
            onChange={handleYearChange}
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => setModalOpen(true)} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Create Appointment
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(daysInMonth)].map((_, index) => (
          <Day 
            key={index}
            day={index + 1}
            month={selectedMonth}
            year={selectedYear}
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
          />
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveAppointment}
        onDelete={handleDeleteAppointment}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default Calendar;