import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ControlPanel.css';

function ControlPanel() {
  const navigate = useNavigate();

  return (
    <div className="control-panel">
      <h1>Panel de Control</h1>
      <button className="control-button" onClick={() => navigate("/controlpanel/create")}>Crear Auto</button>
      <button className="control-button" onClick={() => navigate("/controlpanel/read")}>Ver Autos</button>
      <button className="control-button" onClick={() => navigate("/controlpanel/update")}>Actualizar Auto</button>
      <button className="control-button" onClick={() => navigate("/controlpanel/delete")}>Eliminar Auto</button>
    </div>
  );
}

export default ControlPanel;