import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Users, Calendar, FileText, Heart, GraduationCap, Image, 
  Settings, Globe, Newspaper, Video, Mic, Bell, Home,
  Edit, Trash2, Eye, Plus, Save, X, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [healthRequests, setHealthRequests] = useState([]);
  const [educationRequests, setEducationRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [realEstateRequests, setRealEstateRequests] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [videoNews, setVideoNews] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [resources, setResources] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: ''
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]'));
    setGrievances(JSON.parse(localStorage.getItem('grievances') || '[]'));
    setHealthRequests(JSON.parse(localStorage.getItem('healthRequests') || '[]'));
    setEducationRequests(JSON.parse(localStorage.getItem('educationRequests') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
    setGalleryImages(JSON.parse(localStorage.getItem('galleryImages') || '[]'));
    setRealEstateRequests(JSON.parse(localStorage.getItem('realEstateRequests') || '[]'));
    setNewsArticles(JSON.parse(localStorage.getItem('newsArticles') || '[]'));
    setVideoNews(JSON.parse(localStorage.getItem('videoNews') || '[]'));
    setPodcasts(JSON.parse(localStorage.getItem('podcasts') || '[]'));
    setResources(JSON.parse(localStorage.getItem('resources') || '[]'));
    setSocialMediaLinks(JSON.parse(localStorage.getItem('socialMediaLinks') || '{}'));
  };

  const updateStatus = (type: string, id: string, newStatus: string) => {
    const storageKey = type === 'appointment' ? 'appointments' : 
                     type === 'grievance' ? 'grievances' :
                     type === 'health' ? 'healthRequests' : 
                     type === 'education' ? 'educationRequests' : 'realEstateRequests';
    
    const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedItems = items.map((item: any) => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    loadAllData();
  };

  const deleteItem = (type: string, id: string) => {
    const storageKey = type === 'appointment' ? 'appointments' : 
                     type === 'grievance' ? 'grievances' :
                     type === 'health' ? 'healthRequests' : 
                     type === 'education' ? 'educationRequests' :
                     type === 'realestate' ? 'realEstateRequests' :
                     type === 'news' ? 'newsArticles' :
                     type === 'video' ? 'videoNews' :
                     type === 'podcast' ? 'podcasts' :
                     type === 'resource' ? 'resources' : 'galleryImages';
    
    const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedItems = items.filter((item: any) => item.id !== id);
    
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    loadAllData();
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
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'grievances', label: 'Grievances', icon: FileText },
    { id: 'health', label: 'Health Support', icon: Heart },
    { id: 'education', label: 'Education Support', icon: GraduationCap },
    { id: 'realestate', label: 'Real Estate', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content Management', icon: Newspaper },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'social', label: 'Social Media', icon: Globe }
  ];

  const openModal = (type: string, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  const saveItem = (formData: any) => {
    const storageKey = modalType === 'news' ? 'newsArticles' :
                     modalType === 'video' ? 'videoNews' :
                     modalType === 'podcast' ? 'podcasts' :
                     modalType === 'resource' ? 'resources' : 'galleryImages';
    
    const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (editingItem) {
      const updatedItems = items.map((item: any) => 
        item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
      );
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      items.push(newItem);
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
    
    loadAllData();
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Manage all website content and user requests</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex flex-wrap border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{tab.label}</span>
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
                        <p className="text-red-100">Total Grievances</p>
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

                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100">Total Users</p>
                        <p className="text-2xl font-bold">{users.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-indigo-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100">Gallery Images</p>
                        <p className="text-2xl font-bold">{galleryImages.length}</p>
                      </div>
                      <Image className="w-8 h-8 text-yellow-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100">News Articles</p>
                        <p className="text-2xl font-bold">{newsArticles.length}</p>
                      </div>
                      <Newspaper className="w-8 h-8 text-pink-200" />
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Submissions</h3>
                  <div className="space-y-3">
                    {[...appointments, ...grievances, ...healthRequests, ...educationRequests, ...realEstateRequests]
                      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                      .slice(0, 10)
                      .map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {'ticketNumber' in item ? `Grievance #${item.ticketNumber}` :
                               'appointmentDate' in item ? `Appointment - ${item.fullName}` :
                               'assistanceType' in item ? `Health Support - ${item.fullName}` :
                               'studentName' in item ? `Education Support - ${item.studentName}` :
                               `Real Estate - ${item.fullName}`}
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

            {/* Appointments Management */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Appointment Management</h2>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment: any) => (
                          <tr key={appointment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{appointment.fullName}</div>
                                <div className="text-sm text-gray-500">{appointment.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(appointment.appointmentDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {appointment.purpose}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={appointment.status}
                                onChange={(e) => updateStatus('appointment', appointment.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => deleteItem('appointment', appointment.id)}
                                className="text-red-600 hover:text-red-900 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Grievances Management */}
            {activeTab === 'grievances' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Grievance Management</h2>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {grievances.map((grievance: any) => (
                          <tr key={grievance.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{grievance.ticketNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{grievance.fullName}</div>
                                <div className="text-sm text-gray-500">{grievance.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {grievance.grievanceType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={grievance.status}
                                onChange={(e) => updateStatus('grievance', grievance.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="submitted">Submitted</option>
                                <option value="under_review">Under Review</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => deleteItem('grievance', grievance.id)}
                                className="text-red-600 hover:text-red-900 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Real Estate Management */}
            {activeTab === 'realestate' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Real Estate Consultancy Management</h2>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultation</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {realEstateRequests.map((request: any) => (
                          <tr key={request.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{request.fullName}</div>
                                <div className="text-sm text-gray-500">{request.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {request.propertyType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {request.consultationType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={request.status}
                                onChange={(e) => updateStatus('realestate', request.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="submitted">Submitted</option>
                                <option value="under_review">Under Review</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => deleteItem('realestate', request.id)}
                                className="text-red-600 hover:text-red-900 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Content Management */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Content Management</h2>
                
                {/* News Articles */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">News Articles</h3>
                    <button
                      onClick={() => openModal('news')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Article</span>
                    </button>
                  </div>
                  
                  <div className="grid gap-4">
                    {newsArticles.map((article: any) => (
                      <div key={article.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img src={article.image} alt={article.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{article.title}</h4>
                          <p className="text-sm text-gray-600 truncate">{article.excerpt}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('news', article)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem('news', article.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video News */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Video News</h3>
                    <button
                      onClick={() => openModal('video')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Video</span>
                    </button>
                  </div>
                  
                  <div className="grid gap-4">
                    {videoNews.map((video: any) => (
                      <div key={video.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img src={video.thumbnail} alt={video.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{video.title}</h4>
                          <p className="text-sm text-gray-600">{video.duration} • {video.views} views</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('video', video)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem('video', video.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Podcasts */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Podcasts</h3>
                    <button
                      onClick={() => openModal('podcast')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Podcast</span>
                    </button>
                  </div>
                  
                  <div className="grid gap-4">
                    {podcasts.map((podcast: any) => (
                      <div key={podcast.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img src={podcast.thumbnail} alt={podcast.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{podcast.title}</h4>
                          <p className="text-sm text-gray-600">{podcast.duration} • {podcast.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('podcast', podcast)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem('podcast', podcast.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
                
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user: any) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date().toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for adding/editing content */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingItem ? 'Edit' : 'Add'} {modalType === 'news' ? 'News Article' : 
                   modalType === 'video' ? 'Video News' : 
                   modalType === 'podcast' ? 'Podcast' : 'Resource'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ContentForm 
                type={modalType} 
                item={editingItem} 
                onSave={saveItem} 
                onCancel={closeModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Content Form Component
const ContentForm: React.FC<{ type: string; item: any; onSave: (data: any) => void; onCancel: () => void }> = ({ 
  type, item, onSave, onCancel 
}) => {
  const [formData, setFormData] = useState(item || {
    title: '',
    excerpt: '',
    image: '',
    link: '',
    thumbnail: '',
    duration: '',
    views: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {type === 'news' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {type === 'news' ? 'Image URL' : 'Thumbnail URL'}
        </label>
        <input
          type="url"
          name={type === 'news' ? 'image' : 'thumbnail'}
          value={type === 'news' ? formData.image : formData.thumbnail}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {(type === 'video' || type === 'podcast') && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 12:45"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Views</label>
              <input
                type="text"
                name="views"
                value={formData.views}
                onChange={handleChange}
                placeholder="e.g., 15K"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {type === 'news' ? 'Article Link' : 'YouTube Link'}
        </label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4 inline mr-2" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminDashboard;