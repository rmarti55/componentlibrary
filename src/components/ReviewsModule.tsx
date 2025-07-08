import React from 'react';

const img1 = "http://localhost:3845/assets/b4745d17a1bb0512acd688160e66ee300e3dbb7e.png";
const img2 = "http://localhost:3845/assets/68c0670050d2d28c4e248a7c85a83711a9200512.png";
const img3 = "http://localhost:3845/assets/0a842be01f7bbb3742916777035dd207c9a52786.png";
const imgBrandLogo = "http://localhost:3845/assets/62e9e5e1193da4cbfd55920dd332fcc761ebf501.png";
const img = "http://localhost:3845/assets/05c4a053ef039e2703268acd0db32d14d1c72d42.svg";

export default function ReviewsModule() {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto font-[\'Futura Std\'],sans-serif">
      <div className="flex items-center gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <img key={i} src={img} alt="star" className="w-4 h-4" />
        ))}
        <span className="text-xs text-black ml-2">2 days ago</span>
        <span className="ml-auto text-xs text-black">_Frankie12</span>
      </div>
      <div className="font-bold text-lg mb-3">Maximum amount of info</div>
      <div className="flex gap-2 mb-3">
        <img src={img1} alt="review 1" className="w-24 h-32 object-cover rounded" />
        <img src={img2} alt="review 2" className="w-24 h-32 object-cover rounded" />
        <img src={img3} alt="review 3" className="w-24 h-32 object-cover rounded" />
      </div>
      <div className="text-sm text-black mb-3">
        I love this it's so lightweight and lasts all day. The color matches and blends in well. I love this it's so lightweight and lasts all day. The color matches and blends in well.I love this it's so lightweight and lasts all day. The color matches and blends in well.I love this it's so lightweight and lasts all day. The color matches and blends in well.I love this it's so lightweight and lasts all day. The color matches and blends in well.
      </div>
      <div className="mb-3">
        <div className="flex items-center mb-1">
          <span className="font-bold text-xs w-16">Quality</span>
          <div className="flex-1 flex gap-1 mx-2">
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#d7d8e0]" />
            <div className="h-1.5 w-12 rounded bg-[#d7d8e0]" />
          </div>
          <span className="text-xs w-8 text-right">3.0</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-xs w-16">Value</span>
          <div className="flex-1 flex gap-1 mx-2">
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
            <div className="h-1.5 w-12 rounded bg-[#f0bf9b]" />
          </div>
          <span className="text-xs w-8 text-right">5.0</span>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex text-xs mb-1">
          <span className="font-bold w-20">Pros</span>
          <span>Long Lasting, Good Pigmentation, Effective</span>
        </div>
        <div className="flex text-xs mb-1">
          <span className="font-bold w-20">Cons</span>
          <span>Long Lasting, Good Pigmentation, Effective</span>
        </div>
        <div className="flex text-xs mb-1">
          <span className="font-bold w-20">Best Uses</span>
          <span>Special Occassion, Daily Use, Normal Skin</span>
        </div>
      </div>
      <div className="flex text-xs mb-3">
        <div className="flex-1">
          <div className="flex mb-1"><span className="font-bold w-20">Location</span><span>Atlanta, GA</span></div>
          <div className="flex mb-1"><span className="font-bold w-20">Style</span><span>Eclectic</span></div>
          <div className="flex mb-1"><span className="font-bold w-20">Expertise</span><span>Advanced</span></div>
          <div className="flex mb-1"><span className="font-bold w-20">Skin type</span><span>Normal</span></div>
        </div>
        <div className="flex-1">
          <div className="flex mb-1"><span className="font-bold w-20">Skin tone</span><span>Fair</span></div>
          <div className="flex mb-1"><span className="font-bold w-20">Undertone</span><span>Neutral</span></div>
          <div className="flex mb-1"><span className="font-bold w-20">Age range</span><span>18 - 24</span></div>
        </div>
      </div>
      <div className="flex items-center mb-3">
        <span className="text-xs text-[#575b6f] mr-2">Originally shared on</span>
        <img src={imgBrandLogo} alt="Brand Logo" className="h-3 w-10 object-contain" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm mb-2">Helpful?</span>
        <div className="flex gap-2 w-full">
          <button className="flex-1 border border-black rounded-full py-2 font-bold uppercase text-sm tracking-wider">YES - 2</button>
          <button className="flex-1 border border-black rounded-full py-2 font-bold uppercase text-sm tracking-wider">NO - 3</button>
          <button className="flex-1 border border-black rounded-full py-2 font-bold uppercase text-sm tracking-wider">REPORT</button>
        </div>
      </div>
    </div>
  );
} 