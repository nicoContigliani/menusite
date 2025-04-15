// Función para registrar entrada/salida
export const recordAttendance = async (action: 'getIn' | 'getOut', email: string, companyName: string) => {
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, email, companyName }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to record attendance');
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error recording ${action}:`, error);
      throw error;
    }
  };
  
  // Función para obtener los turnos de hoy
  export const fetchTodayShifts = async (email: string, companyName: string) => {
    try {
      const response = await fetch(`/api/attendance?email=${email}&companyName=${companyName}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch shifts');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching shifts:', error);
      throw error;
    }
  };
  