// appointmentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: JSON.parse(localStorage.getItem('appointments')) || [],
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    addAppointment: (state, action) => {
      const formattedDate = new Date(action.payload.date).toISOString().split('T')[0];
      state.appointments.push({ ...action.payload, date: formattedDate, id: Date.now() });
      localStorage.setItem('appointments', JSON.stringify(state.appointments));
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
        localStorage.setItem('appointments', JSON.stringify(state.appointments));
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
      localStorage.setItem('appointments', JSON.stringify(state.appointments));
    }
  },
});

export const { setMonth, setYear, addAppointment, updateAppointment, deleteAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;