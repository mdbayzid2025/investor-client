import React from 'react'

const RequestStatics = () => {
    // Mock data for user's requests
    const mockRequests = [
        {
            id: 1,
            title: 'Luxury Penthouse in Sandton',
            description: 'Looking for a modern 3-bedroom penthouse with city views, preferably in Sandton CBD area.',
            budget: 'R 8,000,000 - R 12,000,000',
            location: 'Sandton, Johannesburg',
            type: 'Residential',
            status: 'Active',
            date: '2024-03-15',
            views: 24,
            responses: 3
        },
        {
            id: 2,
            title: 'Commercial Office Space',
            description: 'Seeking 500-800 sqm office space in Cape Town CBD for tech startup.',
            budget: 'R 3,000,000 - R 5,000,000',
            location: 'Cape Town CBD',
            type: 'Commercial',
            status: 'Active',
            date: '2024-03-10',
            views: 18,
            responses: 5
        },
        {
            id: 3,
            title: 'Coastal Investment Property',
            description: 'Looking for beachfront property in Ballito for rental income.',
            budget: 'R 4,000,000 - R 6,000,000',
            location: 'Ballito, KZN',
            type: 'Residential',
            status: 'Closed',
            date: '2024-02-28',
            views: 45,
            responses: 8
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Total</p>
                <p className="text-2xl text-white font-serif">{mockRequests.length}</p>
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Active</p>
                <p className="text-2xl text-green-400 font-serif">
                    {mockRequests.filter(item => item.status === 'Active').length}
                </p>
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Total Views</p>
                <p className="text-2xl text-white font-serif">
                    {mockRequests.reduce((sum, item) => sum + item.views, 0)}
                </p>
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">
                    {/* {activeTab === 'requests' ? 'Responses' : 'Interests'} */}
                    Interests
                </p>
                <p className="text-2xl text-[#D4AF37] font-serif">
                    {mockRequests.reduce((sum, item) => sum + (item?.responses || 0), 0)}
                </p>
            </div>
        </div>
    )
}

export default RequestStatics