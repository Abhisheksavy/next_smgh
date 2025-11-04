import React from 'react'

const LeaderShip = ({leadership}:{leadership: any}) => {
     console.log("leadership", leadership)
     return (
          <section className="section-padding ">
               <div className="container">
                    <div className="text-center">
                         <p className="tagline mb-1.5">{leadership?.tagline}</p>
                         <h2 className="commonTitle ">{leadership?.title}</h2>
                         <p className="text-gray-600 text-base  leading-relaxed">
                              {leadership?.description}
                         </p>
                    </div>
               </div>
          </section>
     )
}

export default LeaderShip
