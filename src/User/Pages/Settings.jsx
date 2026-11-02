import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Bell, Globe, Moon, 
  ShieldAlert, Trash2, Save, MonitorSmartphone 
} from 'lucide-react';
import './Styles/Settings.css';

const Settings = () => {
  // State for toggles
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    queueAlerts: true,
    darkMode: false,
    language: "English",
    timezone: "IST (UTC+05:30)"
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Here you would send the data to your backend
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      
      <main className="settings-container">
        
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your app preferences and notification alerts.</p>
        </div>

        <div className="settings-layout">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="settings-sidebar">
            <nav className="settings-nav">
              <a href="#general" className="nav-item active">
                <SettingsIcon size={18} /> General
              </a>
              <a href="#notifications" className="nav-item">
                <Bell size={18} /> Notifications
              </a>
              <a href="#preferences" className="nav-item">
                <MonitorSmartphone size={18} /> App Preferences
              </a>
              <a href="#danger" className="nav-item danger">
                <ShieldAlert size={18} /> Danger Zone
              </a>
            </nav>
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <div className="settings-content">
            
            {/* GENERAL SECTION */}
            <section id="general" className="settings-card">
              <div className="card-header">
                <h3>General Settings</h3>
                <p>Basic configurations for your account.</p>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <label>Language</label>
                  <p>Select your preferred language.</p>
                </div>
                <select 
                  name="language" 
                  value={settings.language} 
                  onChange={handleChange}
                  className="setting-select"
                >
                  <option>English</option>
                  <option>Hindi (हिंदी)</option>
                  <option>Kannada (ಕನ್ನಡ)</option>
                  <option>Tamil (தமிழ்)</option>
                </select>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <label>Timezone</label>
                  <p>Adjust times for bookings and queues.</p>
                </div>
                <select 
                  name="timezone" 
                  value={settings.timezone} 
                  onChange={handleChange}
                  className="setting-select"
                >
                  <option>IST (UTC+05:30)</option>
                  <option>UTC</option>
                </select>
              </div>
            </section>

            {/* NOTIFICATIONS SECTION */}
            <section id="notifications" className="settings-card">
              <div className="card-header">
                <h3>Notifications</h3>
                <p>Choose how you want to be alerted.</p>
              </div>

              {/* Toggle Row 1 */}
              <div className="setting-row">
                <div className="setting-info">
                  <label>Email Notifications</label>
                  <p>Receive booking receipts and updates via email.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications} 
                    onChange={() => handleToggle('emailNotifications')} 
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Toggle Row 2 */}
              <div className="setting-row">
                <div className="setting-info">
                  <label>SMS Notifications</label>
                  <p>Get text messages for urgent queue updates.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.smsNotifications} 
                    onChange={() => handleToggle('smsNotifications')} 
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Toggle Row 3 */}
              <div className="setting-row">
                <div className="setting-info">
                  <label>Live Queue Alerts</label>
                  <p>Notify me when my turn is 5 minutes away.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.queueAlerts} 
                    onChange={() => handleToggle('queueAlerts')} 
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </section>

            {/* APP PREFERENCES SECTION */}
            <section id="preferences" className="settings-card">
              <div className="card-header">
                <h3>App Preferences</h3>
                <p>Customize your viewing experience.</p>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <label>Dark Mode</label>
                  <p>Switch to a darker theme for night driving.</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.darkMode} 
                    onChange={() => handleToggle('darkMode')} 
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </section>

            {/* DANGER ZONE */}
            <section id="danger" className="settings-card danger-card">
              <div className="card-header">
                <h3 style={{ color: '#b91c1c' }}>Danger Zone</h3>
                <p>Irreversible actions for your account.</p>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <label style={{ color: '#dc2626' }}>Delete Account</label>
                  <p>Once you delete your account, there is no going back.</p>
                </div>
                <button className="btn-danger" onClick={() => alert("Account deletion requested")}>
                  <Trash2 size={16} /> Delete Account
                </button>
              </div>
            </section>

            {/* SAVE BUTTON */}
            <div className="save-footer">
              <button className="btn-primary-green" onClick={handleSave}>
                <Save size={18} /> Save All Settings
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;