

const ColorPalette = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Futura Std, sans-serif' }}>Brand Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-lg border-2 border-gray-200"></div>
            <div>
              <p className="font-medium" style={{ fontFamily: 'Futura Std, sans-serif' }}>Primary Black</p>
              <p className="text-sm text-gray-600">#000000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg border-2 border-gray-200"></div>
            <div>
              <p className="font-medium" style={{ fontFamily: 'Futura Std, sans-serif' }}>Blue Light</p>
              <p className="text-sm text-gray-600">#dce0f4</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-gray-200"></div>
            <div>
              <p className="font-medium" style={{ fontFamily: 'Futura Std, sans-serif' }}>Gray Light</p>
              <p className="text-sm text-gray-600">#f5f5f5</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-300 rounded-lg border-2 border-gray-200"></div>
            <div>
              <p className="font-medium" style={{ fontFamily: 'Futura Std, sans-serif' }}>Gray Border</p>
              <p className="text-sm text-gray-600">#c3c5d0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPalette 