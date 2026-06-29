import React from 'react';
import Galaxy from './Galaxy';

export default function UniverseMap({ onSelectSector }) {
  return (
    <div className="relative w-full flex flex-col items-center gap-[15vh] md:gap-[25vh] py-[10vh] pb-[20vh] z-20 font-sans">
      
      {/* Target IDs added to each wrapper so the camera can lock onto them */}
      
      <div id="galaxy-nexus" className="w-full flex justify-center md:justify-start md:pl-[15%] scroll-m-24">
        <Galaxy title="The Nexus" theme="purple" onClick={() => onSelectSector('nexus')} />
      </div>

      <div id="galaxy-tactical" className="w-full flex justify-center md:justify-end md:pr-[15%] scroll-m-24">
        <Galaxy title="Tactical Cluster" theme="cyan" onClick={() => onSelectSector('tactical')} />
      </div>

      <div id="galaxy-codeforge" className="w-full flex justify-center md:justify-start md:pl-[10%] scroll-m-24">
        <Galaxy title="The Codeforge" theme="amber" onClick={() => onSelectSector('codeforge')} />
      </div>

      <div id="galaxy-knowledge" className="w-full flex justify-center md:justify-end md:pr-[10%] scroll-m-24">
        <Galaxy title="Knowledge Nebula" theme="green" onClick={() => onSelectSector('knowledge')} />
      </div>

      <div id="galaxy-zenith" className="w-full flex justify-center scroll-m-24">
        <Galaxy title="Zenith Citadel" theme="gold" onClick={() => onSelectSector('zenith')} />
      </div>
      
    </div>
  );
}