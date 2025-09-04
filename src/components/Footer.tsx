import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  FLAT NO 303, RAJNANDINI HEIGHT, BANPHOOL PATH, <br />
                  HATIGAON ROAD, GUWAHATI<br />
                 ASSAM
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">+91 361 2345678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">office@luitkumarbarman.org</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/appointment" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('appointment')}
                </Link>
              </li>
              <li>
                <Link to="/services/grievance" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('grievance')}
                </Link>
              </li>
              <li>
                <Link to="/services/health" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('health')}
                </Link>
              </li>
              <li>
                <Link to="/services/education" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('education')}
                </Link>
              </li>
              <li>
                <Link to="/services/invitation" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Invitation Request
                </Link>
              </li>
              <li>
                <Link to="/services/real-estate" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Real Estate Consultancy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('gallery')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('resources')}
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  {t('about')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('followUs')}</h3>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/luit_kumar_barman_?igsh=OWF4Mno0NnpwemIy" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/luit_kumar_barman_?igsh=OWF4Mno0NnpwemIy" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              {/* <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a> */}
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Stay connected for latest updates and announcements
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 LKB. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;