import { User, Mail, Phone, MapPin, Award, Settings } from 'lucide-react';

export default function ProfilePage() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate learner and tech enthusiast',
    joinDate: 'January 2024',
    profileImage: 'https://i.pravatar.cc/150?img=7',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 h-32" />

          <div className="px-8 pb-8">
            {/* Profile Image and Info */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{user.bio}</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-300 dark:border-gray-700 mb-8">
              <div className="flex gap-8">
                <button className="pb-4 font-semibold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400">
                  About
                </button>
                <button className="pb-4 font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Certificates
                </button>
                <button className="pb-4 font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Settings
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <User size={20} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail size={20} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone size={20} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin size={20} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{user.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Learning Stats
                </h2>

                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <Award size={20} className="text-blue-600 dark:text-blue-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">{user.joinDate}</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <Award size={20} className="text-green-600 dark:text-green-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Certificates Earned</p>
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">3</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <Award size={20} className="text-purple-600 dark:text-purple-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">12 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
                <Settings size={20} />
                Edit Profile
              </button>
              <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
