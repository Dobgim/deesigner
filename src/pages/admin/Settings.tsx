import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { changeCredentials, getUsername, logout } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(getUsername());
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    const result = changeCredentials(currentPassword, newUsername, newPassword);
    if (!result.ok) {
      setMessage({ type: 'error', text: result.error ?? 'Could not update credentials.' });
      return;
    }

    setMessage({
      type: 'success',
      text: 'Credentials updated successfully. Please sign in again with your new password.',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Force re-login with new credentials after a short delay
    setTimeout(() => {
      logout();
      navigate('/admin/login', { replace: true });
    }, 2000);
  };

  const inputCls =
    'w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all';

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-secondary tracking-tight flex items-center gap-2">
          <SettingsIcon className="text-primary" /> Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">Manage your admin account credentials.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck size={18} className="text-primary" />
          <h3 className="font-extrabold text-secondary">Account Security</h3>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          {message && (
            <div
              className={`text-sm px-4 py-3 rounded-xl flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 size={16} className="flex-shrink-0" />
              ) : (
                <AlertCircle size={16} className="flex-shrink-0" />
              )}
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Username</label>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className={inputCls}
              placeholder="admin"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Current Password *
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputCls}
              placeholder="Enter current password"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                New Password *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputCls}
                placeholder="At least 6 characters"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Confirm New Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputCls}
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            <KeyRound size={16} /> Update Credentials
          </button>
        </form>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-sm text-amber-800 flex items-start gap-3">
        <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
        <p>
          Credentials are stored in this browser only (no server). If you clear your browser data,
          the login resets to the default credentials.
        </p>
      </div>
    </div>
  );
};

export default Settings;
