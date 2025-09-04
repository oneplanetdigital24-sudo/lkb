import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, FileText, Heart, GraduationCap, Mail, Clock, CheckCircle, AlertCircle, User, Phone, MapPin, Home } from 'lucide-react';

interface Appointment {
  id: string;
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  appointmentDate: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  submittedAt: string;
}

interface Grievance {
  id: string;
  ticketNumber: string;
  fullName: string;
  contactNumber: string;
  email: string;
  grievanceType: string;
  description: string;
  status: 'submitted' | 'under_review' | 'resolved' | 'closed';
  submittedAt: string;
}

interface HealthRequest {
  id: string;
  fullName: string;
  age: string;
  gender: string;
  mobile: string;
  email: string;
  assistanceType: string;
  description: string;
  status: 'submitted' | 'processing' | 'approved' | 'completed';
  submittedAt: string;
}

interface EducationRequest {
  id: string;
  studentName: string;
  dateOfBirth: string;
  parentName: string;
  contactNumber: string;
  email: string;
  institutionName: string;
  requestType: string;
  details: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
}

interface RealEstateRequest {
  id: string;
  fullName: string;
  contactNumber: string;
  email: string;
  address: string;
  propertyType: string;
  consultationType: string;
  propertyLocation: string;
  budgetRange: string;
  description: string;
  status: 'submitted' | 'under_review' | 'in_progress' | 'completed';
  submittedAt: string;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [healthRequests, setHealthRequests] = useState<HealthRequest[]>([]);
  const [educationRequests, setEducationRequests] = useState<EducationRequest[]>([]);
  const [realEstateRequests, setRealEstateRequests] = useState<RealEstateRequest[]>([]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = () => {
    // Load appointments
    const userAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      .filter((apt: any) => apt.userId === user?.id);
    setAppointments(userAppointments);

    // Load grievances
    const userGrievances = JSON.parse(localStorage.getItem('grievances') || '[]')
      .filter((grv: any) => grv.userId === user?.id);
    setGrievances(userGrievances);

    // Load health requests
    const userHealthRequests = JSON.parse(localStorage.getItem('healthRequests') || '[]')
      .filter((req: any) => req.userId === user?.id);
    setHealthRequests(userHealthRequests);

    // Load education requests
    const userEducationRequests = JSON.parse(localStorage.getItem('educationRequests') || '[]')
      .filter((req: any) => req.userId === user?.id);
    setEducationRequests(userEducationRequests);

    // Load real estate requests
    const userRealEstateRequests = JSON.parse(localStorage.getItem('realEstateRequests') || '[]')
      .filter((req: any) => req.userId === user?.id);
    setRealEstateRequests(userRealEstateRequests);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under_review':
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'rejected':
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'submitted':
      case 'under_review':
      case 'processing':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'grievances', label: 'Grievances', icon: FileText },
    { id: 'health', label: 'Health Support', icon: Heart },
    { id: 'education', label: 'Education Support', icon: GraduationCap },
    { id: 'realestate', label: 'Real Estate', icon: Home }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h1>
              <p className="text-gray-600">Manage your services and track your requests</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Appointments</p>
                        <p className="text-2xl font-bold">{appointments.length}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100">Grievances</p>
                        <p className="text-2xl font-bold">{grievances.length}</p>
                      </div>
                      <FileText className="w-8 h-8 text-red-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Health Requests</p>
                        <p className="text-2xl font-bold">{healthRequests.length}</p>
                      </div>
                      <Heart className="w-8 h-8 text-green-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Education Requests</p>
                        <p className="text-2xl font-bold">{educationRequests.length}</p>
                      </div>
                      <GraduationCap className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-100">Real Estate Requests</p>
                        <p className="text-2xl font-bold">{realEstateRequests.length}</p>
                      </div>
                      <Home className="w-8 h-8 text-teal-200" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[...appointments, ...grievances, ...healthRequests, ...educationRequests, ...realEstateRequests]
                      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                      .slice(0, 5)
                      .map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {'ticketNumber' in item ? `Grievance #${item.ticketNumber}` :
                               'appointmentDate' in item ? 'Appointment Request' :
                               'assistanceType' in item ? 'Health Support Request' :
                               'requestType' in item ? 'Education Support Request' :
                               'Real Estate Consultancy Request'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(item.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">My Appointments</h2>
                
                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments found</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{appointment.fullName}</h3>
                            <p className="text-gray-600">Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{appointment.mobile}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{appointment.email}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Purpose:</p>
                          <p className="text-gray-800">{appointment.purpose}</p>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Submitted: {new Date(appointment.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Grievances Tab */}
            {activeTab === 'grievances' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">My Grievances</h2>
                
                {grievances.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No grievances found</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {grievances.map((grievance) => (
                      <div key={grievance.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">Ticket #{grievance.ticketNumber}</h3>
                            <p className="text-gray-600">{grievance.grievanceType}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(grievance.status)}`}>
                            {grievance.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{grievance.contactNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{grievance.email}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Description:</p>
                          <p className="text-gray-800">{grievance.description}</p>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Submitted: {new Date(grievance.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Health Support Tab */}
            {activeTab === 'health' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Health Support Requests</h2>
                
                {healthRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No health support requests found</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {healthRequests.map((request) => (
                      <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{request.fullName}</h3>
                            <p className="text-gray-600">{request.assistanceType}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Age: {request.age}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.mobile}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.email}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Description:</p>
                          <p className="text-gray-800">{request.description}</p>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Submitted: {new Date(request.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Education Support Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Education Support Requests</h2>
                
                {educationRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No education support requests found</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {educationRequests.map((request) => (
                      <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{request.studentName}</h3>
                            <p className="text-gray-600">{request.requestType}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Parent: {request.parentName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.contactNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.institutionName}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Details:</p>
                          <p className="text-gray-800">{request.details}</p>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Submitted: {new Date(request.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Real Estate Tab */}
            {activeTab === 'realestate' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Real Estate Consultancy Requests</h2>
                
                {realEstateRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No real estate consultancy requests found</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {realEstateRequests.map((request) => (
                      <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{request.fullName}</h3>
                            <p className="text-gray-600">{request.consultationType} - {request.propertyType}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.contactNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{request.propertyLocation}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Description:</p>
                          <p className="text-gray-800">{request.description}</p>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Submitted: {new Date(request.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;