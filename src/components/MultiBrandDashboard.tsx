import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for the table
const mockTableData = [
  {
    id: 1,
    image: "https://picsum.photos/50/50?random=1",
    postBody: "Just got my beauty box and I'm so excited to try the products! ✨ #BeautyBox",
    comment: "Wow, these beauty hacks are so cool, I'm definitely sharing this!",
    aiResponse: "Hey fabulous! ✨ We're so grateful for your support! It inspires us every day! What's your favorite way to use our products?",
    editedResponse: "Hey fabulous! ✨ We're so grateful for your support! It inspires us every day! What's your favorite way to use our products?"
  },
  {
    id: 2,
    image: "https://picsum.photos/50/50?random=2",
    postBody: "Excited to pamper myself with BlissfulBubbles bath bombs! 🛁 #PamperTime",
    comment: "Wow, these beauty hacks are so cool, I'm definitely sharing this!",
    aiResponse: "Hey fabulous! ✨ We're so grateful for your support! It inspires us every day! What's your favorite way to use our products?",
    editedResponse: "Hey fabulous! ✨ We're so grateful for your support! It inspires us every day! What's your favorite way to use our products?"
  },
  {
    id: 3,
    image: "https://picsum.photos/50/50?random=3",
    postBody: "Thrilled to start my self-care journey with RadiantSkin's new line! 🌟 #SelfCare",
    comment: "This makeup look is everything, I need to recreate it ASAP!",
    aiResponse: "Hi beautiful! 💕 We appreciate your love for our brand! Your feedback means the world to us! What's your go-to beauty tip?",
    editedResponse: "Hi beautiful! 💕 We appreciate your love for our brand! Your feedback means the world to us! What's your go-to beauty tip?"
  },
  {
    id: 4,
    image: "https://picsum.photos/50/50?random=4",
    postBody: "So excited to dive into the latest ColorPop palette! 🎨✨ #BeautyBuzz",
    comment: "Love this skincare routine, my skin is gonna glow!",
    aiResponse: "Hey there! 🌼 Thanks for being such an awesome fan! We're super excited to have you here! What's the one item from our collection you can't live without?",
    editedResponse: "Hey there! 🌼 Thanks for being such an awesome fan! We're super excited to have you here! What's the one item from our collection you can't live without?"
  },
  {
    id: 5,
    image: "https://picsum.photos/50/50?random=5",
    postBody: "Thrilled to try out the new ColorPop palette! 🎨💖 #MakeupLover",
    comment: "Love this skincare routine, my skin is gonna glow!",
    aiResponse: "Hey! 🌼 Thanks for being an awesome fan! What's the one item from our collection you can't live without?",
    editedResponse: "Hey! 🌼 Thanks for being an awesome fan! What's the one item from our collection you can't live without?"
  }
];

interface FilterChipProps {
  label: string;
  isSelected?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, hasDropdown, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-normal transition-all duration-200 hover:shadow-md ${
      isSelected
        ? 'bg-black text-white'
        : 'bg-gray-100 text-black border border-gray-300 hover:bg-gray-200'
    }`}
    style={{ fontFamily: 'Futura Std, sans-serif' }}
  >
    {label}
    {hasDropdown && (
      <ChevronDown className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-black'}`} />
    )}
  </button>
);

interface DropdownSelectProps {
  placeholder: string;
  value?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ placeholder, value }) => (
  <div className="relative flex-1 bg-white border border-gray-300">
    <div className="flex items-center justify-between px-3 py-2 cursor-pointer">
      <span className="text-sm text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
        {value || placeholder}
      </span>
      <ChevronDown className="w-6 h-6 text-black rotate-180" />
    </div>
  </div>
);

const MultiBrandDashboard: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState('Instagram');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filterChips = [
    { label: 'Instagram', hasDropdown: true },
    { label: 'Comments' },
    { label: 'Ads' },
    { label: 'All Posts' },
    { label: 'Earned Media' },
    { label: 'Statistics' }
  ];

  const dropdownOptions = [
    { placeholder: 'Search Post' },
    { placeholder: 'Show Bookmarked' },
    { placeholder: 'Response' },
    { placeholder: 'Comment Posted Time' },
    { placeholder: 'Show Hidden' }
  ];

  const totalPages = Math.ceil(4185 / itemsPerPage);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 3);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 
              className="text-3xl font-bold text-black tracking-tight"
              style={{ fontFamily: 'Futura Std, sans-serif', letterSpacing: '-0.64px' }}
            >
              e.l.f. Skin
            </h1>
            <ChevronDown className="w-10 h-10 text-black rotate-180" />
          </div>
          <div className="flex items-center gap-10">
            {['HOME', 'BFe.l.f', 'RAMON', 'LOGOUT'].map((item) => (
              <button
                key={item}
                className="text-sm font-bold text-black uppercase tracking-wide hover:text-gray-700 transition-colors"
                style={{ fontFamily: 'Futura Std, sans-serif', letterSpacing: '0.84px' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-4 overflow-x-auto">
          {filterChips.map((chip) => (
            <FilterChip
              key={chip.label}
              label={chip.label}
              isSelected={selectedChip === chip.label}
              hasDropdown={chip.hasDropdown}
              onClick={() => setSelectedChip(chip.label)}
            />
          ))}
        </div>

        {/* Search and Filter Controls */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-black" />
            </div>
            <input
              type="text"
              placeholder="Search Comment"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-white border border-black rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ fontFamily: 'Futura Std, sans-serif' }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex-1 flex items-center gap-2.5">
            {dropdownOptions.map((option, index) => (
              <DropdownSelect key={index} placeholder={option.placeholder} />
            ))}
          </div>

          {/* Refresh Button */}
          <button className="px-4 py-2 bg-white border border-black rounded-full text-sm font-bold text-black uppercase tracking-wide hover:bg-gray-50 transition-colors" style={{ fontFamily: 'Futura Std, sans-serif' }}>
            REFRESH
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex items-center px-3 py-3 gap-6">
              <div className="font-bold text-sm text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                Post Image
              </div>
              <div className="flex-1 font-bold text-sm text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                Post Body
              </div>
              <div className="flex-1 font-bold text-sm text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                Comment
              </div>
              <div className="flex-1 font-bold text-sm text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                AI Response
              </div>
              <div className="w-56 font-bold text-sm text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                Edited/Posted Response
              </div>
              <div className="w-40"></div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {mockTableData.map((row) => (
              <div key={row.id} className="flex items-center px-3 py-4 gap-6 hover:bg-gray-50">
                <div className="w-12 h-12 rounded overflow-hidden bg-gray-200">
                  <img 
                    src={row.image} 
                    alt="Post" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-black leading-5" style={{ fontFamily: 'Futura Std, sans-serif', letterSpacing: '0.12px' }}>
                    {row.postBody}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-black leading-5" style={{ fontFamily: 'Futura Std, sans-serif', letterSpacing: '0.12px' }}>
                    {row.comment}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-black leading-5" style={{ fontFamily: 'Futura Std, sans-serif', letterSpacing: '0.12px' }}>
                    {row.aiResponse}
                  </p>
                </div>
                <div className="w-56">
                  <p className="text-xs text-black leading-5" style={{ fontFamily: 'Futura Std, sans-serif', letterSpacing: '0.12px' }}>
                    {row.editedResponse}
                  </p>
                </div>
                <div className="w-40 flex items-center justify-end gap-4">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MessageCircle className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Bookmark className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="px-4 py-1 bg-black text-white text-sm font-bold uppercase tracking-wide rounded-full hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                    POST
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-8">
          <div className="flex items-center gap-4">
            {/* Previous Button */}
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white border border-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-base ${
                  currentPage === page
                    ? 'bg-blue-200 text-black'
                    : 'bg-white border border-gray-200 text-black hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Futura Std, sans-serif' }}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                <span className="text-base text-black" style={{ fontFamily: 'Futura Std, sans-serif' }}>
                  ...
                </span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-3 py-1 rounded text-base bg-white border border-gray-200 text-black hover:bg-gray-50"
                  style={{ fontFamily: 'Futura Std, sans-serif' }}
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-white border border-black rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              className="px-5 py-1.5 bg-white border border-black rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              style={{ fontFamily: 'Futura Std, sans-serif' }}
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiBrandDashboard; 