import React from 'react'

interface serviceProps {
    services: {
        name: String
        description: String
        price: String
        image: String
        userId: String
        categoryId: String

        availability: Boolean
        featured: Boolean
    }[]
}
export const CreatedService = ( { services }: serviceProps) => {
    return (
        <div>
            {
                services.map((service)=> (
                    <>
                    <p>{service.name}</p>
                    </>
                ))
            }
        </div>
    )
}
