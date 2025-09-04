import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Image, Heart, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: language === 'en' ? 'Community Event' : 'सामुदायिक कार्यक्रम',
      description: language === 'en' ? 'Annual community gathering' : 'वार्षिक सामुदायिक सभा'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: language === 'en' ? 'Public Service' : 'सार्वजनिक सेवा',
      description: language === 'en' ? 'Serving the community' : 'समुदाय की सेवा'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: language === 'en' ? 'Development Projects' : 'विकास परियोजनाएं',
      description: language === 'en' ? 'Infrastructure development' : 'बुनियादी ढांचे का विकास'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: language === 'en' ? 'Education Initiative' : 'शिक्षा पहल',
      description: language === 'en' ? 'Supporting local education' : 'स्थानीय शिक्षा का समर्थन'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: language === 'en' ? 'Healthcare Program' : 'स्वास्थ्य कार्यक्रम',
      description: language === 'en' ? 'Community health services' : 'सामुदायिक स्वास्थ्य सेवाएं'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: language === 'en' ? 'Youth Programs' : 'युवा कार्यक्रम',
      description: language === 'en' ? 'Empowering the next generation' : 'अगली पीढ़ी को सशक्त बनाना'
    }
  ];

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Image className="w-16 h-16 mr-4" />
            <h1 className="text-5xl font-bold">
              {language === 'en' ? 'Photo Gallery' : 'फोटो गैलरी'}
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Explore moments captured from our community events, development projects, and public service initiatives'
              : 'हमारे सामुदायिक कार्यक्रमों, विकास परियोजनाओं और सार्वजनिक सेवा पहलों से कैप्चर किए गए क्षणों का अन्वेषण करें'
            }
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => openLightbox(index)}
                      className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleLike(image.id)}
                      className={`backdrop-blur-sm p-2 rounded-full transition-colors duration-200 ${
                        likedImages.has(image.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">
                      {language === 'en' ? 'Recent' : 'हाल का'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-white/80">
                  {galleryImages[selectedImage].description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/60 text-sm">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                  <button
                    onClick={() => toggleLike(galleryImages[selectedImage].id)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors duration-200 ${
                      likedImages.has(galleryImages[selectedImage].id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedImages.has(galleryImages[selectedImage].id) ? 'fill-current' : ''}`} />
                    <span className="text-sm">
                      {likedImages.has(galleryImages[selectedImage].id) 
                        ? (language === 'en' ? 'Liked' : 'पसंद किया') 
                        : (language === 'en' ? 'Like' : 'पसंद करें')
                      }
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;