import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Bell, Calendar, ExternalLink, FileText, Download, Search, Filter } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'announcement' | 'scheme' | 'event' | 'press_release';
  description: string;
  date: string;
  link?: string;
  downloadUrl?: string;
  priority: 'high' | 'medium' | 'low';
}

const Resources: React.FC = () => {
  const { t } = useLanguage();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Load resources from localStorage or use default data
    const savedResources = JSON.parse(localStorage.getItem('resources') || '[]');
    if (savedResources.length > 0) {
      setResources(savedResources);
      setFilteredResources(savedResources);
    } else {
      // Default resources data
      const defaultResources: Resource[] = [
        {
          id: '1',
          title: 'New Digital Governance Initiative Launched',
          type: 'announcement',
          description: 'Government launches comprehensive digital governance platform to streamline public services and improve citizen experience.',
          date: '2024-12-10',
          link: '#',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Scholarship Scheme for Meritorious Students',
          type: 'scheme',
          description: 'Application process opens for merit-based scholarships covering tuition fees and living expenses for deserving students.',
          date: '2024-12-09',
          link: '#',
          downloadUrl: '#',
          priority: 'high'
        },
        {
          id: '3',
          title: 'Public Health Camp - December 2024',
          type: 'event',
          description: 'Free medical checkups and health awareness program scheduled for rural areas. Registration required.',
          date: '2024-12-08',
          link: '#',
          priority: 'medium'
        },
        {
          id: '4',
          title: 'Infrastructure Development Progress Report',
          type: 'press_release',
          description: 'Quarterly progress report on ongoing infrastructure projects including roads, bridges, and public facilities.',
          date: '2024-12-07',
          downloadUrl: '#',
          priority: 'medium'
        },
        {
          id: '5',
          title: 'Employment Generation Program 2024',
          type: 'scheme',
          description: 'New employment opportunities created through skill development and entrepreneurship support programs.',
          date: '2024-12-06',
          link: '#',
          priority: 'high'
        },
        {
          id: '6',
          title: 'Environmental Conservation Initiative',
          type: 'announcement',
          description: 'Launch of tree plantation drive and waste management program across all districts.',
          date: '2024-12-05',
          link: '#',
          priority: 'medium'
        },
        {
          id: '7',
          title: 'Digital Literacy Workshop Series',
          type: 'event',
          description: 'Free computer and internet training sessions for senior citizens and rural communities.',
          date: '2024-12-04',
          link: '#',
          priority: 'low'
        },
        {
          id: '8',
          title: 'Budget Allocation for Education Sector',
          type: 'press_release',
          description: 'Increased budget allocation announced for education infrastructure and teacher training programs.',
          date: '2024-12-03',
          downloadUrl: '#',
          priority: 'high'
        },
        {
          id: '9',
          title: 'Women Empowerment Scheme',
          type: 'scheme',
          description: 'Financial assistance and skill development programs specifically designed for women entrepreneurs.',
          date: '2024-12-02',
          link: '#',
          downloadUrl: '#',
          priority: 'high'
        },
        {
          id: '10',
          title: 'Road Safety Awareness Campaign',
          type: 'event',
          description: 'State-wide campaign to promote road safety awareness and reduce traffic accidents.',
          date: '2024-12-01',
          link: '#',
          priority: 'medium'
        },
        {
          id: '11',
          title: 'Agricultural Subsidy Program Update',
          type: 'announcement',
          description: 'Updated guidelines and increased subsidy rates for farmers and agricultural equipment.',
          date: '2024-11-30',
          link: '#',
          priority: 'high'
        },
        {
          id: '12',
          title: 'Healthcare Infrastructure Development',
          type: 'press_release',
          description: 'New hospitals and primary health centers inaugurated in remote areas to improve healthcare access.',
          date: '2024-11-29',
          downloadUrl: '#',
          priority: 'medium'
        }
      ];
      setResources(defaultResources);
      setFilteredResources(defaultResources);
    }
  }, []);

  useEffect(() => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Sort by date (newest first) and priority
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateB - dateA;
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    setFilteredResources(filtered);
    setCurrentPage(1);
  }, [resources, searchTerm, selectedType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Bell className="w-5 h-5" />;
      case 'scheme':
        return <FileText className="w-5 h-5" />;
      case 'event':
        return <Calendar className="w-5 h-5" />;
      case 'press_release':
        return <Download className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800';
      case 'scheme':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'press_release':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResources = filteredResources.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('resources')}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with official announcements, government schemes, upcoming events, 
            and press releases. All important information in one place.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                <option value="all">All Types</option>
                <option value="announcement">Announcements</option>
                <option value="scheme">Schemes</option>
                <option value="event">Events</option>
                <option value="press_release">Press Releases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Scrolling Notice Board Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6" />
              <div className="overflow-hidden flex-1">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-lg font-semibold">
                    🔔 Latest Updates: Digital Governance Initiative • Scholarship Applications Open • Health Camp Registration • Infrastructure Progress Report • Employment Programs Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title & Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                        <span>{formatType(resource.type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(resource.priority)}`}>
                        {resource.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(resource.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {resource.link && (
                          <a
                            href={resource.link}
                            className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View</span>
                          </a>
                        )}
                        {resource.downloadUrl && (
                          <a
                            href={resource.downloadUrl}
                            className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                            download
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Resources Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedType !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Resources will appear here once they are added by the administrator.'
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredResources.length)} of {filteredResources.length} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? 'text-blue-600 bg-blue-50 border border-blue-300'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {resources.filter(r => r.type === 'announcement').length}
            </div>
            <div className="text-gray-600 text-sm">Announcements</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {resources.filter(r => r.type === 'scheme').length}
            </div>
            <div className="text-gray-600 text-sm">Schemes</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {resources.filter(r => r.type === 'event').length}
            </div>
            <div className="text-gray-600 text-sm">Events</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {resources.filter(r => r.type === 'press_release').length}
            </div>
            <div className="text-gray-600 text-sm">Press Releases</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Resources;