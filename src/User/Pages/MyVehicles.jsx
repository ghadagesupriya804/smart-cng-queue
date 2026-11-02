import React, { useState } from "react";
import "./Styles/MyVehicles.css";

const MyVehicles = () => {
  // State for the list of vehicles
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      model: "Maruti Suzuki Swift",
      plate: "MH 02 AB 1234",
      type: "Hatchback",
      fuel: "CNG",
      isDefault: true,
    },
    {
      id: 2,
      model: "Hyundai Creta",
      plate: "MH 04 CD 5678",
      type: "SUV",
      fuel: "Petrol + CNG",
      isDefault: false,
    },
  ]);

  // State to handle the Add Vehicle Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    model: "",
    plate: "",
    type: "Hatchback",
  });

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const vehicleToAdd = {
      id: Date.now(),
      model: newVehicle.model,
      plate: newVehicle.plate.toUpperCase(),
      type: newVehicle.type,
      fuel: "CNG",
      isDefault: vehicles.length === 0, // Make default if it's the first vehicle
    };

    setVehicles([...vehicles, vehicleToAdd]);
    setIsModalOpen(false);
    setNewVehicle({ model: "", plate: "", type: "Hatchback" }); // Reset form
  };

  const setAsDefault = (id) => {
    setVehicles(
      vehicles.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
  };

  const deleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to remove this vehicle?")) {
      setVehicles(vehicles.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="my-vehicles-page">
      
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>My Vehicles</h1>
          <p>Manage your vehicles for faster CNG bookings.</p>
        </div>
        <button className="btn-add-vehicle" onClick={() => setIsModalOpen(true)}>
          + Add New Vehicle
        </button>
      </div>

      {/* Vehicles Grid */}
      <div className="vehicles-grid">
        {vehicles.length === 0 ? (
          <div className="empty-state">
            <span>🚗</span>
            <h3>No vehicles added yet</h3>
            <p>Add your first vehicle to book CNG slots faster.</p>
          </div>
        ) : (
          vehicles.map((vehicle) => (
            <div className="vehicle-card" key={vehicle.id}>
              
              {/* Card Header: Status & Options */}
              <div className="card-top">
                <span className="vehicle-type">{vehicle.type}</span>
                {vehicle.isDefault && (
                  <span className="default-badge">★ Primary</span>
                )}
              </div>

              {/* Vehicle Info */}
              <div className="vehicle-info">
                <div className="vehicle-icon">🚙</div>
                <div>
                  <h3>{vehicle.model}</h3>
                  <div className="license-plate">{vehicle.plate}</div>
                </div>
              </div>

              {/* Card Footer: Actions */}
              <div className="card-footer">
                <span className="fuel-type">⛽ {vehicle.fuel}</span>
                
                <div className="action-buttons">
                  {!vehicle.isDefault && (
                    <button 
                      className="btn-set-default" 
                      onClick={() => setAsDefault(vehicle.id)}
                      title="Set as Primary Vehicle"
                    >
                      Set Primary
                    </button>
                  )}
                  <button 
                    className="btn-delete" 
                    onClick={() => deleteVehicle(vehicle.id)}
                    title="Remove Vehicle"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- ADD VEHICLE MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Vehicle</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddVehicle}>
              <div className="form-group">
                <label>Vehicle Model (e.g., Maruti Swift)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter vehicle model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>License Plate Number</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., MH 02 AB 1234"
                  value={newVehicle.plate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Vehicle Type</label>
                <select 
                  value={newVehicle.type}
                  onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                >
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Auto Rickshaw">Auto Rickshaw</option>
                </select>
              </div>

              <button type="submit" className="btn-submit-vehicle">
                Save Vehicle
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyVehicles;