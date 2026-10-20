import React, { useState } from 'react';
import { X, User, School, Hash, Layers, Check } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSaveProfile: (updatedProfile: StudentProfile) => void;
}

const AVATARS = [
  { id: 'detective-1', label: 'Detektif Topi', emoji: '🕵️‍♂️' },
  { id: 'detective-2', label: 'Detektif Kaca Pembesar', emoji: '🕵️‍♀️' },
  { id: 'detective-3', label: 'Peneliti Naskah', emoji: '📜' },
  { id: 'detective-4', label: 'Arsiparis Misteri', emoji: '📁' },
  { id: 'detective-5', label: 'Pemburu Kosa Kata', emoji: '🦉' },
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [className, setClassName] = useState(currentProfile.className);
  const [studentNumber, setStudentNumber] = useState(currentProfile.studentNumber);
  const [schoolName, setSchoolName] = useState(currentProfile.schoolName);
  const [avatarId, setAvatarId] = useState(currentProfile.avatarId);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...currentProfile,
      name: name.trim() || 'Peserta Didik',
      className: className.trim() || 'X',
      studentNumber: studentNumber.trim() || '-',
      schoolName: schoolName.trim() || 'SMA',
      avatarId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Identitas Detektif Pemburu Bahasa</h3>
            <p className="text-xs text-slate-400">Data ini akan tercantum di rapor nilai otomatis</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
              Pilih Lencana Avatar
            </label>
            <div className="flex items-center space-x-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => setAvatarId(av.id)}
                  className={`flex-1 py-2 px-1 text-2xl rounded-xl border flex flex-col items-center justify-center transition-all ${
                    avatarId === av.id
                      ? 'bg-amber-500/20 border-amber-500 scale-105 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  }`}
                  title={av.label}
                >
                  <span>{av.emoji}</span>
                  <span className="text-[9px] text-slate-400 mt-1 truncate max-w-full">
                    {av.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Nama Peserta Didik */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Nama Lengkap Peserta Didik</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Arya Satria Pratama"
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          {/* Kelas & No Absen */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Kelas</span>
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Contoh: X IPS 2"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <span>No. Absen / NIS</span>
              </label>
              <input
                type="text"
                required
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="Contoh: 07"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Nama Sekolah */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-amber-400" />
              <span>Nama Sekolah / Instansi</span>
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Contoh: SMA Negeri 1 Pemburu Bahasa"
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Identitas Detektif</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
