import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Globe, Save, Edit, Plus, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LanguageManager: React.FC = () => {
  const { content, updateContent, currentLanguage } = useLanguage();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newTranslations, setNewTranslations] = useState({
    en: '',
    as: '',
    hi: ''
  });
  const [editTranslations, setEditTranslations] = useState({
    en: '',
    as: '',
    hi: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const filteredContent = Object.entries(content).filter(([key]) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (key: string) => {
    setEditingKey(key);
    setEditTranslations(content[key]);
  };

  const handleSave = (key: string) => {
    updateContent(key, editTranslations);
    setEditingKey(null);
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditTranslations({ en: '', as: '', hi: '' });
  };

  const handleAdd = () => {
    if (newKey && newTranslations.en && newTranslations.as && newTranslations.hi) {
      updateContent(newKey, newTranslations);
      setNewKey('');
      setNewTranslations({ en: '', as: '', hi: '' });
    }
  };

  const handleDelete = (key: string) => {
    if (confirm(`Are you sure you want to delete the translation for "${key}"?`)) {
      const updatedContent = { ...content };
      delete updatedContent[key];
      // Note: In a real app, you'd need a way to remove content from the context
      // For now, we'll just show an alert
      alert('Delete functionality would be implemented in the context');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Language Manager</h1>
            <p className="text-gray-600 text-lg">Manage translations for English, Assamese, and Hindi</p>
          </div>

          {/* Add New Translation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-3 text-green-600" />
              Add New Translation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key</label>
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., welcomeMessage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">English</label>
                <input
                  type="text"
                  value={newTranslations.en}
                  onChange={(e) => setNewTranslations(prev => ({ ...prev, en: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="English translation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assamese</label>
                <input
                  type="text"
                  value={newTranslations.as}
                  onChange={(e) => setNewTranslations(prev => ({ ...prev, as: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="অসমীয়া অনুবাদ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hindi</label>
                <input
                  type="text"
                  value={newTranslations.hi}
                  onChange={(e) => setNewTranslations(prev => ({ ...prev, hi: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="हिंदी अनुवाद"
                />
              </div>
            </div>
            
            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Translation</span>
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search translation keys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Translations List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      English
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assamese
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hindi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContent.map(([key, translations]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {key}
                      </td>
                      {editingKey === key ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editTranslations.en}
                              onChange={(e) => setEditTranslations(prev => ({ ...prev, en: e.target.value }))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editTranslations.as}
                              onChange={(e) => setEditTranslations(prev => ({ ...prev, as: e.target.value }))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editTranslations.hi}
                              onChange={(e) => setEditTranslations(prev => ({ ...prev, hi: e.target.value }))}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSave(key)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {translations.en}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {translations.as}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {translations.hi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(key)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(key)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No translations found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search criteria.' : 'Start by adding your first translation.'}
                </p>
              </div>
            )}
          </div>

          {/* Language Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">EN</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {Object.keys(content).length}
              </div>
              <div className="text-gray-600 text-sm">English Translations</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">AS</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {Object.values(content).filter(t => t.as).length}
              </div>
              <div className="text-gray-600 text-sm">Assamese Translations</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-lg">HI</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {Object.values(content).filter(t => t.hi).length}
              </div>
              <div className="text-gray-600 text-sm">Hindi Translations</div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Usage Instructions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
              <div>
                <h4 className="font-medium mb-2">Adding Translations:</h4>
                <ul className="space-y-1">
                  <li>• Use descriptive keys (e.g., 'welcomeMessage', 'contactInfo')</li>
                  <li>• Provide translations for all three languages</li>
                  <li>• Keep translations consistent in meaning</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices:</h4>
                <ul className="space-y-1">
                  <li>• Use camelCase for keys</li>
                  <li>• Test translations on the website</li>
                  <li>• Keep text length similar across languages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageManager;