import React from 'react'
import { ProfileRow } from './ProfileRow'
import { User } from '@/types'

const UserDetailsCard = ({ user }: { user: User | null }) => {
    return (
        <div className="bg-card text-card-foreground rounded-2xl shadow-md border border-slate-200 p-8">

            <h2 className="text-lg font-semibold mb-6">
                Account Information
            </h2>

            <div className="space-y-5">

                <ProfileRow
                    label="Full Name"
                    value={user?.fullname || 'Not provided'}
                />

                <ProfileRow
                    label="Email Address"
                    value={user?.email}
                    badge="Verified"
                />

                <ProfileRow
                    label="Course"
                    value={user?.course.toUpperCase() || '-'}
                />

                <ProfileRow
                    label="Role"
                    value={user?.role.toUpperCase()}
                    badgeColor="bg-indigo-100 text-indigo-700"
                />

                <ProfileRow
                    label="Joined On"
                    value={
                        user?.created_at
                            ? new Date(user.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })
                            : '—'
                    }
                />

                <ProfileRow
                    label="Account Status"
                    value={user?.is_active ? 'Active' : 'Pending Verification'}
                    badgeColor={
                        user?.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                    }
                />

            </div>
        </div>
    )
}

export default UserDetailsCard
