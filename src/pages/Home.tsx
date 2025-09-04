import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Play, Calendar, Eye, Heart, MessageCircle, Share2, Clock, Users, Home as HomeIcon, User, Image } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFollowTab, setActiveFollowTab] = useState('All');
  const [activeNewsTab, setActiveNewsTab] = useState('All');
  const [activeVideoTab, setActiveVideoTab] = useState('All');
  const [activePodcastTab, setActivePodcastTab] = useState('All');
  const [activeAboutTab, setActiveAboutTab] = useState('About Me');

  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Welcome to My Website : THE LKB',
      description: 'Serving our community with modern, efficient, and transparent solutions for a better tomorrow.'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Serving Our Community',
      description: 'Dedicated to providing excellent public services and fostering community development through innovative programs.'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Modern Technology',
      description: 'Embracing technology and digital transformation to create more accessible and efficient services.'
    }
  ];

  const socialPosts = [
    {
      id: 1,
      platform: 'Facebook',
      content: 'Happy to share Trust deed of “ ৰক্ষা” has been registered today. ৰাইজৰ আশীৰ্বাদত আমি আশা কৰো যে আমি ৰাইজক সেৱা কৰিব পাৰিম ',
      image: 'https://scontent.fgau1-3.fna.fbcdn.net/v/t39.30808-6/515501124_24046878221643289_5983247591207682282_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Tg2nLILBhOwQ7kNvwH9mIf6&_nc_oc=Adn2jvERWtPFQty4PPOlkK7OLmkn_-LLEL3OsV2MN0atd3j-_6Xzt7I8MgN-te6fR2Uoq_xA6nDc0utfH21XSxq6&_nc_zt=23&_nc_ht=scontent.fgau1-3.fna&_nc_gid=bRvg_ugcHXYbbWh9UjSing&oh=00_AfZhyNlflgfJstQww4Jov8LTRccD84kDWSCu4Ku055PgHg&oe=68BF548A',
      link: 'https://www.facebook.com/story.php?story_fbid=24046877708310007&id=100002433417790&mibextid=wwXIfr&rdid=cY5Q3TlpDYqLhx7L#',
      likes: 245,
      comments: 32,
      shares: 18,
      time: '1 Day ago'
    },


    
    {
      id: 2,
      platform: 'Facebook',
      content: ' Rahul Gandhi is not given the contract of the country alone. He has raised such a sensitive issue. As responsible citizens, we also have duty.',
      image: 'https://scontent.fgau1-4.fna.fbcdn.net/v/t39.30808-6/515502739_24401563529508088_3031132360328703751_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ct483EX0LawQ7kNvwHv3UMv&_nc_oc=AdmMtOgkjvg20IM9p7mMj6H3_NuElgTa1ufUw03DwW0fcnOftFjvAKxCLDhtOpBk5c3SSoWGp9wgQCAGJYmsVG-H&_nc_zt=23&_nc_ht=scontent.fgau1-4.fna&_nc_gid=VH0BqBy0bpRuKtGx9Csz6Q&oh=00_Afb7uw5H6kXJvczRW4-U_wGk3UFPYJ3GnZVYk2-7xTdbyg&oe=68BF6C90',
      link: 'https://www.facebook.com/share/p/16HchpD5Hg/?mibextid=wwXIfr',
      likes: 189,
      comments: 24,
      shares: 12,
      time: '4 hours ago'
    },
    {
      id: 3,
      platform: 'Facebook',
      content: 'Occupancy certificate দিওঁতে GMC বছৰ বছৰ যাব পাৰে কিন্তু RTI ৰ first appeal ৰ তাৰিখ কিন্তু ২ দিনতে hearing ৰ date দিছে। যদিও RTI Act 2005 মতে appellant মাতিব লাগে বুলি নিয়ম নাই কিন্তু natural justice ৰ বাবে সকলোৱে মাতে। ',
      image: 'https://scontent.fgau1-6.fna.fbcdn.net/v/t39.30808-6/514595096_24010862568578188_7607389513344244545_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=RSGSpcYrS_0Q7kNvwFpAeMM&_nc_oc=Adl9T2_AiAj0654zlZTsGvnyB66t78u7be1vxfDlRGJIk0gCzqbc4YKTj_z6090BaJ_RDVGU9vTZlqSHxOn1Jaa9&_nc_zt=23&_nc_ht=scontent.fgau1-6.fna&_nc_gid=B35hFYi0pkwNiChhBMjK5g&oh=00_AfYygdWpiCUhPKZIiHm0p9z8L8a-7IfalPndTogquTSqcg&oe=68BF46D7',
      link: 'https://www.facebook.com/story.php?story_fbid=9778770168880666&id=100002433417790&mibextid=wwXIfr&rdid=kKZNm31VU1GMamyV#',
      likes: 156,
      comments: 18,
      shares: 28,
      time: '6 hours ago'
    },
    {
      id: 4,
      platform: 'Facebook',
      content: 'GMC ত অফিচাৰৰ চহী হয় ২৫/০৩/২০২৫ ত আৰু issue হয় ২৩/৪/২০২৫। এনেকৈ চলি আছে GMC File ৰ date of application 13/3/2024 ত আৰু ১ বছৰ পিছত হে গম পালে যে FAR বেছি আছে। তাকো কিমান বেছি আছে সেইটোও লিখিব নোৱাৰিলে।',
      image: 'https://scontent.fgau1-4.fna.fbcdn.net/v/t39.30808-6/515210104_24010455641952214_7258915501411600861_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KUTdIwPocOAQ7kNvwF77ldV&_nc_oc=Admn5czVPquRA7l7WJafswiumFhryC5HppM54awcrNimKGHd51CoiyYe76UW3EHXAZJRmLguGefXohw1LepxRP5N&_nc_zt=23&_nc_ht=scontent.fgau1-4.fna&_nc_gid=n5M6om_GixLnPn6V3mNSkQ&oh=00_AfbqPf-xJlhloGD1INZp4OlHtopOVqRVBB8yW5IHHVn6YA&oe=68BF67BE',
      link: 'https://www.facebook.com/story.php?story_fbid=9714556611968689&id=100002433417790&mibextid=wwXIfr&rdid=N8N9iDPuwK9koMdt#',
      likes: 312,
      comments: 45,
      shares: 67,
      time: '8 hours ago'
    },
    {
      id: 5,
      platform: 'Facebook',
      content: 'ED Guwahati য়ে কালি কামাখ্যা দেৱোত্তৰ বৰ্ডৰ বিষয়ববীয়া কিছুমানৰ ঘৰত অভিযান চলায়। ২০০৩ ৰ পৰা ২০১৯ চনলৈ ৭.৬২ কোটিৰ অনিয়ম হৈছিল। ',
      image: 'https://scontent.fgau1-5.fna.fbcdn.net/v/t39.30808-6/514411221_24005078895823222_5354757537042435130_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2F2Ij0mkURMQ7kNvwG0ly2T&_nc_oc=AdnZBYKTw9GeaUs9E1kUbJFwT5716gOHqrgqsHa9Djs_t63ShKTEc8zUcZLjQ9m34ckHVSJ1HKMIQ2RBI6EipkOV&_nc_zt=23&_nc_ht=scontent.fgau1-5.fna&_nc_gid=zp7KpO6PYfmvyPU76t-vgg&oh=00_AfYI6LDx6hI6BDkPTT6reoP7BJg3Y4o7nnD3qOszls9SUQ&oe=68BF5DB1',
      link: 'https://www.facebook.com/story.php?story_fbid=9153866098037746&id=100002433417790&mibextid=wwXIfr&rdid=8u6EOG8yUFiywVi4#',
      likes: 198,
      comments: 29,
      shares: 15,
      time: '1 day ago'
    },
    {
      id: 6,
      platform: 'Facebook',
      content: 'নিজৰ কলমৰ বাবে আজি ২০২৪ বৰ্ষৰ e শিৰোমনি বটা প্ৰদান কৰে e সংবাদে। ধন্যবাদ থাকিল আৰু এই সন্মান যিহেতু চচিয়েল মেডিয়াৰ বাবে আহিছে, গতিকে এই সন্মান মই social media ৰ সকলো বন্ধু, followers ক dedicate কৰিলোঁ ',
      image: 'https://scontent.fgau1-6.fna.fbcdn.net/v/t39.30808-6/514790871_24003903889274056_7951641828885792567_n.jpg?stp=dst-jpg_p526x395_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CUIIwxb80MkQ7kNvwEzBlc5&_nc_oc=AdljXVTP7zkhSMpZsDxYzaKS5tKrcHUHPjFNnSRT2Y_YMtUpXRq-O16Lco_J5I_53fQSsZtzpjEUVLjOeWoVM1iS&_nc_zt=23&_nc_ht=scontent.fgau1-6.fna&_nc_gid=C8xAENWjlXbL9KmPbh_KOw&oh=00_AfZGd9HOvfwIHqCxB2RJfjTFFwsUKHRKD0TgkIVvfgzhfA&oe=68BF5130',
      link: 'https://www.facebook.com/story.php?story_fbid=8997734850317539&id=100002433417790&mibextid=wwXIfr&rdid=RGkQfMDsVlGPZAKl#',
      likes: 2267,
      comments: 38,
      shares: 22,
      time: '1 day ago'
    }
  ];

  const newsArticles = [
    {
      id: 1,
      category: 'News Articles',
      title: 'Assam Filmmaker Files Affidavit Supporting Rahul Gandhi Vote Rigging Claims',
      description: 'Comprehensive healthcare coverage for rural communities with mobile medical units and telemedicine services.',
      image: 'https://www.assamtimes.org/sites/default/files/styles/718x440/public/articles/luit%20kumar%20barman.png?itok=EIG09xrC',
      link: 'https://www.assamtimes.org/node/23501',
      date: '8/20/2025',
      views: '22.3k'
    },
    {
      id: 2,
      category: 'Education',
      title: 'Educational Scholarships Available',
      description: 'Merit-based scholarships for undergraduate and postgraduate students with financial assistance.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://education.gov.in/scholarships-2024',
      date: '1/12/2024',
      views: '1.8k'
    },
    {
      id: 3,
      category: 'Technology',
      title: 'Digital Literacy Program',
      description: 'Free computer training and digital skills development for senior citizens and rural communities.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://digitalindia.gov.in/literacy-program',
      date: '1/10/2024',
      views: '1.5k'
    },
    {
      id: 4,
      category: 'Infrastructure',
      title: 'Infrastructure Development Update',
      description: 'Progress report on road construction, bridge building, and public facility improvements.',
      image: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://infrastructure.gov.in/development-update',
      date: '1/8/2024',
      views: '3.1k'
    },
    {
      id: 5,
      category: 'Environment',
      title: 'Environmental Conservation Drive',
      description: 'Community tree plantation program and waste management initiatives showing positive results.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://environment.gov.in/conservation-drive',
      date: '1/5/2024',
      views: '2.7k'
    },
    {
      id: 6,
      category: 'Employment',
      title: 'Youth Employment Scheme',
      description: 'Job creation program for youth with comprehensive skill development and training support.',
      image: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://employment.gov.in/youth-scheme',
      date: '1/3/2024',
      views: '4.2k'
    }
  ];

  const videoNews = [
    {
      id: 1,
      category: '',
      title: 'আছুৰ প্ৰাক্তন সম্পাদক শংকৰজ্যোতি বৰুৱা সন্দৰ্ভত কি কলে লুইত কুমাৰ বৰ্মনে ?',
      thumbnail: 'https://img.youtube.com/vi/WMlhLpSGHSg/maxresdefault.jpg',
      link: 'https://www.youtube.com/watch?v=WMlhLpSGHSg',
      duration: '15:30',
      views: '5.2k',
      date: '2 days ago'
    },
    {
      id: 2,
      category: '',
      title: 'অসমীয়াৰ চিনেমাৰ ভাল দিন আহিছে নেকি? আজিৰ প্ৰশ্নত Boomba Ride ৰ প্ৰযোজক লুইত কুমাৰ বৰ্মন',
      thumbnail: 'https://img.youtube.com/vi/tTxxu8QJJ_4/maxresdefault.jpg',
      link: 'https://www.youtube.com/watch?v=tTxxu8QJJ_4',
      duration: '8:45',
      views: '3.8k',
      date: '3 days ago'
    },
    {
      id: 3,
      category: '',
      title: '📌লুইত কুমাৰ বৰ্মনৰ বহু নজনা কথা',
      thumbnail: 'https://scontent-fra3-1.xx.fbcdn.net/v/t15.5256-10/453892231_1237631371018307_2015268119694680216_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=be8305&_nc_ohc=PlCoiMAXhKAQ7kNvwEr2Pf6&_nc_oc=AdlASjNwGdpRnnv5nBnv4masijed7Fzj5zQ4Zajg1pGfuBoff5d3196OJk7Pcp0ccm0&_nc_zt=23&_nc_ht=scontent-fra3-1.xx&_nc_gid=7pAoaw8rtBKXeWFVpxsKSQ&oh=00_AfatBCA2IMinX2_U5JLcEhNJgDF1J1HIa4dXiK_G8VIxGw&oe=68BF6FA8',
      link: 'https://www.facebook.com/watch/?mibextid=WC7FNe&v=1011876583509983&rdid=39P36saVknGSc5sl',
      duration: '22:15',
      views: '7.1k',
      date: '5 days ago'
    }
  ];

  const podcasts = [
    {
      id: 1,
      category: 'Policy Discussion',
      title: 'Healthcare Reforms Discussion',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://spotify.com/healthcare-reforms-podcast',
      duration: '45:20',
      listens: '2.1k',
      date: '1 week ago'
    },
    {
      id: 2,
      category: 'Community Talk',
      title: 'Education System Improvements',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://spotify.com/education-improvements-podcast',
      duration: '38:15',
      listens: '1.8k',
      date: '1 week ago'
    },
    {
      id: 3,
      category: 'Expert Interview',
      title: 'Infrastructure Development Plans',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: 'https://spotify.com/infrastructure-plans-podcast',
      duration: '52:30',
      listens: '3.2k',
      date: '2 weeks ago'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'bg-blue-500';
      case 'Instagram': return 'bg-pink-500';
      case 'Twitter': return 'bg-sky-500';
      case 'LinkedIn': return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'News Articles': return 'bg-green-500';
      case 'Education': return 'bg-blue-500';
      case 'Technology': return 'bg-purple-500';
      case 'Infrastructure': return 'bg-orange-500';
      case 'Environment': return 'bg-emerald-500';
      case 'Employment': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredSocialPosts = activeFollowTab === 'All' 
    ? socialPosts 
    : socialPosts.filter(post => post.platform === activeFollowTab);

  const filteredNews = activeNewsTab === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeNewsTab);

  const filteredVideos = activeVideoTab === 'All' 
    ? videoNews 
    : videoNews.filter(video => video.category === activeVideoTab);

  const filteredPodcasts = activePodcastTab === 'All' 
    ? podcasts 
    : podcasts.filter(podcast => podcast.category === activePodcastTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60" />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl opacity-90">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Know More About Me
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn about my background, mission, and vision for serving the community
            </p>
          </div>

          {/* About Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['About Me', 'Mission', 'Vision'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAboutTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeAboutTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-lg" />
              <img
                src="https://scontent.fgau1-1.fna.fbcdn.net/v/t39.30808-6/535812600_122125005848925399_3281676038567616599_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=MfNIaZNaN1AQ7kNvwFD2uJ3&_nc_oc=AdlzrrR_1oPP97FsCrF_P7miusLTRsdct3Mx9hIUCBFasB3Jm83xvq_zOiokTH6V7AGrpuFfBLP33ewXH0pGZw2K&_nc_zt=23&_nc_ht=scontent.fgau1-1.fna&_nc_gid=7dxoXkIfmBErTphhZa-CBg&oh=00_AfYcsRpnoNMdvmH3FyH1VtHG0FiAGFx8rorqtFS3ewWBCA&oe=68BF5731"
                alt="Profile"
                className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="space-y-8">
              {/* About Me Tab */}
              {activeAboutTab === 'About Me' && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                      <User className="w-4 h-4 mr-2" />
                      Social Worker & Engineer
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      About Me
                    </h3>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Social worker Luit Kumar Barman was born on August 10, 1980 in Guwahati. An engineer by profession, he is presently the Managing Director of Medishine Pharmaceuticals Pvt Ltd. He also serves as the Director of Genix India Developers Pvt Ltd. and Bokakhat Hospital Pvt. Ltd.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                      <h4 className="text-xl font-semibold mb-3">Professional Background</h4>
                      <p className="text-blue-100">Engineer turned entrepreneur with expertise in pharmaceuticals and healthcare development.</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
                      <h4 className="text-xl font-semibold mb-3">Social Impact</h4>
                      <p className="text-green-100">Dedicated to community service and improving lives through various social initiatives.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mission Tab */}
              {activeAboutTab === 'Mission' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center">
                      <Heart className="w-8 h-8 mr-3 text-green-600" />
                      My Mission
                    </h3>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300">
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      To serve the citizens of Assam, especially the voters of Dispur Legislative Assembly, uplifting the socio-economic condition of the citizens, providing health care, education and dignity to all, regardless of religion, caste or creed.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Healthcare</h4>
                      <p className="text-red-100 text-sm">Providing quality healthcare services to all citizens</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center">
                      <Users className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Education</h4>
                      <p className="text-blue-100 text-sm">Ensuring quality education and skill development</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
                      <HomeIcon className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Dignity</h4>
                      <p className="text-green-100 text-sm">Providing dignity and respect to all citizens</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Vision Tab */}
              {activeAboutTab === 'Vision' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center">
                      <Eye className="w-8 h-8 mr-3 text-purple-600" />
                      My Vision
                    </h3>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300">
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      To construct Dispur into a model constituency, with flood free areas and providing every household access to safe drinking water; through consultations with experts and conversations with IIT professors, Dispur will become the most habitable constituency in Assam.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
                      <h4 className="text-xl font-semibold mb-3 flex items-center">
                        <HomeIcon className="w-6 h-6 mr-2" />
                        Model Constituency
                      </h4>
                      <p className="text-blue-100">Transform Dispur into the most habitable and well-developed constituency in Assam.</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl p-6 text-white">
                      <h4 className="text-xl font-semibold mb-3 flex items-center">
                        <Heart className="w-6 h-6 mr-2" />
                        Flood-Free Areas
                      </h4>
                      <p className="text-teal-100">Implement comprehensive flood management and provide safe drinking water to every household.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                    <h4 className="text-xl font-semibold mb-3 flex items-center">
                      <Users className="w-6 h-6 mr-2" />
                      Expert Collaboration
                    </h4>
                    <p className="text-purple-100">Working with experts and IIT professors to bring innovative solutions and sustainable development to the constituency.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with us on social media for the latest updates, announcements, and community engagement.
            </p>
          </div>

          {/* Social Media Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFollowTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFollowTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Social Media Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredSocialPosts.slice(0, 6).map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative">
                  <img src={post.image} alt={post.content} className="w-full h-48 object-cover" />
                  <span className={`absolute top-3 left-3 ${getPlatformColor(post.platform)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                    {post.platform}
                  </span>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-gray-800 font-medium mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </span>
                      <span className="flex items-center">
                        <Share2 className="w-4 h-4 mr-1" />
                        {post.shares}
                      </span>
                    </div>
                    <span>{post.time}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Latest Updates & News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates & News</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest announcements, programs, and initiatives designed to serve our community better.
            </p>
          </div>

          {/* News Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'News Articles ', 'Books', ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveNewsTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeNewsTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* News Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredNews.slice(0, 6).map((article) => (
              <a 
                key={article.id} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative">
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                  <span className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                    {article.category}
                  </span>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {article.views}
                    </div>
                  </div>
                  <div className="mt-3 text-blue-500 group-hover:text-blue-600 text-sm font-medium flex items-center">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Video News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interview and podcast </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch the latest video updates, press conferences, and important announcements.
            </p>
          </div>

          {/* Video Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'Podcasts', 'Interview ', ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveVideoTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeVideoTab === tab
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredVideos.map((video) => (
              <a 
                key={video.id} 
                href={video.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {video.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {video.views}
                    </div>
                    <span>{video.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Load More Videos
            </button>
          </div>
        </div>
      </section>

      

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access our comprehensive range of public services designed to serve you better with efficiency and transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Appointment Booking', icon: Calendar, color: 'bg-blue-500', description: 'Schedule appointments online with automated confirmation and reminders.' },
              { name: 'Public Grievance', icon: MessageCircle, color: 'bg-red-500', description: 'Submit complaints and track resolution status with unique ticket numbers.' },
              { name: 'Health Support', icon: Heart, color: 'bg-green-500', description: 'Access medical assistance, health camps, and healthcare resources.' },
              { name: 'Education Support', icon: Users, color: 'bg-purple-500', description: 'Apply for scholarships, educational aid, and skill development programs.' },
              { name: 'Invitation Request', icon: Share2, color: 'bg-orange-500', description: 'Request official invitations for events and ceremonial functions.' },
              { name: 'Real Estate Consultancy', icon: HomeIcon, color: 'bg-teal-500', description: 'Get guidance on property matters, land records, and real estate procedures.' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to={service.name === 'Appointment Booking' ? '/services/appointment' :
                       service.name === 'Public Grievance' ? '/services/grievance' :
                       service.name === 'Health Support' ? '/services/health' :
                       service.name === 'Education Support' ? '/services/education' :
                       service.name === 'Invitation Request' ? '/services/invitation' :
                       service.name === 'Real Estate Consultancy' ? '/services/real-estate' : '#'}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Image className="w-4 h-4 mr-2" />
              Visual Stories
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Photo Gallery</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Explore moments captured from our initiatives, events, and community engagement activities
            </p>
            <Link to="/gallery" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-full transition-all duration-300">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'https://images.pexels.com/photos/1181793/pexels-photo-1181793.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/4386421/pexels-photo-4386421.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=300'
            ].map((image, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl group cursor-pointer relative shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
                <img
                  src={image}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-800 text-center">Gallery Image {i + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;