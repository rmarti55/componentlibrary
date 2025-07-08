import ReviewsModule from './ReviewsModule'

export default function MobileBuildPreview() {
  // For now, just render 3 stacked ReviewsModule components
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-8">
      <div className="bg-white border rounded-2xl shadow-lg w-[375px] max-h-[700px] overflow-y-auto flex flex-col gap-6 p-4">
        <ReviewsModule />
        <ReviewsModule />
        <ReviewsModule />
      </div>
    </div>
  )
} 