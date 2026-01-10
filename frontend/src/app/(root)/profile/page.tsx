'use client';
import Loader from '@/components/Loader';
import { ProfileRow } from '@/components/auth/ProfileRow';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  if(loading) return <Loader />

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 py-12 px-4 mt-15">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your personal account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">

          {/* Full Name */}
          <ProfileRow
            label="Full Name"
            value={user?.user_metadata?.full_name || 'Not provided'}
          />

          {/* Email */}
          <ProfileRow
            label="Email"
            value={user?.email}
            badge="Verified"
          />

          {/* Course */}
          <ProfileRow
            label="Course"
            value={user?.user_metadata?.course || 'B.Tech'}
          />

          {/* Role */}
          <ProfileRow
            label="Role"
            value="Student"
            badgeColor="bg-indigo-100 text-indigo-700"
          />

          {/* Account Status */}
          <ProfileRow
            label="Account Status"
            value={user?.email_confirmed_at ? 'Active' : 'Pending Verification'}
            badgeColor={
              user?.email_confirmed_at
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }
          />

        </div>

        {/* Footer Action */}
        <div className="mt-10 flex justify-end">
          <button
            className="rounded-lg bg-indigo-600 px-6 py-2.5
                       text-sm font-semibold text-white shadow-sm
                       hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>

      </div>
    </main>
  );
}