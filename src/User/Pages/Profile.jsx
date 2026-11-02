import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, Car, 
  Edit3, Save, X, LogOut, CheckCircle2, 
  Key, Smartphone, ChevronRight
} from 'lucide-react';
import './Styles/Profile.css';

const Profile = () => {
  // Mock User Data
  const [user, setUser] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Indiranagar, Bangalore, Karnataka 560038",
    joinedDate: "Jan 2024",
    vehicleModel: "Maruti Suzuki WagonR",
    vehicleNumber: "KA 01 AB 1234",
    fuelType: "CNG",
    initials: "RS"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      
      {/* Hero Banner */}
      <div className="profile-hero">
        <div className="profile-hero-content">
          <h1>Account Settings</h1>
          <p>Manage your personal details, vehicles, and security preferences.</p>
        </div>
      </div>

      <main className="profile-container">
        
        {/* Main Layout Grid */}
        <div className="profile-layout">
          
          {/* LEFT SIDEBAR */}
          <aside className="profile-sidebar">
            
            {/* Avatar & Identity Card */}
            <div className="sidebar-card identity-card">
              <div className="avatar-container">
                <div className="avatar-large">
                  {user.initials}
                </div>
                <button className="avatar-edit-btn" title="Update Photo">
                  <Edit3 size={14} />
                </button>
              </div>
              
              <h2 className="user-name">{user.name}</h2>
              <p className="user-email">{user.email}</p>
              
              <div className="identity-badge">
                <CheckCircle2 size={14} /> Verified Member
              </div>
              
              <div className="identity-meta">
                <span>Member since {user.joinedDate}</span>
              </div>
            </div>

            {/* Quick Navigation Sidebar (Optional but looks great) */}
            <div className="sidebar-card nav-card">
              <button className="side-nav-item active">
                <User size={18} /> Personal Info
              </button>
              <button className="side-nav-item">
                <Car size={18} /> My Vehicles
              </button>
              <button className="side-nav-item">
                <Shield size={18} /> Security
              </button>
            </div>

            <button className="btn-logout-large" onClick={() => alert("Logged out")}>
              <LogOut size={18} />
              Log Out
            </button>
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <div className="profile-main-content">
            
            {/* Personal Information Section */}
            <section className="settings-section">
              <div className="section-header">
                <div>
                  <h3>Personal Information</h3>
                  <p>Update your basic details below.</p>
                </div>
                {!isEditing ? (
                  <button className="btn-outline-green" onClick={() => setIsEditing(true)}>
                    <Edit3 size={16} /> Edit Details
                  </button>
                ) : (
                  <div className="edit-mode-actions">
                    <button className="btn-text-muted" onClick={handleCancel}>
                      <X size={16} /> Cancel
                    </button>
                    <button className="btn-solid-green" onClick={handleSave}>
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="form-grid-modern">
                {/* Floating Label Group */}
                <div className="input-group-modern">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  ) : (
                    <p className="read-only-value">{user.name}</p>
                  )}
                </div>

                <div className="input-group-modern">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                  ) : (
                    <p className="read-only-value">{user.email}</p>
                  )}
                </div>

                <div className="input-group-modern">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  ) : (
                    <p className="read-only-value">{user.phone}</p>
                  )}
                </div>

                <div className="input-group-modern full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                  ) : (
                    <p className="read-only-value">{user.address}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Vehicle Details Section */}
            <section className="settings-section">
              <div className="section-header">
                <div>
                  <h3>Registered Vehicle</h3>
                  <p>Your primary vehicle used for CNG fueling.</p>
                </div>
                <button className="btn-outline-green">
                  <Edit3 size={16} /> Update
                </button>
              </div>

              {/* Digital Vehicle Card Design */}
              <div className="vehicle-digital-card">
                <div className="v-card-left">
                  <div className="v-card-chip"></div>
                  <Car size={32} color="white" opacity={0.8} />
                  <p className="v-card-number">{user.vehicleNumber}</p>
                </div>
                <div className="v-card-right">
                  <div className="v-info-row">
                    <span>Model</span>
                    <strong>{user.vehicleModel}</strong>
                  </div>
                  <div className="v-info-row">
                    <span>Fuel Type</span>
                    <strong className="text-green">{user.fuelType}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section className="settings-section">
              <div className="section-header">
                <div>
                  <h3>Security & Login</h3>
                  <p>Keep your account safe and secure.</p>
                </div>
              </div>

              <div className="security-list">
                <div className="security-item">
                  <div className="security-icon-box">
                    <Key size={20} color="#059669" />
                  </div>
                  <div className="security-text">
                    <h4>Password</h4>
                    <p>Last changed 3 months ago</p>
                  </div>
                  <button className="btn-text-arrow">
                    Change <ChevronRight size={16} />
                  </button>
                </div>

                <div className="security-item">
                  <div className="security-icon-box">
                    <Smartphone size={20} color="#2563eb" />
                  </div>
                  <div className="security-text">
                    <h4>Two-Factor Authentication</h4>
                    <p>Currently disabled. Add extra security.</p>
                  </div>
                  <button className="btn-text-arrow">
                    Enable <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;