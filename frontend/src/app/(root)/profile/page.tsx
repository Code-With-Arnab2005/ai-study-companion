'use client';
import Loader from '@/components/Loader';
import UserDetailsCard from '@/components/auth/UserDetailsCard';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth-actions';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await getCurrentUser();
      if (!res?.data) {
        toast.error("Something went wrong");
        return;
      }
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setUser(res.data.user);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 py-14 px-4 mt-15">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex flex-col sm:flex-row gap-6 items-center">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center
                          text-white text-3xl font-bold shadow">
            {user?.avatar_url || ""}
          </div>

          {/* Identity */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900">
              {user?.fullname || 'Student'}
            </h1>
            <p className="text-sm text-slate-500">
              {user?.email}
            </p>

            <div className="mt-2 inline-flex items-center rounded-full
                            bg-green-100 text-green-700
                            px-3 py-1 text-xs font-medium">
              Active Account
            </div>
          </div>

        </div>

        {/* DETAILS CARD */}
        <UserDetailsCard user={user} />

        {/* APP USAGE / STATS CARD */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">

          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            App Activity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

            <div className="rounded-xl bg-slate-50 border p-5">
              <p className="text-2xl font-bold text-indigo-600">—</p>
              <p className="text-sm text-slate-500 mt-1">Subjects Created</p>
            </div>

            <div className="rounded-xl bg-slate-50 border p-5">
              <p className="text-2xl font-bold text-indigo-600">—</p>
              <p className="text-sm text-slate-500 mt-1">Documents Uploaded</p>
            </div>

            <div className="rounded-xl bg-slate-50 border p-5">
              <p className="text-2xl font-bold text-indigo-600">—</p>
              <p className="text-sm text-slate-500 mt-1">AI Sessions</p>
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.push("/update-password")}
            className='hover:cursor-pointer from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]'
          >
            Change Password
          </Button>

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
