

const Typography = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Futura Std, sans-serif' }}>Futura Font Family</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold" style={{ fontFamily: 'Futura Std, sans-serif' }}>Heading Large - 24px Bold</p>
            <p className="text-sm text-gray-600 mt-1">font-family: 'Futura Std', sans-serif</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold" style={{ fontFamily: 'Futura Std, sans-serif' }}>Heading Medium - 18px Semibold</p>
            <p className="text-sm text-gray-600 mt-1">font-family: 'Futura Std', sans-serif</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-base font-medium" style={{ fontFamily: 'Futura Std, sans-serif' }}>Body Large - 16px Medium</p>
            <p className="text-sm text-gray-600 mt-1">font-family: 'Futura Std', sans-serif</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-normal" style={{ fontFamily: 'Futura Std, sans-serif' }}>Body Small - 14px Regular</p>
            <p className="text-sm text-gray-600 mt-1">font-family: 'Futura Std', sans-serif</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Typography 